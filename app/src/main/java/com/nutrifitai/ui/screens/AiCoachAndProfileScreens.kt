package com.nutrifitai.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nutrifitai.data.model.ActivityLevel
import com.nutrifitai.data.model.FoodDietPreference
import com.nutrifitai.data.model.GoalType
import com.nutrifitai.ui.navigation.Screen
import com.nutrifitai.ui.theme.*
import com.nutrifitai.ui.viewmodel.NutriFitViewModel
import kotlinx.coroutines.launch

@Composable
fun AiAssistantScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    var inputText by remember { mutableStateOf("") }
    val listState = rememberLazyListState()
    val scope = rememberCoroutineScope()

    val quickQuestions = listOf(
        "High protein Tamil breakfast",
        "What should I eat for dinner?",
        "Daily calorie status",
        "Best Indian vegetarian protein"
    )

    LaunchedEffect(uiState.aiMessages.size) {
        listState.animateScrollToItem(uiState.aiMessages.size - 1)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(VeryDarkNavy)
    ) {
        // Status bar indicator
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 14.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(8.dp)
                    .clip(CircleShape)
                    .background(if (uiState.isAiThinking) Color(0xFFFBBF24) else NeonGreen)
            )
            Text(
                text = if (uiState.isAiThinking) "NutriFit AI is thinking..." else "Online • Specialized in Indian & Tamil Diets",
                fontSize = 11.5.sp,
                color = TextMuted
            )
        }

        // Quick question chips
        LazyRow(
            modifier = Modifier.padding(horizontal = 14.dp, vertical = 4.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            items(quickQuestions) { q ->
                Surface(
                    shape = RoundedCornerShape(14.dp),
                    color = CardNavy,
                    modifier = Modifier.clickable {
                        viewModel.sendAiMessage(q)
                    }
                ) {
                    Text(
                        text = q,
                        color = NeonGreen,
                        fontSize = 11.5.sp,
                        fontWeight = FontWeight.Medium,
                        modifier = Modifier.padding(horizontal = 10.dp, vertical = 6.dp)
                    )
                }
            }
        }

        // Messages list
        LazyColumn(
            state = listState,
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(horizontal = 14.dp),
            verticalArrangement = Arrangement.spacedBy(10.dp),
            contentPadding = PaddingValues(vertical = 8.dp)
        ) {
            items(uiState.aiMessages) { msg ->
                val isUser = msg.sender == "user"
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = if (isUser) Arrangement.End else Arrangement.Start
                ) {
                    Card(
                        shape = RoundedCornerShape(
                            topStart = 16.dp,
                            topEnd = 16.dp,
                            bottomStart = if (isUser) 16.dp else 4.dp,
                            bottomEnd = if (isUser) 4.dp else 16.dp
                        ),
                        colors = CardDefaults.cardColors(
                            containerColor = if (isUser) EmeraldGreen else CardNavy
                        ),
                        modifier = Modifier.widthIn(max = 290.dp)
                    ) {
                        Column(modifier = Modifier.padding(12.dp)) {
                            Text(
                                text = msg.text,
                                color = if (isUser) VeryDarkNavy else TextWhite,
                                fontSize = 13.5.sp,
                                lineHeight = 19.sp,
                                fontWeight = if (isUser) FontWeight.Medium else FontWeight.Normal
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = msg.timestamp,
                                color = if (isUser) VeryDarkNavy.copy(alpha = 0.7f) else TextMuted,
                                fontSize = 9.5.sp,
                                modifier = Modifier.align(Alignment.End)
                            )
                        }
                    }
                }
            }
            if (uiState.isAiThinking) {
                item {
                    Text("NutriFit AI is preparing nutrition advice...", color = NeonGreen, fontSize = 11.5.sp)
                }
            }
        }

        // Message input row with IME keyboard padding
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .imePadding()
                .padding(horizontal = 12.dp, vertical = 8.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            OutlinedTextField(
                value = inputText,
                onValueChange = { inputText = it },
                modifier = Modifier
                    .weight(1f)
                    .testTag("ai_chat_input"),
                placeholder = { Text("Ask about meals, Tamil food, macros...", color = TextMuted, fontSize = 12.5.sp) },
                singleLine = true,
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = EmeraldGreen,
                    unfocusedBorderColor = BorderNavy,
                    focusedTextColor = TextWhite,
                    unfocusedTextColor = TextWhite,
                    focusedContainerColor = CardNavy,
                    unfocusedContainerColor = CardNavy
                ),
                shape = RoundedCornerShape(22.dp)
            )

            FloatingActionButton(
                onClick = {
                    if (inputText.isNotBlank()) {
                        val text = inputText
                        inputText = ""
                        viewModel.sendAiMessage(text)
                    }
                },
                containerColor = EmeraldGreen,
                contentColor = VeryDarkNavy,
                modifier = Modifier
                    .size(46.dp)
                    .testTag("send_ai_message_button")
            ) {
                Icon(Icons.Default.Send, contentDescription = "Send", modifier = Modifier.size(18.dp))
            }
        }
    }
}

@Composable
fun ProfileScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val profile = uiState.userProfile

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(VeryDarkNavy)
            .padding(horizontal = 16.dp),
        contentPadding = PaddingValues(top = 12.dp, bottom = 96.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = { onNavigate(Screen.Home.route) }) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextWhite)
                }
                Text("User Profile & Targets", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold, color = TextWhite)
                Box(modifier = Modifier.size(48.dp))
            }
        }

        // Profile Avatar Card
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(18.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(64.dp)
                            .clip(CircleShape)
                            .background(SurfaceNavy),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.Person, contentDescription = null, tint = NeonGreen, modifier = Modifier.size(36.dp))
                    }
                    Column {
                        Text(profile.name, fontWeight = FontWeight.Bold, color = TextWhite, fontSize = 18.sp)
                        Text(profile.email, color = TextMuted, fontSize = 12.sp)
                        Spacer(modifier = Modifier.height(4.dp))
                        Surface(shape = RoundedCornerShape(8.dp), color = GlowGreen) {
                            Text(
                                text = "${profile.age} yrs • ${profile.gender} • ${profile.heightCm.toInt()} cm",
                                color = NeonGreen,
                                fontSize = 11.sp,
                                fontWeight = FontWeight.Bold,
                                modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                            )
                        }
                    }
                }
            }
        }

        // Targets Summary Card
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Text("Configured Nutrition Blueprint", fontWeight = FontWeight.Bold, color = TextWhite, fontSize = 15.sp)
                    Spacer(modifier = Modifier.height(12.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Daily Target Calories", color = TextLightGray)
                        Text("${profile.targetCalories} kcal", fontWeight = FontWeight.Bold, color = NeonGreen)
                    }
                    Divider(color = BorderNavy, modifier = Modifier.padding(vertical = 8.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Target Protein", color = TextLightGray)
                        Text("${profile.targetProtein}g", fontWeight = FontWeight.Bold, color = MacroProtein)
                    }
                    Divider(color = BorderNavy, modifier = Modifier.padding(vertical = 8.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Target Carbs", color = TextLightGray)
                        Text("${profile.targetCarbs}g", fontWeight = FontWeight.Bold, color = MacroCarbs)
                    }
                    Divider(color = BorderNavy, modifier = Modifier.padding(vertical = 8.dp))

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween
                    ) {
                        Text("Dietary Preference", color = TextLightGray)
                        Text(profile.dietPreference.title, fontWeight = FontWeight.Bold, color = TextWhite)
                    }
                }
            }
        }
    }
}

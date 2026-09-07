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
            .navigationBarsPadding()
    ) {
        // App bar
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 16.dp, vertical = 12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(CircleShape)
                    .background(Brush.linearGradient(listOf(EmeraldGreen, NeonGreen))),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Default.AutoAwesome, contentDescription = null, tint = VeryDarkNavy, modifier = Modifier.size(24.dp))
            }
            Column(modifier = Modifier.weight(1f)) {
                Text("NutriFit AI Nutrition Coach", fontWeight = FontWeight.Bold, color = TextWhite, fontSize = 16.sp)
                Text(
                    text = if (uiState.isAiThinking) "Analyzing clinical nutrition..." else "Online • Specialized in Indian Diets",
                    fontSize = 11.sp,
                    color = if (uiState.isAiThinking) NeonGreen else TextMuted
                )
            }
        }

        // Quick question chips
        LazyRow(
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 4.dp),
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
                        fontSize = 12.sp,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
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
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            contentPadding = PaddingValues(vertical = 12.dp)
        ) {
            items(uiState.aiMessages) { msg ->
                val isUser = msg.sender == "user"
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = if (isUser) Arrangement.End else Arrangement.Start
                ) {
                    Card(
                        shape = RoundedCornerShape(
                            topStart = 18.dp,
                            topEnd = 18.dp,
                            bottomStart = if (isUser) 18.dp else 4.dp,
                            bottomEnd = if (isUser) 4.dp else 18.dp
                        ),
                        colors = CardDefaults.cardColors(
                            containerColor = if (isUser) EmeraldGreen else CardNavy
                        ),
                        modifier = Modifier.widthIn(max = 320.dp)
                    ) {
                        Column(modifier = Modifier.padding(14.dp)) {
                            Text(
                                text = msg.text,
                                color = if (isUser) VeryDarkNavy else TextWhite,
                                fontSize = 14.sp,
                                lineHeight = 20.sp,
                                fontWeight = if (isUser) FontWeight.Medium else FontWeight.Normal
                            )
                            Spacer(modifier = Modifier.height(4.dp))
                            Text(
                                text = msg.timestamp,
                                color = if (isUser) VeryDarkNavy.copy(alpha = 0.7f) else TextMuted,
                                fontSize = 10.sp,
                                modifier = Modifier.align(Alignment.End)
                            )
                        }
                    }
                }
            }
            if (uiState.isAiThinking) {
                item {
                    Text("NutriFit AI is preparing nutrition advice...", color = NeonGreen, fontSize = 12.sp)
                }
            }
        }

        // Message input row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(12.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            OutlinedTextField(
                value = inputText,
                onValueChange = { inputText = it },
                modifier = Modifier
                    .weight(1f)
                    .testTag("ai_chat_input"),
                placeholder = { Text("Ask about meals, Tamil food, macros...", color = TextMuted, fontSize = 13.sp) },
                singleLine = true,
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = EmeraldGreen,
                    unfocusedBorderColor = BorderNavy,
                    focusedTextColor = TextWhite,
                    unfocusedTextColor = TextWhite,
                    focusedContainerColor = CardNavy,
                    unfocusedContainerColor = CardNavy
                ),
                shape = RoundedCornerShape(24.dp)
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
                    .size(48.dp)
                    .testTag("send_ai_message_button")
            ) {
                Icon(Icons.Default.Send, contentDescription = "Send", modifier = Modifier.size(20.dp))
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

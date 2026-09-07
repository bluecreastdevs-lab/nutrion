package com.nutrifitai.ui.screens

import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
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
import com.nutrifitai.data.model.ScannedDetectedFood
import com.nutrifitai.data.model.ScannedMealResult
import com.nutrifitai.ui.navigation.Screen
import com.nutrifitai.ui.theme.*
import com.nutrifitai.ui.viewmodel.NutriFitViewModel
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

@Composable
fun AiFoodScannerScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    var isScanning by remember { mutableStateOf(false) }
    var selectedPreset by remember { mutableStateOf("Tamil Thali") }
    val scope = rememberCoroutineScope()

    val presets = listOf("Tamil Thali", "Dosa & Sambar", "Chicken Biryani", "Protein Oats")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(DeepBlack)
    ) {
        // Camera Viewfinder Box
        Box(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .padding(16.dp)
                .clip(RoundedCornerShape(24.dp))
                .background(CardNavy)
                .border(2.dp, if (isScanning) NeonGreen else BorderNavy, RoundedCornerShape(24.dp)),
            contentAlignment = Alignment.Center
        ) {
            // Simulated Viewfinder Reticle
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = Icons.Default.CameraAlt,
                    contentDescription = null,
                    tint = if (isScanning) NeonGreen else TextMuted,
                    modifier = Modifier.size(64.dp)
                )
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = if (isScanning) "AI Analyzing Indian Nutrition..." else "Align Indian Food in Viewfinder",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = if (isScanning) NeonGreen else TextWhite
                )
                Text(
                    text = "Detects rotis, dosas, sambar, paneer, and macro ratios",
                    style = MaterialTheme.typography.bodySmall,
                    color = TextMuted,
                    fontSize = 12.sp
                )
            }

            // Close button
            IconButton(
                onClick = { onNavigate(Screen.Home.route) },
                modifier = Modifier
                    .align(Alignment.TopStart)
                    .padding(16.dp)
            ) {
                Icon(Icons.Default.Close, contentDescription = "Close", tint = TextWhite)
            }
        }

        // Bottom Controls Bar
        Surface(
            color = VeryDarkNavy,
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(
                modifier = Modifier
                    .padding(20.dp)
                    .navigationBarsPadding(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                // Preset meal picker
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    presets.forEach { preset ->
                        val isSel = selectedPreset == preset
                        Surface(
                            shape = RoundedCornerShape(14.dp),
                            color = if (isSel) EmeraldGreen else SurfaceNavy,
                            modifier = Modifier
                                .weight(1f)
                                .clickable { selectedPreset = preset }
                        ) {
                            Text(
                                text = preset,
                                fontSize = 11.sp,
                                fontWeight = if (isSel) FontWeight.Bold else FontWeight.Normal,
                                color = if (isSel) VeryDarkNavy else TextLightGray,
                                modifier = Modifier.padding(vertical = 8.dp, horizontal = 4.dp),
                                maxLines = 1
                            )
                        }
                    }
                }

                // Shutter Capture Button
                Box(
                    modifier = Modifier
                        .size(76.dp)
                        .clip(CircleShape)
                        .background(Brush.linearGradient(listOf(EmeraldGreen, NeonGreen)))
                        .clickable {
                            isScanning = true
                            scope.launch {
                                delay(1200) // Realistic AI scanning delay
                                isScanning = false
                                // Create smart scanned result
                                val mockResult = when (selectedPreset) {
                                    "Dosa & Sambar" -> ScannedMealResult(
                                        title = "Plain Dosa + Drumstick Sambar",
                                        confidence = 96,
                                        foods = listOf(
                                            ScannedDetectedFood("Plain Dosa (2 pcs)", "160g", 336, 7.8f, 58f, 7.4f, 2.4f, 98),
                                            ScannedDetectedFood("South Indian Sambar", "150ml", 115, 4.8f, 18.2f, 2.4f, 3.5f, 95)
                                        ),
                                        totalCalories = 451,
                                        totalProtein = 12.6f,
                                        totalCarbs = 76.2f,
                                        totalFat = 9.8f,
                                        totalFiber = 5.9f,
                                        glycemicIndex = "Medium",
                                        healthScore = 84,
                                        aiInsights = listOf(
                                            "Fermented rice & urad dal batter provides gut-friendly probiotics.",
                                            "Drumsticks & tamarind add vitamin C and iron to boost energy."
                                        )
                                    )
                                    "Chicken Biryani" -> ScannedMealResult(
                                        title = "Hyderabadi Chicken Biryani + Raita",
                                        confidence = 94,
                                        foods = listOf(
                                            ScannedDetectedFood("Basmati Chicken Biryani", "300g", 540, 36f, 62f, 16f, 3.2f, 96),
                                            ScannedDetectedFood("Cucumber Onion Raita", "100g", 65, 3.2f, 4.5f, 3.8f, 0.8f, 92)
                                        ),
                                        totalCalories = 605,
                                        totalProtein = 39.2f,
                                        totalCarbs = 66.5f,
                                        totalFat = 19.8f,
                                        totalFiber = 4.0f,
                                        glycemicIndex = "Medium",
                                        healthScore = 79,
                                        aiInsights = listOf(
                                            "Excellent protein content from lean chicken meat.",
                                            "Raita's active yogurt cultures assist with spicy digestion."
                                        )
                                    )
                                    else -> ScannedMealResult(
                                        title = "South Indian Thali Meal",
                                        confidence = 95,
                                        foods = listOf(
                                            ScannedDetectedFood("Steamed Brown Rice", "1 cup (195g)", 218, 4.5f, 45.8f, 1.6f, 3.5f, 97),
                                            ScannedDetectedFood("Drumstick Sambar", "1 bowl (150ml)", 115, 4.8f, 18.2f, 2.4f, 3.5f, 94),
                                            ScannedDetectedFood("Paneer / Soya Tikka", "100g", 240, 26f, 8.5f, 12f, 2.2f, 93),
                                            ScannedDetectedFood("Cucumber Salad", "80g", 25, 1.0f, 4.0f, 0.2f, 1.5f, 90)
                                        ),
                                        totalCalories = 598,
                                        totalProtein = 36.3f,
                                        totalCarbs = 76.5f,
                                        totalFat = 16.2f,
                                        totalFiber = 10.7f,
                                        glycemicIndex = "Low",
                                        healthScore = 92,
                                        aiInsights = listOf(
                                            "Rich fiber content slows glucose absorption and stabilizes insulin.",
                                            "High protein ratio helps preserve lean muscle mass during deficit."
                                        )
                                    )
                                }
                                viewModel.setScannedResult(mockResult)
                                onNavigate(Screen.ScanResult.route)
                            }
                        }
                        .testTag("scan_shutter_button"),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.AutoAwesome,
                        contentDescription = "Scan",
                        tint = VeryDarkNavy,
                        modifier = Modifier.size(36.dp)
                    )
                }

                Text(
                    text = "Tap to Scan & Identify Meal Instantly",
                    style = MaterialTheme.typography.bodySmall,
                    color = TextMuted
                )
            }
        }
    }
}

@Composable
fun ScanResultScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val result = uiState.scannedMealResult

    Scaffold(
        containerColor = VeryDarkNavy,
        topBar = {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                IconButton(onClick = { onNavigate(Screen.AiFoodScanner.route) }) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextWhite)
                }
                Text("AI Scan Result", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold, color = TextWhite)
                Box(modifier = Modifier.size(48.dp))
            }
        }
    ) { padding ->
        if (result == null) {
            Box(modifier = Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) {
                Text("No scan result found. Please scan again.", color = TextMuted)
            }
        } else {
            val resultScroll = rememberScrollState()
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .verticalScroll(resultScroll)
                    .padding(horizontal = 16.dp, vertical = 10.dp),
                verticalArrangement = Arrangement.spacedBy(14.dp)
            ) {
                // Title card
                Card(
                    shape = RoundedCornerShape(20.dp),
                    colors = CardDefaults.cardColors(containerColor = CardNavy),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(18.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = result.title,
                                style = MaterialTheme.typography.titleMedium,
                                fontWeight = FontWeight.Bold,
                                color = TextWhite,
                                modifier = Modifier.weight(1f)
                            )
                            Surface(
                                shape = RoundedCornerShape(12.dp),
                                color = GlowGreen
                            ) {
                                Text(
                                    text = "${result.confidence}% Match",
                                    color = NeonGreen,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold,
                                    modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                                )
                            }
                        }

                        Spacer(modifier = Modifier.height(14.dp))

                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceAround
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text("Total Calories", fontSize = 11.sp, color = TextMuted)
                                Text("${result.totalCalories}", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = EmeraldGreen)
                                Text("kcal", fontSize = 11.sp, color = TextMuted)
                            }
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text("Protein", fontSize = 11.sp, color = TextMuted)
                                Text("${result.totalProtein.toInt()}g", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = MacroProtein)
                            }
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text("Carbs", fontSize = 11.sp, color = TextMuted)
                                Text("${result.totalCarbs.toInt()}g", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = MacroCarbs)
                            }
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text("Fat", fontSize = 11.sp, color = TextMuted)
                                Text("${result.totalFat.toInt()}g", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = MacroFat)
                            }
                        }
                    }
                }

                // Detected items list
                Text("Detected Items in Meal", style = MaterialTheme.typography.titleMedium, color = TextWhite, fontWeight = FontWeight.Bold)

                result.foods.forEach { item ->
                    Card(
                        shape = RoundedCornerShape(14.dp),
                        colors = CardDefaults.cardColors(containerColor = SurfaceNavy),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth().padding(12.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column {
                                Text(item.name, fontWeight = FontWeight.SemiBold, color = TextWhite, fontSize = 14.sp)
                                Text("${item.portion} • P: ${item.protein}g C: ${item.carbs}g", fontSize = 12.sp, color = TextMuted)
                            }
                            Text("${item.calories} kcal", fontWeight = FontWeight.Bold, color = NeonGreen)
                        }
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Log to diary button
                Button(
                    onClick = {
                        viewModel.addFood(
                            name = result.title,
                            category = "Lunch",
                            portion = "1 plate",
                            calories = result.totalCalories,
                            protein = result.totalProtein,
                            carbs = result.totalCarbs,
                            fat = result.totalFat,
                            fiber = result.totalFiber
                        )
                        onNavigate(Screen.FoodDiary.route)
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(52.dp)
                        .testTag("log_scanned_meal_button"),
                    shape = RoundedCornerShape(16.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = EmeraldGreen)
                ) {
                    Text("Add Meal to Food Diary", color = VeryDarkNavy, fontWeight = FontWeight.Bold, fontSize = 16.sp)
                }

                Spacer(modifier = Modifier.height(16.dp))
            }
        }
    }
}

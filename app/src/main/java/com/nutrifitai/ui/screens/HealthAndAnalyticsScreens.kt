package com.nutrifitai.ui.screens

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
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
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nutrifitai.ui.navigation.Screen
import com.nutrifitai.ui.theme.*
import com.nutrifitai.ui.viewmodel.NutriFitViewModel

@Composable
fun HydrationScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val currentLiters = uiState.waterLiters
    val targetLiters = uiState.userProfile.targetWaterLiters
    val progress = (currentLiters / targetLiters).coerceIn(0f, 1f)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(VeryDarkNavy)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(18.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = { onNavigate(Screen.Home.route) }) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextWhite)
            }
            Text("Hydration Tracker", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold, color = TextWhite)
            Box(modifier = Modifier.size(48.dp))
        }

        // Circular Hydration Gauge
        Box(
            modifier = Modifier.size(180.dp),
            contentAlignment = Alignment.Center
        ) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                val stroke = 16.dp.toPx()
                drawCircle(color = SurfaceNavy, style = Stroke(stroke))
                drawArc(
                    color = WaterCyan,
                    startAngle = -90f,
                    sweepAngle = progress * 360f,
                    useCenter = false,
                    style = Stroke(stroke, cap = StrokeCap.Round)
                )
            }
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Icon(Icons.Default.WaterDrop, contentDescription = null, tint = WaterCyan, modifier = Modifier.size(36.dp))
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = String.format("%.1f L", currentLiters),
                    style = MaterialTheme.typography.displayLarge,
                    fontSize = 32.sp,
                    fontWeight = FontWeight.Bold,
                    color = TextWhite
                )
                Text(
                    text = "Goal: ${targetLiters}L",
                    fontSize = 12.sp,
                    color = TextMuted
                )
            }
        }

        // Quick Add Buttons
        Text("Quick Log Water", style = MaterialTheme.typography.titleMedium, fontWeight = FontWeight.Bold, color = TextWhite)

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Button(
                onClick = { viewModel.logWater(250) },
                colors = ButtonDefaults.buttonColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .weight(1f)
                    .height(60.dp)
                    .testTag("water_add_250")
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("+250 ml", fontWeight = FontWeight.Bold, color = WaterCyan)
                    Text("1 Glass", fontSize = 10.sp, color = TextMuted)
                }
            }

            Button(
                onClick = { viewModel.logWater(500) },
                colors = ButtonDefaults.buttonColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .weight(1f)
                    .height(60.dp)
                    .testTag("water_add_500")
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("+500 ml", fontWeight = FontWeight.Bold, color = WaterCyan)
                    Text("Bottle", fontSize = 10.sp, color = TextMuted)
                }
            }

            Button(
                onClick = { viewModel.logWater(750) },
                colors = ButtonDefaults.buttonColors(containerColor = CardNavy),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .weight(1f)
                    .height(60.dp)
                    .testTag("water_add_750")
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text("+750 ml", fontWeight = FontWeight.Bold, color = WaterCyan)
                    Text("Flask", fontSize = 10.sp, color = TextMuted)
                }
            }
        }

        // Hydration Tips
        Card(
            shape = RoundedCornerShape(18.dp),
            colors = CardDefaults.cardColors(containerColor = SurfaceNavy),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Did You Know?", fontWeight = FontWeight.Bold, color = NeonGreen, fontSize = 13.sp)
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    "Drinking 500ml of water 30 minutes before lunch and dinner boosts metabolism by 24-30% and curbs overeating!",
                    color = TextLightGray,
                    fontSize = 12.sp
                )
            }
        }
    }
}

@Composable
fun FastingScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val fasting = uiState.fastingState

    val elapsedHours = (fasting.elapsedSeconds / 3600).toInt()
    val elapsedMins = ((fasting.elapsedSeconds % 3600) / 60).toInt()
    val targetHours = (fasting.targetSeconds / 3600).toInt()
    val progress = (fasting.elapsedSeconds.toFloat() / fasting.targetSeconds.toFloat()).coerceIn(0f, 1f)

    val presets = listOf("16:8", "18:6", "20:4", "OMAD")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(VeryDarkNavy)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(18.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = { onNavigate(Screen.Home.route) }) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextWhite)
            }
            Text("Intermittent Fasting", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold, color = TextWhite)
            Box(modifier = Modifier.size(48.dp))
        }

        // Protocol Selector
        Row(
            horizontalArrangement = Arrangement.spacedBy(10.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            presets.forEach { preset ->
                val isSel = fasting.preset == preset
                Surface(
                    shape = RoundedCornerShape(14.dp),
                    color = if (isSel) EmeraldGreen else CardNavy,
                    modifier = Modifier
                        .weight(1f)
                        .clickable { viewModel.setFastingPreset(preset) }
                ) {
                    Text(
                        text = preset,
                        fontWeight = if (isSel) FontWeight.Bold else FontWeight.Normal,
                        color = if (isSel) VeryDarkNavy else TextWhite,
                        fontSize = 13.sp,
                        modifier = Modifier.padding(vertical = 10.dp),
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center
                    )
                }
            }
        }

        // Fasting Timer Ring
        Box(
            modifier = Modifier.size(220.dp),
            contentAlignment = Alignment.Center
        ) {
            Canvas(modifier = Modifier.fillMaxSize()) {
                val stroke = 18.dp.toPx()
                drawCircle(color = SurfaceNavy, style = Stroke(stroke))
                drawArc(
                    brush = Brush.sweepGradient(listOf(EmeraldGreen, NeonGreen, EmeraldGreen)),
                    startAngle = -90f,
                    sweepAngle = progress * 360f,
                    useCenter = false,
                    style = Stroke(stroke, cap = StrokeCap.Round)
                )
            }
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "${elapsedHours}h ${elapsedMins}m",
                    style = MaterialTheme.typography.displayLarge,
                    fontSize = 32.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = TextWhite
                )
                Text(
                    text = "Goal: ${targetHours}h Fast",
                    fontSize = 12.sp,
                    color = NeonGreen,
                    fontWeight = FontWeight.SemiBold
                )
                Spacer(modifier = Modifier.height(4.dp))
                Surface(
                    shape = RoundedCornerShape(8.dp),
                    color = GlowGreen
                ) {
                    Text(
                        text = if (fasting.isActive) "FAT BURNING ACTIVE" else "FAST PAUSED",
                        color = NeonGreen,
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        modifier = Modifier.padding(horizontal = 8.dp, vertical = 2.dp)
                    )
                }
            }
        }

        // Toggle button
        Button(
            onClick = { viewModel.toggleFasting() },
            colors = ButtonDefaults.buttonColors(
                containerColor = if (fasting.isActive) Color(0xFFEF4444) else EmeraldGreen
            ),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier
                .fillMaxWidth()
                .height(52.dp)
                .testTag("fasting_toggle_button")
        ) {
            Text(
                text = if (fasting.isActive) "End Fasting Window" else "Start Fasting Window",
                color = VeryDarkNavy,
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp
            )
        }

        // Fasting Stage Insight
        Card(
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = CardNavy),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("Metabolic Stage: Ketosis & Autophagy", fontWeight = FontWeight.Bold, color = TextWhite, fontSize = 14.sp)
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    "After 14 hours, glycogen levels decline and your body switches to metabolizing subcutaneous fat for energy. Cellular repair mechanisms are accelerated.",
                    color = TextLightGray,
                    fontSize = 12.sp
                )
            }
        }
    }
}

@Composable
fun ProgressScreen(
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
            Text("Fitness & Nutrition Analytics", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold, color = TextWhite)
        }

        // Vital Stats Grid
        item {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                VitalStatCard("Weight", "${profile.weightKg} kg", "Ideal: 70kg", EmeraldGreen, Modifier.weight(1f))
                VitalStatCard("BMI", String.format("%.1f", profile.bmi), "Normal (18.5-24.9)", NeonGreen, Modifier.weight(1f))
                VitalStatCard("BMR", "${profile.bmr} kcal", "Basal Rate", Color(0xFFFBBF24), Modifier.weight(1f))
            }
        }

        // Streak Milestone
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(48.dp)
                            .clip(CircleShape)
                            .background(Color(0x33F97316)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.LocalFireDepartment, contentDescription = null, tint = Color(0xFFF97316), modifier = Modifier.size(28.dp))
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text("${uiState.streakDays} Days Consistency Streak! 🔥", fontWeight = FontWeight.Bold, color = TextWhite, fontSize = 15.sp)
                        Text("Logged all meals & hit protein goals for 12 straight days.", color = TextLightGray, fontSize = 12.sp)
                    }
                }
            }
        }

        // Weekly Calorie History
        item {
            Card(
                shape = RoundedCornerShape(20.dp),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("Weekly Calorie Consistency", fontWeight = FontWeight.Bold, color = TextWhite, fontSize = 15.sp)
                    Spacer(modifier = Modifier.height(14.dp))

                    val days = listOf("Mon" to 2340, "Tue" to 2410, "Wed" to 2280, "Thu" to 2450, "Fri" to 2390, "Sat" to 2510, "Sun" to uiState.totalCalories)
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.Bottom
                    ) {
                        days.forEach { (day, cal) ->
                            val barHeight = ((cal / 2800f) * 100).dp
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Box(
                                    modifier = Modifier
                                        .width(22.dp)
                                        .height(barHeight)
                                        .clip(RoundedCornerShape(6.dp))
                                        .background(if (day == "Sun") EmeraldGreen else SurfaceNavy)
                                )
                                Spacer(modifier = Modifier.height(6.dp))
                                Text(day, fontSize = 11.sp, color = if (day == "Sun") NeonGreen else TextMuted)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun VitalStatCard(
    label: String,
    value: String,
    subtext: String,
    color: Color,
    modifier: Modifier = Modifier
) {
    Card(
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = CardNavy),
        modifier = modifier
    ) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(label, fontSize = 11.sp, color = TextMuted)
            Spacer(modifier = Modifier.height(4.dp))
            Text(value, fontSize = 16.sp, fontWeight = FontWeight.Bold, color = color)
            Spacer(modifier = Modifier.height(2.dp))
            Text(subtext, fontSize = 9.sp, color = TextMuted)
        }
    }
}

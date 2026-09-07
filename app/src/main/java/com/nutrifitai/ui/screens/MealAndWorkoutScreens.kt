package com.nutrifitai.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
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
import com.nutrifitai.ui.navigation.Screen
import com.nutrifitai.ui.theme.*
import com.nutrifitai.ui.viewmodel.NutriFitViewModel

@Composable
fun AiMealPlannerScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    var selectedCuisine by remember { mutableStateOf("Tamil Traditional") }
    val cuisines = listOf("Tamil Traditional", "South Indian High-Protein", "North Indian Balanced", "Keto Indian")

    val mealPlan = when (selectedCuisine) {
        "South Indian High-Protein" -> listOf(
            Triple("Breakfast (420 kcal)", "2 Green Moong Pesarattu + Ginger Chutney + 2 Boiled Egg Whites", "P: 24g • C: 48g • F: 8g"),
            Triple("Lunch (680 kcal)", "1.5 cups Brown Rice + Drumstick Sambar + 150g Grilled Chicken Breast + Cucumber Raita", "P: 46g • C: 72g • F: 14g"),
            Triple("Snack (210 kcal)", "Boiled Chickpeas (Sundal) with coconut + Green Tea", "P: 12g • C: 30g • F: 4g"),
            Triple("Dinner (520 kcal)", "3 Multigrain Phulkas + 150g Paneer Bhurji + Tomato Salad", "P: 30g • C: 54g • F: 18g")
        )
        "North Indian Balanced" -> listOf(
            Triple("Breakfast (380 kcal)", "Paneer Stuffed Besan Chilla + Mint Coriander Chutney + Warm Skimmed Milk", "P: 22g • C: 36g • F: 12g"),
            Triple("Lunch (620 kcal)", "2 Whole Wheat Rotis + Dal Makhani (Low Cream) + Soya Chunks Curry + Onion Salad", "P: 38g • C: 68g • F: 14g"),
            Triple("Snack (180 kcal)", "Roasted Makhana (Foxnuts) + Handful Almonds", "P: 6g • C: 20g • F: 8g"),
            Triple("Dinner (480 kcal)", "Yellow Moong Dal Khichdi + Curd + Stir-fried French Beans", "P: 20g • C: 62g • F: 10g")
        )
        else -> listOf(
            Triple("Breakfast (410 kcal)", "3 Steamed Idlis + Spicy Sambar + 1 Boiled Egg + Coconut Chutney", "P: 18g • C: 62g • F: 7g"),
            Triple("Lunch (650 kcal)", "Steamed Rice + Poondu Rasam + Chettinad Chicken Masala / Soya Roast + Cabbage Poriyal", "P: 42g • C: 76g • F: 15g"),
            Triple("Snack (220 kcal)", "Konda Kadalai Sundal (tempered black chickpeas) + Filter Coffee with skim milk", "P: 14g • C: 32g • F: 3g"),
            Triple("Dinner (510 kcal)", "2 Wheat Dosas + Vegetable Kurma + 1 cup Low-Fat Curd", "P: 20g • C: 64g • F: 14g")
        )
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(VeryDarkNavy)
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(14.dp)
    ) {
        Spacer(modifier = Modifier.height(8.dp))

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = { onNavigate(Screen.Home.route) }) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextWhite)
            }
            Text(
                text = "AI Indian Meal Planner",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = TextWhite
            )
            Box(modifier = Modifier.size(48.dp))
        }

        // Cuisine pills
        LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            items(cuisines) { cuisine ->
                val isSel = selectedCuisine == cuisine
                Surface(
                    shape = RoundedCornerShape(16.dp),
                    color = if (isSel) EmeraldGreen else SurfaceNavy,
                    modifier = Modifier.clickable { selectedCuisine = cuisine }
                ) {
                    Text(
                        text = cuisine,
                        fontSize = 12.sp,
                        fontWeight = if (isSel) FontWeight.Bold else FontWeight.Normal,
                        color = if (isSel) VeryDarkNavy else TextLightGray,
                        modifier = Modifier.padding(horizontal = 12.dp, vertical = 8.dp)
                    )
                }
            }
        }

        Text(
            text = "Personalized 2,400 kcal Blueprint",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
            color = NeonGreen
        )

        LazyColumn(
            verticalArrangement = Arrangement.spacedBy(10.dp),
            contentPadding = PaddingValues(bottom = 20.dp)
        ) {
            items(mealPlan) { (title, meal, macros) ->
                Card(
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = CardNavy),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = title,
                                style = MaterialTheme.typography.titleMedium,
                                fontSize = 15.sp,
                                fontWeight = FontWeight.Bold,
                                color = TextWhite
                            )
                            Surface(
                                shape = RoundedCornerShape(8.dp),
                                color = GlowGreen
                            ) {
                                Text(
                                    text = "AI Verified",
                                    fontSize = 10.sp,
                                    color = NeonGreen,
                                    modifier = Modifier.padding(horizontal = 6.dp, vertical = 2.dp)
                                )
                            }
                        }
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = meal,
                            style = MaterialTheme.typography.bodyMedium,
                            color = TextLightGray
                        )
                        Spacer(modifier = Modifier.height(6.dp))
                        Text(
                            text = macros,
                            style = MaterialTheme.typography.bodySmall,
                            color = EmeraldGreen,
                            fontWeight = FontWeight.SemiBold
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun AiWorkoutPlanScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val workout = uiState.currentWorkout

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(VeryDarkNavy)
            .padding(horizontal = 14.dp),
        contentPadding = PaddingValues(top = 8.dp, bottom = 20.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        item {
            // Header card
            Card(
                shape = RoundedCornerShape(22.dp),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(18.dp)) {
                    Text(
                        text = "TODAY'S WORKOUT PLAN",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = NeonGreen,
                        letterSpacing = 1.sp
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = workout.title,
                        style = MaterialTheme.typography.titleLarge,
                        fontWeight = FontWeight.ExtraBold,
                        color = TextWhite
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                        Text("${workout.durationMinutes} min", color = TextLightGray, fontSize = 13.sp)
                        Text("•", color = TextMuted, fontSize = 13.sp)
                        Text("${workout.caloriesBurned} kcal burn", color = Color(0xFFF97316), fontSize = 13.sp, fontWeight = FontWeight.Bold)
                        Text("•", color = TextMuted, fontSize = 13.sp)
                        Text(workout.level, color = EmeraldGreen, fontSize = 13.sp)
                    }

                    Spacer(modifier = Modifier.height(16.dp))

                    Button(
                        onClick = { onNavigate(Screen.WorkoutTimer.route) },
                        colors = ButtonDefaults.buttonColors(containerColor = EmeraldGreen),
                        shape = RoundedCornerShape(14.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(48.dp)
                            .testTag("start_workout_button")
                    ) {
                        Icon(Icons.Default.PlayArrow, contentDescription = null, tint = VeryDarkNavy)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("Start Workout Session", color = VeryDarkNavy, fontWeight = FontWeight.Bold)
                    }
                }
            }
        }

        item {
            Text(
                text = "Exercises (${workout.exercises.size})",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = TextWhite
            )
        }

        items(workout.exercises) { exercise ->
            Card(
                shape = RoundedCornerShape(16.dp),
                colors = CardDefaults.cardColors(containerColor = SurfaceNavy),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier.padding(14.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(14.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(CircleShape)
                            .background(CardNavy),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Default.FitnessCenter, contentDescription = null, tint = NeonGreen, modifier = Modifier.size(22.dp))
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(exercise.name, fontWeight = FontWeight.Bold, color = TextWhite, fontSize = 15.sp)
                        Text("${exercise.sets} sets • ${exercise.repsOrDuration}", color = EmeraldGreen, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                        Text(exercise.instruction, color = TextMuted, fontSize = 11.sp)
                    }
                    Surface(shape = RoundedCornerShape(8.dp), color = CardNavy) {
                        Text(
                            text = exercise.targetMuscle,
                            fontSize = 11.sp,
                            color = TextLightGray,
                            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun WorkoutTimerScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    val workout = uiState.currentWorkout
    val curIndex = uiState.currentExerciseIndex
    val currentExercise = workout.exercises.getOrNull(curIndex) ?: workout.exercises.first()

    val totalSec = uiState.workoutTimerSeconds
    val min = totalSec / 60
    val sec = totalSec % 60
    val formattedTime = String.format("%02d:%02d", min, sec)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(VeryDarkNavy)
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = { onNavigate(Screen.AiWorkoutPlan.route) }) {
                Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextWhite)
            }
            Text("Workout Session", style = MaterialTheme.typography.titleMedium, fontSize = 17.sp, fontWeight = FontWeight.Bold, color = TextWhite)
            IconButton(onClick = { viewModel.resetWorkoutTimer() }) {
                Icon(Icons.Default.Refresh, contentDescription = "Reset", tint = TextMuted)
            }
        }

        // Active Exercise Information
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(6.dp)
        ) {
            Surface(
                shape = RoundedCornerShape(12.dp),
                color = SurfaceNavy
            ) {
                Text(
                    text = "Exercise ${curIndex + 1} of ${workout.exercises.size}",
                    color = NeonGreen,
                    fontSize = 11.5.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(horizontal = 10.dp, vertical = 5.dp)
                )
            }

            Text(
                text = currentExercise.name,
                style = MaterialTheme.typography.titleLarge,
                fontSize = 24.sp,
                fontWeight = FontWeight.ExtraBold,
                color = TextWhite
            )

            Text(
                text = "${currentExercise.sets} Sets • ${currentExercise.repsOrDuration}",
                style = MaterialTheme.typography.titleMedium,
                fontSize = 15.sp,
                color = EmeraldGreen,
                fontWeight = FontWeight.Bold
            )

            Text(
                text = currentExercise.instruction,
                style = MaterialTheme.typography.bodyMedium,
                fontSize = 13.sp,
                color = TextLightGray
            )
        }

        // Stopwatch Timer Display
        Box(
            modifier = Modifier
                .size(176.dp)
                .clip(CircleShape)
                .background(CardNavy),
            contentAlignment = Alignment.Center
        ) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = formattedTime,
                    style = MaterialTheme.typography.displayLarge,
                    fontSize = 38.sp,
                    fontWeight = FontWeight.Black,
                    color = TextWhite
                )
                Text(
                    text = if (uiState.isWorkoutTimerRunning) "RUNNING" else "PAUSED",
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold,
                    color = if (uiState.isWorkoutTimerRunning) NeonGreen else TextMuted
                )
            }
        }

        // Controls
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(
                onClick = { viewModel.previousExercise() },
                modifier = Modifier.size(56.dp)
            ) {
                Icon(Icons.Default.SkipPrevious, contentDescription = "Previous", tint = TextWhite, modifier = Modifier.size(32.dp))
            }

            FloatingActionButton(
                onClick = { viewModel.toggleWorkoutTimer() },
                containerColor = EmeraldGreen,
                contentColor = VeryDarkNavy,
                modifier = Modifier
                    .size(72.dp)
                    .testTag("workout_timer_toggle")
            ) {
                Icon(
                    imageVector = if (uiState.isWorkoutTimerRunning) Icons.Default.Pause else Icons.Default.PlayArrow,
                    contentDescription = "Toggle",
                    modifier = Modifier.size(36.dp)
                )
            }

            IconButton(
                onClick = { viewModel.nextExercise() },
                modifier = Modifier.size(56.dp)
            ) {
                Icon(Icons.Default.SkipNext, contentDescription = "Next", tint = TextWhite, modifier = Modifier.size(32.dp))
            }
        }

        Spacer(modifier = Modifier.height(16.dp))
    }
}

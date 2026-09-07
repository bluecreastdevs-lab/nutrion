package com.nutrifitai.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nutrifitai.data.local.entity.FoodEntity
import com.nutrifitai.data.model.*
import com.nutrifitai.data.repository.NutriFitRepository
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

data class NutriFitUiState(
    val userProfile: UserProfile = UserProfile(),
    val loggedFoods: List<FoodEntity> = emptyList(),
    val totalCalories: Int = 0,
    val totalProtein: Float = 0f,
    val totalCarbs: Float = 0f,
    val totalFat: Float = 0f,
    val totalFiber: Float = 0f,
    val waterLiters: Float = 1.8f,
    val steps: Int = 7420,
    val sleepHours: Float = 7.5f,
    val streakDays: Int = 12,
    val fastingState: FastingState = FastingState(),
    val currentWorkout: WorkoutPlan = WorkoutPlan(
        id = "w_1",
        title = "Upper Body & Core Power",
        durationMinutes = 45,
        level = "Intermediate",
        caloriesBurned = 380,
        exercises = listOf(
            ExerciseItem("e1", "Push-ups", 3, "15 reps", "Chest & Triceps", 60, "Keep core tight and lower chest to floor"),
            ExerciseItem("e2", "Dumbbell Overhead Press", 4, "12 reps", "Shoulders", 60, "Press straight overhead without arching back"),
            ExerciseItem("e3", "Dumbbell Rows", 4, "12 reps", "Back & Biceps", 60, "Hinge at hips, pull elbows back toward ribs"),
            ExerciseItem("e4", "Plank Hold", 3, "45 sec", "Core", 45, "Keep body in a straight line, breathe steadily")
        )
    ),
    val workoutTimerSeconds: Int = 0,
    val isWorkoutTimerRunning: Boolean = false,
    val currentExerciseIndex: Int = 0,
    val scannedMealResult: ScannedMealResult? = null,
    val aiMessages: List<AiChatMessage> = listOf(
        AiChatMessage("1", "ai", "Vanakkam Gopinath! I'm your NutriFit AI Nutrition & Fitness Coach. How can I assist you with your Indian diet, Tamil meals, or workouts today?", "09:00 AM")
    ),
    val isAiThinking: Boolean = false
)

class NutriFitViewModel(private val repository: NutriFitRepository) : ViewModel() {

    private val _uiState = MutableStateFlow(NutriFitUiState())
    val uiState: StateFlow<NutriFitUiState> = _uiState.asStateFlow()

    private var workoutTimerJob: Job? = null
    private var fastingTimerJob: Job? = null

    init {
        // Collect Room database food logs
        viewModelScope.launch {
            repository.allFoods.collect { list ->
                val foods = if (list.isEmpty()) {
                    // Pre-populate with initial daily meals if database is fresh
                    seedInitialFoods()
                    return@collect
                } else list

                val cal = foods.sumOf { it.calories }
                val pro = foods.sumOf { it.protein.toDouble() }.toFloat()
                val carb = foods.sumOf { it.carbs.toDouble() }.toFloat()
                val fat = foods.sumOf { it.fat.toDouble() }.toFloat()
                val fib = foods.sumOf { it.fiber.toDouble() }.toFloat()

                _uiState.update { current ->
                    current.copy(
                        loggedFoods = foods,
                        totalCalories = cal,
                        totalProtein = pro,
                        totalCarbs = carb,
                        totalFat = fat,
                        totalFiber = fib
                    )
                }
            }
        }
    }

    private fun seedInitialFoods() {
        viewModelScope.launch {
            val initial = listOf(
                FoodEntity(
                    name = "Oats with Milk & Banana",
                    category = "Breakfast",
                    portion = "1 bowl (250g)",
                    calories = 520,
                    protein = 16f,
                    carbs = 82f,
                    fat = 9f,
                    fiber = 8f,
                    timeLogged = "08:15 AM"
                ),
                FoodEntity(
                    name = "Brown Rice + Sambar + Chicken Tikka",
                    category = "Lunch",
                    portion = "1 plate (350g)",
                    calories = 650,
                    protein = 42f,
                    carbs = 78f,
                    fat = 14f,
                    fiber = 5f,
                    timeLogged = "01:30 PM"
                ),
                FoodEntity(
                    name = "Curd with Fresh Pomegranate",
                    category = "Snack",
                    portion = "1 small bowl (180g)",
                    calories = 220,
                    protein = 9f,
                    carbs = 30f,
                    fat = 5f,
                    fiber = 3f,
                    timeLogged = "05:00 PM"
                ),
                FoodEntity(
                    name = "2 Phulkas + Dal Tadka + Paneer",
                    category = "Dinner",
                    portion = "2 rotis + 1 bowl dal (300g)",
                    calories = 490,
                    protein = 25f,
                    carbs = 62f,
                    fat = 14f,
                    fiber = 7f,
                    timeLogged = "08:45 PM"
                )
            )
            initial.forEach { repository.insertFood(it) }
        }
    }

    fun addFood(name: String, category: String, portion: String, calories: Int, protein: Float, carbs: Float, fat: Float, fiber: Float) {
        viewModelScope.launch {
            val time = SimpleDateFormat("hh:mm a", Locale.getDefault()).format(Date())
            val food = FoodEntity(
                name = name,
                category = category,
                portion = portion,
                calories = calories,
                protein = protein,
                carbs = carbs,
                fat = fat,
                fiber = fiber,
                timeLogged = time
            )
            repository.insertFood(food)
        }
    }

    fun deleteFood(id: Long) {
        viewModelScope.launch {
            repository.deleteFood(id)
        }
    }

    fun logWater(ml: Int) {
        val time = SimpleDateFormat("hh:mm a", Locale.getDefault()).format(Date())
        viewModelScope.launch {
            repository.logWater(ml, time)
            _uiState.update { it.copy(waterLiters = it.waterLiters + (ml / 1000f)) }
        }
    }

    fun updateProfile(profile: UserProfile) {
        _uiState.update { it.copy(userProfile = profile) }
    }

    // Fasting Actions
    fun toggleFasting() {
        _uiState.update { current ->
            val newActive = !current.fastingState.isActive
            current.copy(fastingState = current.fastingState.copy(isActive = newActive))
        }
    }

    fun setFastingPreset(preset: String) {
        val target = when (preset) {
            "18:6" -> 18 * 3600L
            "20:4" -> 20 * 3600L
            "OMAD" -> 23 * 3600L
            else -> 16 * 3600L
        }
        _uiState.update { it.copy(fastingState = it.fastingState.copy(preset = preset, targetSeconds = target)) }
    }

    // Workout Timer Actions
    fun toggleWorkoutTimer() {
        val running = _uiState.value.isWorkoutTimerRunning
        if (running) {
            workoutTimerJob?.cancel()
            _uiState.update { it.copy(isWorkoutTimerRunning = false) }
        } else {
            _uiState.update { it.copy(isWorkoutTimerRunning = true) }
            workoutTimerJob = viewModelScope.launch {
                while (true) {
                    delay(1000)
                    _uiState.update { it.copy(workoutTimerSeconds = it.workoutTimerSeconds + 1) }
                }
            }
        }
    }

    fun resetWorkoutTimer() {
        workoutTimerJob?.cancel()
        _uiState.update { it.copy(workoutTimerSeconds = 0, isWorkoutTimerRunning = false) }
    }

    fun nextExercise() {
        val cur = _uiState.value.currentExerciseIndex
        val total = _uiState.value.currentWorkout.exercises.size
        if (cur < total - 1) {
            _uiState.update { it.copy(currentExerciseIndex = cur + 1) }
        }
    }

    fun previousExercise() {
        val cur = _uiState.value.currentExerciseIndex
        if (cur > 0) {
            _uiState.update { it.copy(currentExerciseIndex = cur - 1) }
        }
    }

    // AI Scanner
    fun setScannedResult(result: ScannedMealResult?) {
        _uiState.update { it.copy(scannedMealResult = result) }
    }

    // AI Nutrition Coach Chat
    fun sendAiMessage(userText: String) {
        val time = SimpleDateFormat("hh:mm a", Locale.getDefault()).format(Date())
        val userMsg = AiChatMessage(UUID.randomUUID().toString(), "user", userText, time)
        _uiState.update {
            it.copy(
                aiMessages = it.aiMessages + userMsg,
                isAiThinking = true
            )
        }

        viewModelScope.launch {
            delay(900) // Realistic thoughtful processing
            val reply = generateAiCoachResponse(userText, _uiState.value)
            val aiMsg = AiChatMessage(UUID.randomUUID().toString(), "ai", reply, SimpleDateFormat("hh:mm a", Locale.getDefault()).format(Date()))
            _uiState.update {
                it.copy(
                    aiMessages = it.aiMessages + aiMsg,
                    isAiThinking = false
                )
            }
        }
    }

    private fun generateAiCoachResponse(prompt: String, state: NutriFitUiState): String {
        val lower = prompt.lowercase()
        val remainingCal = state.userProfile.targetCalories - state.totalCalories
        val targetProtein = state.userProfile.targetProtein
        val curProtein = state.totalProtein.toInt()

        return when {
            lower.contains("dinner") || lower.contains("night") ->
                "For dinner, aim for high protein with light complex carbs:\n\n• 2 Multigrain Phulkas + 1 cup Yellow Dal Tadka + 120g Paneer Bhurji (~32g protein, 480 kcal).\n• Non-Veg: 150g Grilled Fish or Chicken Breast + stir-fried beans & carrots (~40g protein, 390 kcal).\n• Vegan: Soya chunks curry with cucumber tomato salad (~30g protein, 410 kcal)."

            lower.contains("breakfast") || lower.contains("morning") ->
                "Energetic South Indian breakfast options:\n\n• 2 Pesarattu (green moong dal dosa) with ginger chutney + 1 cup curd (~18g protein, 360 kcal).\n• 3 Steamed Idlis with drumstick sambar + 2 boiled egg whites (~19g protein, 310 kcal).\n• Rolled oats cooked in milk with almonds, chia seeds & 1 scoop whey (~32g protein, 420 kcal)."

            lower.contains("tamil") || lower.contains("south") || lower.contains("dosa") || lower.contains("sambar") ->
                "Great Tamil & South Indian protein powerhouses:\n\n1. Pesarattu (பாசிப்பயறு தோசை) - rich in plant protein.\n2. Konda Kadalai Sundal (சுண்டல்) - tempered chickpeas (~12g protein/cup).\n3. Soya Chunks Chettinad Masala - highest protein density (52g / 100g dry weight).\n4. Egg Kalaki / Podimas - quick post-workout boost (~14g protein)."

            lower.contains("calorie") || lower.contains("macro") || lower.contains("remaining") ->
                "📊 Daily Status Check:\n• Target: ${state.userProfile.targetCalories} kcal\n• Eaten: ${state.totalCalories} kcal\n• Remaining: ${if (remainingCal > 0) "$remainingCal kcal" else "Target Reached!"}\n• Protein: ${curProtein}g / ${targetProtein}g\n\nYou're on track! A protein shake or 100g roasted paneer can easily cover remaining macros."

            lower.contains("workout") || lower.contains("gym") || lower.contains("exercise") ->
                "Today's recommended routine: Upper Body Hypertrophy (45 min)\n\n• Push-ups: 3 sets x 15 reps\n• Dumbbell Overhead Press: 4 sets x 12 reps\n• Dumbbell Rows: 4 sets x 12 reps\n• Plank: 3 sets x 45-60 sec\n\nRest 60 seconds between sets and drink 250ml water every 20 mins."

            lower.contains("protein") ->
                "Top Indian protein sources to hit your ${targetProtein}g daily goal:\n\n• Soya Chunks (52g protein / 100g dry)\n• Whey Isolate (25g per scoop)\n• Chicken Breast (31g / 100g)\n• Paneer (18g / 100g)\n• Eggs (6g per whole egg, 3.6g per white)\n• Moong Dal & Rajma (8-9g cooked / 100g)"

            else ->
                "Hi ${state.userProfile.name}! I'm tracking your ${state.userProfile.goal.title} goal. You have ${remainingCal.coerceAtLeast(0)} kcal remaining for today. Feel free to ask about Indian meal suggestions, workout splits, or fast food calorie estimates!"
        }
    }
}

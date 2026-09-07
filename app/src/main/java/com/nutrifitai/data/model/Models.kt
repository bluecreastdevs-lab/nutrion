package com.nutrifitai.data.model

enum class MealCategory(val title: String) {
    Breakfast("Breakfast"),
    Lunch("Lunch"),
    Snack("Snack"),
    Dinner("Dinner")
}

enum class GoalType(val title: String) {
    WeightLoss("Weight Loss"),
    WeightGain("Weight Gain"),
    MuscleGain("Muscle Gain"),
    FatLoss("Fat Loss"),
    MaintainWeight("Maintain Weight")
}

enum class ActivityLevel(val title: String) {
    Sedentary("Sedentary"),
    LightlyActive("Lightly Active"),
    ModeratelyActive("Moderately Active"),
    VeryActive("Very Active"),
    Athlete("Athlete")
}

enum class FoodDietPreference(val title: String) {
    Vegetarian("Vegetarian"),
    NonVegetarian("Non-Vegetarian"),
    Vegan("Vegan"),
    Eggitarian("Eggitarian"),
    Jain("Jain")
}

data class UserProfile(
    val name: String = "Gopinath",
    val email: String = "gopinathvarudharajcsecs24-28@ksrce.ac.in",
    val age: Int = 23,
    val gender: String = "Male",
    val heightCm: Float = 178f,
    val weightKg: Float = 72.5f,
    val goal: GoalType = GoalType.MuscleGain,
    val activityLevel: ActivityLevel = ActivityLevel.ModeratelyActive,
    val dietPreference: FoodDietPreference = FoodDietPreference.NonVegetarian,
    val cuisines: List<String> = listOf("Tamil", "South Indian", "North Indian"),
    val targetCalories: Int = 2400,
    val targetProtein: Int = 150,
    val targetCarbs: Int = 300,
    val targetFat: Int = 70,
    val targetFiber: Int = 30,
    val targetWaterLiters: Float = 3.0f,
    val targetSteps: Int = 10000,
    val targetSleepHours: Int = 8
) {
    val bmi: Float
        get() {
            val hM = heightCm / 100f
            return if (hM > 0) weightKg / (hM * hM) else 22f
        }

    val bmr: Int
        get() = (10 * weightKg + 6.25 * heightCm - 5 * age + 5).toInt()

    val tdee: Int
        get() = (bmr * 1.55).toInt()
}

data class FoodItem(
    val id: String,
    val name: String,
    val category: MealCategory,
    val portion: String,
    val calories: Int,
    val protein: Float,
    val carbs: Float,
    val fat: Float,
    val fiber: Float,
    val timeLogged: String = "Today",
    val isFavorite: Boolean = false
)

data class WaterLog(
    val id: Long = 0,
    val time: String,
    val amountMl: Int
)

data class ExerciseItem(
    val id: String,
    val name: String,
    val sets: Int,
    val repsOrDuration: String,
    val targetMuscle: String,
    val restSeconds: Int,
    val instruction: String,
    var completedSets: Int = 0
)

data class WorkoutPlan(
    val id: String,
    val title: String,
    val durationMinutes: Int,
    val level: String,
    val caloriesBurned: Int,
    val exercises: List<ExerciseItem>
)

data class FastingState(
    val isActive: Boolean = false,
    val preset: String = "16:8",
    val elapsedSeconds: Long = 14 * 3600 + 32 * 60,
    val targetSeconds: Long = 16 * 3600,
    val startTime: String = "08:00 PM"
)

data class AiChatMessage(
    val id: String,
    val sender: String, // "ai" or "user"
    val text: String,
    val timestamp: String
)

data class ScannedDetectedFood(
    val name: String,
    val portion: String,
    val calories: Int,
    val protein: Float,
    val carbs: Float,
    val fat: Float,
    val fiber: Float,
    val confidence: Int
)

data class ScannedMealResult(
    val title: String,
    val confidence: Int,
    val foods: List<ScannedDetectedFood>,
    val totalCalories: Int,
    val totalProtein: Float,
    val totalCarbs: Float,
    val totalFat: Float,
    val totalFiber: Float,
    val glycemicIndex: String = "Medium",
    val healthScore: Int = 88,
    val aiInsights: List<String> = emptyList()
)

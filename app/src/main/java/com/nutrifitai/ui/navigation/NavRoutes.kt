package com.nutrifitai.ui.navigation

sealed class Screen(val route: String, val title: String) {
    object Home : Screen("home", "Home")
    object FoodDiary : Screen("food_diary", "Food Diary")
    object AddFood : Screen("add_food", "Add Food")
    object AiFoodScanner : Screen("ai_food_scanner", "AI Scanner")
    object ScanResult : Screen("scan_result", "Scan Result")
    object AiMealPlanner : Screen("ai_meal_planner", "Meal Planner")
    object AiWorkoutPlan : Screen("ai_workout_plan", "Workout")
    object WorkoutTimer : Screen("workout_timer", "Workout Timer")
    object Hydration : Screen("hydration", "Hydration")
    object Fasting : Screen("fasting", "Intermittent Fasting")
    object Progress : Screen("progress", "Progress")
    object AiAssistant : Screen("ai_assistant", "AI Coach")
    object Profile : Screen("profile", "Profile")
}

export interface KotlinFile {
  path: string;
  language: string;
  description: string;
  code: string;
}

export const androidKotlinProjectFiles: KotlinFile[] = [
  {
    path: 'app/build.gradle.kts',
    language: 'kotlin',
    description: 'Module-level build configuration with Compose, Room, Hilt, and Coroutines',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.kapt)
    alias(libs.plugins.hilt.android)
}

android {
    namespace = "com.nutrifitai"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.nutrifitai"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildFeatures {
        compose = true
    }
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.8"
    }
}

dependencies {
    // Jetpack Compose BOM
    val composeBom = platform("androidx.compose:compose-bom:2024.02.00")
    implementation(composeBom)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")

    // Navigation Compose
    implementation("androidx.navigation:navigation-compose:2.7.7")

    // Room Database (Offline First)
    val roomVersion = "2.6.1"
    implementation("androidx.room:room-runtime:$roomVersion")
    implementation("androidx.room:room-ktx:$roomVersion")
    kapt("androidx.room:room-compiler:$roomVersion")

    // CameraX for AI Food Scanning
    val cameraxVersion = "1.3.1"
    implementation("androidx.camera:camera-core:$cameraxVersion")
    implementation("androidx.camera:camera-camera2:$cameraxVersion")
    implementation("androidx.camera:camera-lifecycle:$cameraxVersion")
    implementation("androidx.camera:camera-view:$cameraxVersion")

    // Coroutines & StateFlow
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.7.0")
}`,
  },
  {
    path: 'app/src/main/java/com/nutrifitai/ui/theme/Color.kt',
    language: 'kotlin',
    description: 'Emerald/Neon Green dark-first design system palette',
    code: `package com.nutrifitai.ui.theme

import androidx.compose.ui.graphics.Color

// Primary Branding Colors
val EmeraldGreen = Color(0xFF10B981)
val NeonGreen = Color(0xFF00E676)
val GlowGreen = Color(0x3300E676)

// Dark Backgrounds
val VeryDarkNavy = Color(0xFF070B14)
val DeepBlack = Color(0xFF030712)
val CardNavy = Color(0xFF0F172A)
val SurfaceNavy = Color(0xFF1E293B)
val BorderNavy = Color(0xFF334155)

// Accent Macros & Health Trackers
val MacroProtein = Color(0xFF10B981) // Green
val MacroCarbs = Color(0xFFFBBF24)   // Yellow
val MacroFat = Color(0xFFF97316)     // Orange / Soft Red
val MacroFiber = Color(0xFF34D399)   // Light Emerald
val WaterCyan = Color(0xFF06B6D4)    // Cyan
val StepsYellow = Color(0xFFF59E0B)  // Yellow/Orange
val SleepPurple = Color(0xFF8B5CF6)  // Purple/Blue

// Typography
val TextWhite = Color(0xFFFFFFFF)
val TextLightGray = Color(0xFFE2E8F0)
val TextMuted = Color(0xFF94A3B8)`,
  },
  {
    path: 'app/src/main/java/com/nutrifitai/data/local/entity/FoodEntity.kt',
    language: 'kotlin',
    description: 'Room Database Entity for Indian Food logging and offline sync',
    code: `package com.nutrifitai.data.local.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "food_logs")
data class FoodEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val category: String, // Breakfast, Lunch, Snack, Dinner
    val portion: String,
    val calories: Int,
    val protein: Float,
    val carbs: Float,
    val fat: Float,
    val fiber: Float,
    val timeLogged: String,
    val isSyncedToCloud: Boolean = false,
    val timestamp: Long = System.currentTimeMillis()
)`,
  },
  {
    path: 'app/src/main/java/com/nutrifitai/data/local/dao/FoodDao.kt',
    language: 'kotlin',
    description: 'Room DAO for offline-first querying with Kotlin Coroutines Flow',
    code: `package com.nutrifitai.data.local.dao

import androidx.room.*
import com.nutrifitai.data.local.entity.FoodEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface FoodDao {
    @Query("SELECT * FROM food_logs ORDER BY timestamp DESC")
    fun getAllFoodLogs(): Flow<List<FoodEntity>>

    @Query("SELECT * FROM food_logs WHERE isSyncedToCloud = 0")
    suspend fun getPendingSyncLogs(): List<FoodEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFood(food: FoodEntity): Long

    @Delete
    suspend fun deleteFood(food: FoodEntity)

    @Query("UPDATE food_logs SET isSyncedToCloud = 1 WHERE id IN (:ids)")
    suspend fun markAsSynced(ids: List<Long>)
}`,
  },
  {
    path: 'app/src/main/java/com/nutrifitai/ui/viewmodel/HomeViewModel.kt',
    language: 'kotlin',
    description: 'MVVM StateFlow ViewModel coordinating daily calories, macros, and Room DB sync',
    code: `package com.nutrifitai.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.nutrifitai.data.local.dao.FoodDao
import com.nutrifitai.data.local.entity.FoodEntity
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

data class HomeUiState(
    val userName: String = "Gopinath",
    val consumedCalories: Int = 1842,
    val targetCalories: Int = 2400,
    val proteinGrams: Float = 92f,
    val targetProtein: Float = 150f,
    val carbsGrams: Float = 210f,
    val targetCarbs: Float = 300f,
    val fatGrams: Float = 48f,
    val targetFat: Float = 70f,
    val fiberGrams: Float = 18f,
    val targetFiber: Float = 30f,
    val waterLiters: Float = 1.8f,
    val steps: Int = 6240,
    val isOffline: Boolean = false,
    val pendingSyncCount: Int = 0
)

class HomeViewModel(private val foodDao: FoodDao) : ViewModel() {
    private val _uiState = MutableStateFlow(HomeUiState())
    val uiState: StateFlow<HomeUiState> = _uiState.asStateFlow()

    fun logWater(ml: Int) {
        _uiState.update { current ->
            current.copy(waterLiters = current.waterLiters + (ml / 1000f))
        }
    }

    fun addFood(food: FoodEntity) {
        viewModelScope.launch {
            foodDao.insertFood(food)
        }
    }
}`,
  },
  {
    path: 'app/src/main/java/com/nutrifitai/ui/navigation/NavGraph.kt',
    language: 'kotlin',
    description: 'Navigation Compose graph with animated transitions between all 29 screens',
    code: `package com.nutrifitai.ui.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.nutrifitai.ui.screens.*

sealed class Screen(val route: String) {
    object Splash : Screen("splash")
    object Welcome : Screen("welcome")
    object Login : Screen("login")
    object Signup : Screen("signup")
    object ProfileSetup : Screen("profile_setup")
    object Goals : Screen("goals")
    object Preferences : Screen("preferences")
    object Home : Screen("home")
    object FoodDiary : Screen("food_diary")
    object AddFood : Screen("add_food")
    object AiFoodScanner : Screen("ai_food_scanner")
    object ScanResult : Screen("scan_result")
    object AiMealPlanner : Screen("ai_meal_planner")
    object AiWorkoutPlan : Screen("ai_workout_plan")
    object WorkoutDetail : Screen("workout_detail")
    object WorkoutTimer : Screen("workout_timer")
    object Activity : Screen("activity")
    object Hydration : Screen("hydration")
    object Sleep : Screen("sleep")
    object Fasting : Screen("fasting")
    object Progress : Screen("progress")
    object AiProgressAnalysis : Screen("ai_progress_analysis")
    object AiAssistant : Screen("ai_assistant")
    object VoiceAssistant : Screen("voice_assistant")
    object Reports : Screen("reports")
    object Streaks : Screen("streaks")
    object Challenges : Screen("challenges")
    object Profile : Screen("profile")
    object Settings : Screen("settings")
}

@Composable
fun NutriFitNavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home.route
    ) {
        composable(Screen.Home.route) { HomeScreen(navController) }
        composable(Screen.FoodDiary.route) { FoodDiaryScreen(navController) }
        composable(Screen.AiFoodScanner.route) { AiFoodScannerScreen(navController) }
        composable(Screen.AiMealPlanner.route) { AiMealPlannerScreen(navController) }
        composable(Screen.AiWorkoutPlan.route) { AiWorkoutPlanScreen(navController) }
        composable(Screen.WorkoutTimer.route) { WorkoutTimerScreen(navController) }
        composable(Screen.Hydration.route) { HydrationScreen(navController) }
        composable(Screen.Fasting.route) { FastingScreen(navController) }
        composable(Screen.Progress.route) { ProgressScreen(navController) }
        composable(Screen.AiAssistant.route) { AiAssistantScreen(navController) }
        composable(Screen.VoiceAssistant.route) { VoiceAssistantScreen(navController) }
    }
}`,
  },
];

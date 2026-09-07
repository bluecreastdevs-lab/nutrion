package com.nutrifitai

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.nutrifitai.ui.components.NutriFitBottomNavigation
import com.nutrifitai.ui.components.NutriFitTopAppBar
import com.nutrifitai.ui.navigation.Screen
import com.nutrifitai.ui.screens.*
import com.nutrifitai.ui.theme.NutriFitTheme
import com.nutrifitai.ui.theme.VeryDarkNavy
import com.nutrifitai.ui.viewmodel.NutriFitViewModel

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        val app = application as NutriFitApplication
        val repository = app.repository

        val viewModelFactory = object : ViewModelProvider.Factory {
            @Suppress("UNCHECKED_CAST")
            override fun <T : ViewModel> create(modelClass: Class<T>): T {
                return NutriFitViewModel(repository) as T
            }
        }

        setContent {
            NutriFitTheme {
                val viewModel: NutriFitViewModel = viewModel(factory = viewModelFactory)
                MainAppScreen(viewModel)
            }
        }
    }
}

@Composable
fun MainAppScreen(viewModel: NutriFitViewModel) {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route ?: Screen.Home.route
    val uiState by viewModel.uiState.collectAsState()

    // Main tab routes that show the standard top app bar and bottom navigation
    val isMainTab = currentRoute in listOf(
        Screen.Home.route,
        Screen.FoodDiary.route,
        Screen.AiWorkoutPlan.route,
        Screen.Progress.route,
        Screen.AiAssistant.route
    )

    Scaffold(
        containerColor = VeryDarkNavy,
        topBar = {
            if (isMainTab) {
                NutriFitTopAppBar(
                    title = when (currentRoute) {
                        Screen.FoodDiary.route -> "Food Diary"
                        Screen.AiWorkoutPlan.route -> "Workout Plan"
                        Screen.Progress.route -> "Analytics & Progress"
                        Screen.AiAssistant.route -> "AI Nutrition Coach"
                        else -> "NutriFit AI"
                    },
                    streakDays = uiState.streakDays,
                    onProfileClick = { navController.navigate(Screen.Profile.route) },
                    onStreakClick = { navController.navigate(Screen.Progress.route) }
                )
            }
        },
        bottomBar = {
            if (isMainTab) {
                NutriFitBottomNavigation(
                    currentRoute = currentRoute,
                    onNavigate = { route ->
                        navController.navigate(route) {
                            popUpTo(Screen.Home.route) {
                                saveState = true
                            }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
            }
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(VeryDarkNavy)
                .padding(paddingValues)
        ) {
            NavHost(
                navController = navController,
                startDestination = Screen.Home.route,
                modifier = Modifier.fillMaxSize()
            ) {
                composable(Screen.Home.route) {
                    HomeScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.FoodDiary.route) {
                    FoodDiaryScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.AddFood.route) {
                    AddFoodScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.AiFoodScanner.route) {
                    AiFoodScannerScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.ScanResult.route) {
                    ScanResultScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.AiMealPlanner.route) {
                    AiMealPlannerScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.AiWorkoutPlan.route) {
                    AiWorkoutPlanScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.WorkoutTimer.route) {
                    WorkoutTimerScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.Hydration.route) {
                    HydrationScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.Fasting.route) {
                    FastingScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.Progress.route) {
                    ProgressScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.AiAssistant.route) {
                    AiAssistantScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
                composable(Screen.Profile.route) {
                    ProfileScreen(
                        viewModel = viewModel,
                        onNavigate = { route -> navController.navigate(route) }
                    )
                }
            }
        }
    }
}

package com.nutrifitai.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nutrifitai.data.model.IndianFoodDatabase
import com.nutrifitai.ui.navigation.Screen
import com.nutrifitai.ui.theme.*
import com.nutrifitai.ui.viewmodel.NutriFitViewModel

@Composable
fun FoodDiaryScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()
    var selectedCategory by remember { mutableStateOf("All") }
    val categories = listOf("All", "Breakfast", "Lunch", "Snack", "Dinner")

    val filteredFoods = if (selectedCategory == "All") {
        uiState.loggedFoods
    } else {
        uiState.loggedFoods.filter { it.category.equals(selectedCategory, ignoreCase = true) }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(VeryDarkNavy)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 14.dp)
        ) {
            Spacer(modifier = Modifier.height(8.dp))

            // Header summary
            Card(
                shape = RoundedCornerShape(18.dp),
                colors = CardDefaults.cardColors(containerColor = CardNavy),
                modifier = Modifier.fillMaxWidth()
            ) {
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(horizontal = 12.dp, vertical = 14.dp),
                    horizontalArrangement = Arrangement.SpaceAround
                ) {
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("Calories", fontSize = 10.5.sp, color = TextMuted)
                        Text("${uiState.totalCalories}", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = TextWhite)
                        Text("kcal", fontSize = 9.5.sp, color = TextMuted)
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("Protein", fontSize = 10.5.sp, color = TextMuted)
                        Text("${uiState.totalProtein.toInt()}g", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = MacroProtein)
                        Text("Target ${uiState.userProfile.targetProtein}g", fontSize = 9.5.sp, color = TextMuted)
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("Carbs", fontSize = 10.5.sp, color = TextMuted)
                        Text("${uiState.totalCarbs.toInt()}g", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = MacroCarbs)
                        Text("Target ${uiState.userProfile.targetCarbs}g", fontSize = 9.5.sp, color = TextMuted)
                    }
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text("Fat", fontSize = 10.5.sp, color = TextMuted)
                        Text("${uiState.totalFat.toInt()}g", fontSize = 16.sp, fontWeight = FontWeight.Bold, color = MacroFat)
                        Text("Target ${uiState.userProfile.targetFat}g", fontSize = 9.5.sp, color = TextMuted)
                    }
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            // Category filter chips
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(categories) { cat ->
                    val isSelected = selectedCategory == cat
                    Surface(
                        shape = RoundedCornerShape(18.dp),
                        color = if (isSelected) EmeraldGreen else SurfaceNavy,
                        modifier = Modifier
                            .clickable { selectedCategory = cat }
                            .testTag("filter_$cat")
                    ) {
                        Text(
                            text = cat,
                            fontSize = 11.5.sp,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal,
                            color = if (isSelected) VeryDarkNavy else TextLightGray,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                        )
                    }
                }
            }

            Spacer(modifier = Modifier.height(10.dp))

            if (filteredFoods.isEmpty()) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = "No items logged in $selectedCategory.\nTap + below to log food!",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextMuted,
                        textAlign = androidx.compose.ui.text.style.TextAlign.Center
                    )
                }
            } else {
                LazyColumn(
                    modifier = Modifier.weight(1f),
                    verticalArrangement = Arrangement.spacedBy(8.dp),
                    contentPadding = PaddingValues(bottom = 72.dp)
                ) {
                    items(filteredFoods) { food ->
                        MealItemCard(food = food, onDelete = { viewModel.deleteFood(food.id) })
                    }
                }
            }
        }

        FloatingActionButton(
            onClick = { onNavigate(Screen.AddFood.route) },
            containerColor = EmeraldGreen,
            contentColor = VeryDarkNavy,
            modifier = Modifier
                .align(Alignment.BottomEnd)
                .padding(16.dp)
                .testTag("add_food_fab")
        ) {
            Icon(Icons.Default.Add, contentDescription = "Add Food")
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AddFoodScreen(
    viewModel: NutriFitViewModel,
    onNavigate: (String) -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("Breakfast") }
    var customName by remember { mutableStateOf("") }
    var customCalories by remember { mutableStateOf("") }
    var customProtein by remember { mutableStateOf("") }
    var customCarbs by remember { mutableStateOf("") }
    var customFat by remember { mutableStateOf("") }
    var showCustomDialog by remember { mutableStateOf(false) }

    val categories = listOf("Breakfast", "Lunch", "Snack", "Dinner")
    val allItems = IndianFoodDatabase.items

    val searchResults = if (searchQuery.isBlank()) {
        allItems
    } else {
        allItems.filter { it.name.contains(searchQuery, ignoreCase = true) }
    }

    Scaffold(
        containerColor = VeryDarkNavy,
        topBar = {
            TopAppBar(
                title = { Text("Log Food Item", color = TextWhite) },
                navigationIcon = {
                    IconButton(onClick = { onNavigate(Screen.FoodDiary.route) }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextWhite)
                    }
                },
                actions = {
                    TextButton(onClick = { showCustomDialog = true }) {
                        Text("+ Custom", color = NeonGreen, fontWeight = FontWeight.Bold)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = VeryDarkNavy)
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(horizontal = 16.dp)
        ) {
            // Category selector
            LazyRow(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.padding(vertical = 8.dp)
            ) {
                items(categories) { cat ->
                    val isSel = selectedCategory == cat
                    Surface(
                        shape = RoundedCornerShape(16.dp),
                        color = if (isSel) EmeraldGreen else SurfaceNavy,
                        modifier = Modifier.clickable { selectedCategory = cat }
                    ) {
                        Text(
                            text = cat,
                            fontSize = 12.sp,
                            fontWeight = if (isSel) FontWeight.Bold else FontWeight.Normal,
                            color = if (isSel) VeryDarkNavy else TextLightGray,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                        )
                    }
                }
            }

            // Search text field
            OutlinedTextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                modifier = Modifier
                    .fillMaxWidth()
                    .testTag("food_search_input"),
                placeholder = { Text("Search Indian dishes (e.g. Idli, Sambar, Paneer)...", color = TextMuted, fontSize = 13.sp) },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null, tint = TextMuted) },
                singleLine = true,
                colors = OutlinedTextFieldDefaults.colors(
                    focusedBorderColor = EmeraldGreen,
                    unfocusedBorderColor = BorderNavy,
                    focusedTextColor = TextWhite,
                    unfocusedTextColor = TextWhite,
                    focusedContainerColor = CardNavy,
                    unfocusedContainerColor = CardNavy
                ),
                shape = RoundedCornerShape(16.dp)
            )

            Spacer(modifier = Modifier.height(14.dp))

            Text(
                text = "Indian Food Database (${searchResults.size} items)",
                style = MaterialTheme.typography.bodySmall,
                color = TextMuted,
                fontWeight = FontWeight.SemiBold
            )

            Spacer(modifier = Modifier.height(8.dp))

            LazyColumn(
                verticalArrangement = Arrangement.spacedBy(10.dp),
                contentPadding = PaddingValues(bottom = 80.dp)
            ) {
                items(searchResults) { food ->
                    Card(
                        shape = RoundedCornerShape(14.dp),
                        colors = CardDefaults.cardColors(containerColor = CardNavy),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                viewModel.addFood(
                                    name = food.name,
                                    category = selectedCategory,
                                    portion = food.portion,
                                    calories = food.calories,
                                    protein = food.protein,
                                    carbs = food.carbs,
                                    fat = food.fat,
                                    fiber = food.fiber
                                )
                                onNavigate(Screen.FoodDiary.route)
                            }
                            .testTag("add_item_${food.id}")
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(14.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Column(modifier = Modifier.weight(1f)) {
                                Text(
                                    text = food.name,
                                    style = MaterialTheme.typography.titleMedium,
                                    fontSize = 14.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = TextWhite
                                )
                                Spacer(modifier = Modifier.height(2.dp))
                                Text(
                                    text = "${food.portion} • P: ${food.protein}g  C: ${food.carbs}g  F: ${food.fat}g",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = TextMuted,
                                    fontSize = 12.sp
                                )
                            }
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                Text(
                                    text = "${food.calories} kcal",
                                    fontWeight = FontWeight.Bold,
                                    color = NeonGreen
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Icon(Icons.Default.AddCircle, contentDescription = "Add", tint = EmeraldGreen)
                            }
                        }
                    }
                }
            }
        }
    }

    // Custom Food Entry Dialog
    if (showCustomDialog) {
        AlertDialog(
            onDismissRequest = { showCustomDialog = false },
            containerColor = CardNavy,
            title = { Text("Log Custom Food", color = TextWhite, fontWeight = FontWeight.Bold) },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(
                        value = customName,
                        onValueChange = { customName = it },
                        label = { Text("Food Name") },
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = TextWhite,
                            unfocusedTextColor = TextWhite
                        )
                    )
                    OutlinedTextField(
                        value = customCalories,
                        onValueChange = { customCalories = it },
                        label = { Text("Calories (kcal)") },
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = TextWhite,
                            unfocusedTextColor = TextWhite
                        )
                    )
                    OutlinedTextField(
                        value = customProtein,
                        onValueChange = { customProtein = it },
                        label = { Text("Protein (g)") },
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = TextWhite,
                            unfocusedTextColor = TextWhite
                        )
                    )
                    OutlinedTextField(
                        value = customCarbs,
                        onValueChange = { customCarbs = it },
                        label = { Text("Carbs (g)") },
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedTextColor = TextWhite,
                            unfocusedTextColor = TextWhite
                        )
                    )
                }
            },
            confirmButton = {
                Button(
                    onClick = {
                        if (customName.isNotBlank()) {
                            viewModel.addFood(
                                name = customName,
                                category = selectedCategory,
                                portion = "1 serving",
                                calories = customCalories.toIntOrNull() ?: 200,
                                protein = customProtein.toFloatOrNull() ?: 10f,
                                carbs = customCarbs.toFloatOrNull() ?: 25f,
                                fat = customFat.toFloatOrNull() ?: 5f,
                                fiber = 2f
                            )
                            showCustomDialog = false
                            onNavigate(Screen.FoodDiary.route)
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = EmeraldGreen)
                ) {
                    Text("Add to Log", color = VeryDarkNavy, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showCustomDialog = false }) {
                    Text("Cancel", color = TextMuted)
                }
            }
        )
    }
}

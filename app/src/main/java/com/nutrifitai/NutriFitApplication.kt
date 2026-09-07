package com.nutrifitai

import android.app.Application
import com.nutrifitai.data.local.NutriFitDatabase
import com.nutrifitai.data.repository.NutriFitRepository

class NutriFitApplication : Application() {
    val database by lazy { NutriFitDatabase.getDatabase(this) }
    val repository by lazy { NutriFitRepository(database.foodDao(), database.waterDao()) }
}

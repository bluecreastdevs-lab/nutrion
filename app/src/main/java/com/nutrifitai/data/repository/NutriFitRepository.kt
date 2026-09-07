package com.nutrifitai.data.repository

import com.nutrifitai.data.local.dao.FoodDao
import com.nutrifitai.data.local.dao.WaterDao
import com.nutrifitai.data.local.entity.FoodEntity
import com.nutrifitai.data.local.entity.WaterLogEntity
import kotlinx.coroutines.flow.Flow

class NutriFitRepository(
    private val foodDao: FoodDao,
    private val waterDao: WaterDao
) {
    val allFoods: Flow<List<FoodEntity>> = foodDao.getAllFoods()
    val allWaterLogs: Flow<List<WaterLogEntity>> = waterDao.getAllWaterLogs()

    suspend fun insertFood(food: FoodEntity): Long {
        return foodDao.insertFood(food)
    }

    suspend fun deleteFood(id: Long) {
        foodDao.deleteFoodById(id)
    }

    suspend fun logWater(amountMl: Int, time: String): Long {
        val entity = WaterLogEntity(
            time = time,
            amountMl = amountMl
        )
        return waterDao.insertWater(entity)
    }
}

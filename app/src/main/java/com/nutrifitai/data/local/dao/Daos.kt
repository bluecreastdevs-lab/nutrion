package com.nutrifitai.data.local.dao

import androidx.room.*
import com.nutrifitai.data.local.entity.FoodEntity
import com.nutrifitai.data.local.entity.WaterLogEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface FoodDao {
    @Query("SELECT * FROM food_logs ORDER BY timestamp DESC")
    fun getAllFoods(): Flow<List<FoodEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFood(food: FoodEntity): Long

    @Query("DELETE FROM food_logs WHERE id = :id")
    suspend fun deleteFoodById(id: Long)

    @Query("DELETE FROM food_logs")
    suspend fun clearAll()
}

@Dao
interface WaterDao {
    @Query("SELECT * FROM water_logs ORDER BY timestamp DESC")
    fun getAllWaterLogs(): Flow<List<WaterLogEntity>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertWater(log: WaterLogEntity): Long

    @Query("DELETE FROM water_logs")
    suspend fun clearAll()
}

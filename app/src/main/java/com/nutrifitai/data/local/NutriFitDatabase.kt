package com.nutrifitai.data.local

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.nutrifitai.data.local.dao.FoodDao
import com.nutrifitai.data.local.dao.WaterDao
import com.nutrifitai.data.local.entity.FoodEntity
import com.nutrifitai.data.local.entity.WaterLogEntity

@Database(
    entities = [FoodEntity::class, WaterLogEntity::class],
    version = 1,
    exportSchema = false
)
abstract class NutriFitDatabase : RoomDatabase() {
    abstract fun foodDao(): FoodDao
    abstract fun waterDao(): WaterDao

    companion object {
        @Volatile
        private var INSTANCE: NutriFitDatabase? = null

        fun getDatabase(context: Context): NutriFitDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    NutriFitDatabase::class.java,
                    "nutrifit_database"
                ).fallbackToDestructiveMigration().build()
                INSTANCE = instance
                instance
            }
        }
    }
}

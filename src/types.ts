export type ScreenType =
  | 'SPLASH'
  | 'WELCOME'
  | 'LOGIN'
  | 'SIGNUP'
  | 'PROFILE_SETUP'
  | 'GOALS'
  | 'PREFERENCES'
  | 'HOME'
  | 'FOOD_DIARY'
  | 'ADD_FOOD'
  | 'AI_FOOD_SCANNER'
  | 'SCAN_RESULT'
  | 'AI_MEAL_PLANNER'
  | 'AI_WORKOUT_PLAN'
  | 'WORKOUT_DETAIL'
  | 'WORKOUT_TIMER'
  | 'ACTIVITY'
  | 'HYDRATION'
  | 'SLEEP'
  | 'FASTING'
  | 'PROGRESS'
  | 'AI_PROGRESS_ANALYSIS'
  | 'AI_ASSISTANT'
  | 'VOICE_ASSISTANT'
  | 'REPORTS'
  | 'STREAKS'
  | 'CHALLENGES'
  | 'PROFILE'
  | 'SETTINGS';

export type BottomNavTab = 'home' | 'food' | 'workout' | 'progress' | 'ai';

export type GoalType =
  | 'Weight Loss'
  | 'Weight Gain'
  | 'Muscle Gain'
  | 'Fat Loss'
  | 'Six-Pack'
  | 'Maintain Weight';

export type ActivityLevel =
  | 'Sedentary'
  | 'Lightly Active'
  | 'Moderately Active'
  | 'Very Active'
  | 'Athlete';

export type FoodDietPreference =
  | 'Vegetarian'
  | 'Non-Vegetarian'
  | 'Vegan'
  | 'Eggitarian'
  | 'Jain';

export type RegionalCuisine =
  | 'Tamil'
  | 'South Indian'
  | 'North Indian'
  | 'Kerala'
  | 'Andhra'
  | 'Telangana'
  | 'Karnataka'
  | 'Bengali'
  | 'Gujarati'
  | 'Maharashtrian';

export interface UserProfile {
  name: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  heightCm: number;
  weightKg: number;
  goal: GoalType;
  activityLevel: ActivityLevel;
  dietPreference: FoodDietPreference;
  cuisines: RegionalCuisine[];
  avatarUrl: string;
  bmi: number;
  bmr: number;
  tdee: number;
  targetCalories: number;
  targetProtein: number; // in grams
  targetCarbs: number; // in grams
  targetFat: number; // in grams
  targetFiber: number; // in grams
  targetWaterLiters: number;
  targetSteps: number;
  targetSleepHours: number;
}

export type MealCategory = 'Breakfast' | 'Lunch' | 'Snack' | 'Dinner';

export interface ScannedFoodDetectedItem {
  name: string;
  portion: string;
  weightGrams?: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  confidence?: number;
}

export interface ScannedMealResult {
  title: string;
  imageUrl: string;
  confidence: number;
  foods: ScannedFoodDetectedItem[];
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  micronutrients?: {
    sodiumMg: number;
    potassiumMg: number;
    calciumMg: number;
    ironMg: number;
    vitaminCPercent: number;
  };
  glycemicIndex?: 'Low' | 'Medium' | 'High';
  healthScore?: number;
  aiInsights?: string[];
}

export interface FoodItem {
  id: string;
  name: string;
  category: MealCategory;
  portion: string;
  weightGrams?: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  imageUrl: string;
  timeLogged?: string;
  isFavorite?: boolean;
}

export interface DayMealLog {
  dateStr: string; // e.g., 'Today, 3 Sep'
  items: FoodItem[];
}

export interface ExerciseItem {
  id: string;
  name: string;
  sets: number;
  repsOrDuration: string;
  targetMuscle: string;
  completedSets?: number;
  restSeconds: number;
  instruction: string;
  imageUrl?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  durationMinutes: number;
  level: string;
  caloriesBurned: number;
  exercises: ExerciseItem[];
}

export interface WaterLog {
  time: string;
  amountMl: number;
}

export interface FastingState {
  isActive: boolean;
  preset: '16:8' | '18:6' | '20:4' | 'OMAD' | 'Custom';
  elapsedSeconds: number; // e.g., 14*3600 + 32*60 + 18
  targetSeconds: number; // 16 * 3600
  startTime: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export interface StreakCategory {
  id: string;
  title: string;
  days: number;
  iconName: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface ChallengeItem {
  id: string;
  title: string;
  remainingText: string;
  progressText: string;
  progressPercent: number;
  joined: boolean;
  iconName: string;
}

export type DeviceType = 'pixel8' | 'galaxy' | 'promax' | 'tablet' | 'fullscreen';

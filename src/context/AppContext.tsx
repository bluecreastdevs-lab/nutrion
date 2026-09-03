import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ScreenType,
  BottomNavTab,
  UserProfile,
  FoodItem,
  ExerciseItem,
  WorkoutPlan,
  WaterLog,
  FastingState,
  AiChatMessage,
  StreakCategory,
  AchievementItem,
  ChallengeItem,
  DeviceType,
  ScannedMealResult,
} from '../types';
import {
  initialUserProfile,
  initialFoodItems,
  defaultWorkoutPlan,
  initialWaterLogs,
  streakCategories as initialStreaks,
  achievementsList as initialAchievements,
  challengesList as initialChallenges,
} from '../data/mockData';

interface AppContextType {
  // Navigation & Viewport
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType) => void;
  goBack: () => void;
  activeTab: BottomNavTab;
  setActiveTab: (tab: BottomNavTab) => void;
  deviceType: DeviceType;
  setDeviceType: (type: DeviceType) => void;

  // Offline / Room Database Sync Simulation
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  pendingSyncCount: number;
  triggerSync: () => void;

  // User Profile
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;

  // Food Logging
  foodLogs: FoodItem[];
  addFoodLog: (item: Omit<FoodItem, 'id'>) => void;
  deleteFoodLog: (id: string) => void;
  scannedMealResult: ScannedMealResult | null;
  setScannedMealResult: (result: ScannedMealResult | null) => void;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;

  // Hydration
  waterLiters: number;
  waterLogs: WaterLog[];
  addWater: (ml: number) => void;

  // Workout & Timer
  currentWorkout: WorkoutPlan;
  activeExercise: ExerciseItem;
  setActiveExercise: (exercise: ExerciseItem) => void;
  workoutTimerSeconds: number;
  isWorkoutTimerRunning: boolean;
  toggleWorkoutTimer: () => void;
  resetWorkoutTimer: () => void;
  startWorkout: (workoutTitle?: string) => void;
  finishWorkout: () => void;

  // Fasting
  fastingState: FastingState;
  setFastingPreset: (preset: '16:8' | '18:6' | '20:4' | 'OMAD' | 'Custom') => void;
  toggleFasting: () => void;

  // Streaks & Challenges
  streaks: StreakCategory[];
  achievements: AchievementItem[];
  challenges: ChallengeItem[];
  toggleChallenge: (id: string) => void;
  celebrateStreak: () => void;

  // AI Chat & Voice
  aiMessages: AiChatMessage[];
  sendAiMessage: (text: string) => Promise<void>;
  isAiTyping: boolean;

  // Kotlin Code Export Modal
  showCodeExport: boolean;
  setShowCodeExport: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation History
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['HOME']);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('HOME');
  const [activeTab, setActiveTabState] = useState<BottomNavTab>('home');
  const [deviceType, setDeviceType] = useState<DeviceType>('pixel8');

  // Offline / Sync status
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);

  // User & Foods
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [foodLogs, setFoodLogs] = useState<FoodItem[]>(initialFoodItems);
  const [scannedMealResult, setScannedMealResult] = useState<ScannedMealResult | null>(null);

  // Hydration (1.8 L)
  const [waterLiters, setWaterLiters] = useState<number>(1.8);
  const [waterLogs, setWaterLogs] = useState<WaterLog[]>(initialWaterLogs);

  // Workout
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutPlan>(defaultWorkoutPlan);
  const [activeExercise, setActiveExercise] = useState<ExerciseItem>(defaultWorkoutPlan.exercises[0]);
  const [workoutTimerSeconds, setWorkoutTimerSeconds] = useState<number>(42);
  const [isWorkoutTimerRunning, setIsWorkoutTimerRunning] = useState<boolean>(true);

  // Fasting (14:32:18)
  const [fastingState, setFastingState] = useState<FastingState>({
    isActive: true,
    preset: '16:8',
    elapsedSeconds: 14 * 3600 + 32 * 60 + 18,
    targetSeconds: 16 * 3600,
    startTime: 'Yesterday, 07:00 PM',
  });

  // Streaks & Gamification
  const [streaks, setStreaks] = useState<StreakCategory[]>(initialStreaks);
  const [achievements, setAchievements] = useState<AchievementItem[]>(initialAchievements);
  const [challenges, setChallenges] = useState<ChallengeItem[]>(initialChallenges);

  // AI Chat
  const [aiMessages, setAiMessages] = useState<AiChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'ai',
      text: 'Hi Gopinath 👋\nHow can I help you today?',
      timestamp: '09:00 AM',
    },
  ]);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const [showCodeExport, setShowCodeExport] = useState<boolean>(false);

  // Navigation handlers
  const navigateTo = (screen: ScreenType) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);

    // Sync active tab with screen
    if (screen === 'HOME') setActiveTabState('home');
    else if (screen === 'FOOD_DIARY' || screen === 'ADD_FOOD' || screen === 'AI_FOOD_SCANNER' || screen === 'SCAN_RESULT' || screen === 'AI_MEAL_PLANNER') {
      setActiveTabState('food');
    } else if (screen === 'AI_WORKOUT_PLAN' || screen === 'WORKOUT_DETAIL' || screen === 'WORKOUT_TIMER') {
      setActiveTabState('workout');
    } else if (screen === 'PROGRESS' || screen === 'AI_PROGRESS_ANALYSIS' || screen === 'REPORTS' || screen === 'ACTIVITY') {
      setActiveTabState('progress');
    } else if (screen === 'AI_ASSISTANT' || screen === 'VOICE_ASSISTANT') {
      setActiveTabState('ai');
    }
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('HOME');
      setActiveTabState('home');
    }
  };

  const setActiveTab = (tab: BottomNavTab) => {
    setActiveTabState(tab);
    switch (tab) {
      case 'home':
        navigateTo('HOME');
        break;
      case 'food':
        navigateTo('FOOD_DIARY');
        break;
      case 'workout':
        navigateTo('AI_WORKOUT_PLAN');
        break;
      case 'progress':
        navigateTo('PROGRESS');
        break;
      case 'ai':
        navigateTo('AI_ASSISTANT');
        break;
    }
  };

  // Profile update
  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
    if (isOffline) {
      setPendingSyncCount((c) => c + 1);
    }
  };

  // Food handlers
  const addFoodLog = (item: Omit<FoodItem, 'id'>) => {
    const newItem: FoodItem = {
      ...item,
      id: `food_${Date.now()}`,
      timeLogged: item.timeLogged || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setFoodLogs((prev) => [newItem, ...prev]);
    if (isOffline) {
      setPendingSyncCount((c) => c + 1);
    }
  };

  const deleteFoodLog = (id: string) => {
    setFoodLogs((prev) => prev.filter((item) => item.id !== id));
    if (isOffline) {
      setPendingSyncCount((c) => c + 1);
    }
  };

  // Calculated macro totals
  const totalCalories = foodLogs.reduce((acc, item) => acc + item.calories, 0);
  const totalProtein = foodLogs.reduce((acc, item) => acc + item.protein, 0);
  const totalCarbs = foodLogs.reduce((acc, item) => acc + item.carbs, 0);
  const totalFat = foodLogs.reduce((acc, item) => acc + item.fat, 0);
  const totalFiber = foodLogs.reduce((acc, item) => acc + item.fiber, 0);

  // Water handler
  const addWater = (ml: number) => {
    const addedLiters = ml / 1000;
    setWaterLiters((prev) => Number((prev + addedLiters).toFixed(2)));
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setWaterLogs((prev) => [...prev, { time: nowTime, amountMl: ml }]);
    if (isOffline) {
      setPendingSyncCount((c) => c + 1);
    }
  };

  // Workout Timer Ticks
  useEffect(() => {
    let interval: any = null;
    if (isWorkoutTimerRunning && currentScreen === 'WORKOUT_TIMER') {
      interval = setInterval(() => {
        setWorkoutTimerSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isWorkoutTimerRunning, currentScreen]);

  const toggleWorkoutTimer = () => {
    setIsWorkoutTimerRunning((prev) => !prev);
  };

  const resetWorkoutTimer = () => {
    setWorkoutTimerSeconds(0);
  };

  const startWorkout = (workoutTitle?: string) => {
    if (workoutTitle && currentWorkout.title !== workoutTitle) {
      setCurrentWorkout((prev) => ({ ...prev, title: workoutTitle }));
    }
    setWorkoutTimerSeconds(0);
    setIsWorkoutTimerRunning(true);
  };

  const finishWorkout = () => {
    setIsWorkoutTimerRunning(false);
    celebrateStreak();
    navigateTo('ACTIVITY');
  };

  // Fasting Timer Ticks
  useEffect(() => {
    let interval: any = null;
    if (fastingState.isActive) {
      interval = setInterval(() => {
        setFastingState((prev) => ({
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [fastingState.isActive]);

  const setFastingPreset = (preset: '16:8' | '18:6' | '20:4' | 'OMAD' | 'Custom') => {
    let target = 16 * 3600;
    if (preset === '18:6') target = 18 * 3600;
    if (preset === '20:4') target = 20 * 3600;
    if (preset === 'OMAD') target = 23 * 3600;
    if (preset === 'Custom') target = 14 * 3600;

    setFastingState((prev) => ({
      ...prev,
      preset,
      targetSeconds: target,
    }));
  };

  const toggleFasting = () => {
    setFastingState((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  // Confetti / Celebration
  const celebrateStreak = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00E676', '#10B981', '#FBBF24', '#06B6D4'],
      });
    } catch {
      // safe fallback
    }
  };

  // Room DB Sync simulation
  const triggerSync = () => {
    setIsOffline(false);
    setPendingSyncCount(0);
  };

  // Challenge Toggle
  const toggleChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, joined: !c.joined } : c))
    );
  };

  // AI Assistant Chat
  const sendAiMessage = async (text: string) => {
    const userMsg: AiChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setAiMessages((prev) => [...prev, userMsg]);
    setIsAiTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            user: userProfile.name,
            goal: userProfile.goal,
            caloriesConsumed: totalCalories,
            targetCalories: userProfile.targetCalories,
            protein: totalProtein,
            targetProtein: userProfile.targetProtein,
          },
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      const aiMsg: AiChatMessage = {
        id: `msg_${Date.now() + 1}`,
        sender: 'ai',
        text: data.reply || 'Great question! Maintain your protein target and stay consistent.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setAiMessages((prev) => [...prev, aiMsg]);
    } catch {
      // Fallback
      setTimeout(() => {
        const fallbackText = `Hi ${userProfile.name}! Based on your ${userProfile.goal} goal, aim for high protein Indian options like paneer, dal, soya chunks, and grilled chicken. You're at ${totalCalories} / ${userProfile.targetCalories} kcal today.`;
        setAiMessages((prev) => [
          ...prev,
          {
            id: `msg_${Date.now() + 1}`,
            sender: 'ai',
            text: fallbackText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 700);
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        goBack,
        activeTab,
        setActiveTab,
        deviceType,
        setDeviceType,
        isOffline,
        setIsOffline,
        pendingSyncCount,
        triggerSync,
        userProfile,
        updateUserProfile,
        foodLogs,
        addFoodLog,
        deleteFoodLog,
        scannedMealResult,
        setScannedMealResult,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        totalFiber,
        waterLiters,
        waterLogs,
        addWater,
        currentWorkout,
        activeExercise,
        setActiveExercise,
        workoutTimerSeconds,
        isWorkoutTimerRunning,
        toggleWorkoutTimer,
        resetWorkoutTimer,
        startWorkout,
        finishWorkout,
        fastingState,
        setFastingPreset,
        toggleFasting,
        streaks,
        achievements,
        challenges,
        toggleChallenge,
        celebrateStreak,
        aiMessages,
        sendAiMessage,
        isAiTyping,
        showCodeExport,
        setShowCodeExport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

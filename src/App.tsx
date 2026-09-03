/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { AndroidStudioExportModal } from './components/common/AndroidStudioExportModal';

// Screen Components
import { SplashScreen } from './components/screens/SplashScreen';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignupScreen } from './components/screens/SignupScreen';
import { ProfileSetupScreen } from './components/screens/ProfileSetupScreen';
import { GoalsScreen } from './components/screens/GoalsScreen';
import { PreferencesScreen } from './components/screens/PreferencesScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { FoodDiaryScreen } from './components/screens/FoodDiaryScreen';
import { AddFoodScreen } from './components/screens/AddFoodScreen';
import { AiFoodScannerScreen } from './components/screens/AiFoodScannerScreen';
import { ScanResultScreen } from './components/screens/ScanResultScreen';
import { AiMealPlannerScreen } from './components/screens/AiMealPlannerScreen';
import { AiWorkoutPlanScreen } from './components/screens/AiWorkoutPlanScreen';
import { WorkoutDetailScreen } from './components/screens/WorkoutDetailScreen';
import { WorkoutTimerScreen } from './components/screens/WorkoutTimerScreen';
import { ActivityScreen } from './components/screens/ActivityScreen';
import { HydrationScreen } from './components/screens/HydrationScreen';
import { SleepScreen } from './components/screens/SleepScreen';
import { FastingScreen } from './components/screens/FastingScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { AiProgressAnalysisScreen } from './components/screens/AiProgressAnalysisScreen';
import { AiAssistantScreen } from './components/screens/AiAssistantScreen';
import { VoiceAssistantScreen } from './components/screens/VoiceAssistantScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { StreaksScreen } from './components/screens/StreaksScreen';
import { ChallengesScreen } from './components/screens/ChallengesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

const ScreenRouter: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'SPLASH':
      return <SplashScreen />;
    case 'WELCOME':
      return <WelcomeScreen />;
    case 'LOGIN':
      return <LoginScreen />;
    case 'SIGNUP':
      return <SignupScreen />;
    case 'PROFILE_SETUP':
      return <ProfileSetupScreen />;
    case 'GOALS':
      return <GoalsScreen />;
    case 'PREFERENCES':
      return <PreferencesScreen />;
    case 'HOME':
      return <HomeScreen />;
    case 'FOOD_DIARY':
      return <FoodDiaryScreen />;
    case 'ADD_FOOD':
      return <AddFoodScreen />;
    case 'AI_FOOD_SCANNER':
      return <AiFoodScannerScreen />;
    case 'SCAN_RESULT':
      return <ScanResultScreen />;
    case 'AI_MEAL_PLANNER':
      return <AiMealPlannerScreen />;
    case 'AI_WORKOUT_PLAN':
      return <AiWorkoutPlanScreen />;
    case 'WORKOUT_DETAIL':
      return <WorkoutDetailScreen />;
    case 'WORKOUT_TIMER':
      return <WorkoutTimerScreen />;
    case 'ACTIVITY':
      return <ActivityScreen />;
    case 'HYDRATION':
      return <HydrationScreen />;
    case 'SLEEP':
      return <SleepScreen />;
    case 'FASTING':
      return <FastingScreen />;
    case 'PROGRESS':
      return <ProgressScreen />;
    case 'AI_PROGRESS_ANALYSIS':
      return <AiProgressAnalysisScreen />;
    case 'AI_ASSISTANT':
      return <AiAssistantScreen />;
    case 'VOICE_ASSISTANT':
      return <VoiceAssistantScreen />;
    case 'REPORTS':
      return <ReportsScreen />;
    case 'STREAKS':
      return <StreaksScreen />;
    case 'CHALLENGES':
      return <ChallengesScreen />;
    case 'PROFILE':
      return <ProfileScreen />;
    case 'SETTINGS':
      return <SettingsScreen />;
    default:
      return <HomeScreen />;
  }
};

export default function App() {
  return (
    <AppProvider>
      <DeviceFrame>
        <ScreenRouter />
      </DeviceFrame>
      <AndroidStudioExportModal />
    </AppProvider>
  );
}

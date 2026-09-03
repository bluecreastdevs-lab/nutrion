import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, Check, Edit3, ArrowLeft, RefreshCw, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PrimaryButton, SecondaryButton } from '../common/Buttons';

export const VoiceAssistantScreen: React.FC = () => {
  const { navigateTo, addFoodLog, addWater, celebrateStreak } = useApp();
  const [language, setLanguage] = useState<'English' | 'Tamil'>('English');
  const [isListening, setIsListening] = useState(false);
  const [detectedText, setDetectedText] = useState('I ate two rotis and dal.');
  const [detectedFood, setDetectedFood] = useState({
    title: '2 Roti + Dal Tadka',
    calories: 420,
    protein: 16,
    carbs: 68,
    fat: 9,
    portion: '2 rotis + 1 bowl dal (270g)',
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const sampleCommands = [
    { text: 'I ate two rotis and dal.', lang: 'English' },
    { text: 'Add 500 ml water.', lang: 'English' },
    { text: 'Start my workout.', lang: 'English' },
    { text: "How many calories did I eat today?", lang: 'English' },
    { text: 'ரெண்டு இட்லி சாம்பார் சாப்பிட்டேன்', lang: 'Tamil' },
    { text: '500 மிலி தண்ணீர் குடிச்சேன்', lang: 'Tamil' },
  ];

  const handleSimulateVoice = (phrase: string, lang: 'English' | 'Tamil') => {
    setLanguage(lang);
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setDetectedText(phrase);
      if (phrase.includes('water') || phrase.includes('தண்ணீர்')) {
        setDetectedFood({
          title: '500 ml Water',
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          portion: '500 ml Hydration',
        });
      } else if (phrase.includes('இட்லி') || phrase.includes('idli')) {
        setDetectedFood({
          title: '2 Idli + Sambar',
          calories: 220,
          protein: 8,
          carbs: 42,
          fat: 2,
          portion: '2 Idlis (120g) + Sambar',
        });
      } else if (phrase.includes('workout')) {
        navigateTo('WORKOUT_TIMER');
      } else {
        setDetectedFood({
          title: '2 Roti + Dal Tadka',
          calories: 420,
          protein: 16,
          carbs: 68,
          fat: 9,
          portion: '2 rotis + 1 bowl dal (270g)',
        });
      }
    }, 1000);
  };

  const handleConfirm = () => {
    if (detectedFood.title.includes('Water')) {
      addWater(0.5);
    } else {
      addFoodLog({
        name: detectedFood.title,
        category: 'Lunch',
        portion: detectedFood.portion,
        calories: detectedFood.calories,
        protein: detectedFood.protein,
        carbs: detectedFood.carbs,
        fat: detectedFood.fat,
        fiber: 6,
        imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=80',
      });
    }
    setIsConfirmed(true);
    celebrateStreak();
    setTimeout(() => {
      navigateTo('FOOD_DIARY');
    }, 1200);
  };

  return (
    <div className="min-h-full pb-8 flex flex-col justify-between p-5 bg-[#070b14] text-white">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigateTo('HOME')}
            className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700/50 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setLanguage('English')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                language === 'English' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('Tamil')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                language === 'Tamil' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              தமிழ் (Tamil)
            </button>
          </div>
        </div>

        <div className="text-center mt-2">
          <h2 className="text-xl font-bold font-['Outfit'] text-white">
            {language === 'Tamil' ? 'குரல் உதவியாளர்' : 'AI Voice Assistant'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'Tamil'
              ? 'இயற்கையாக பேசுங்கள்: "ரெண்டு இட்லி சாம்பார் சாப்பிட்டேன்"'
              : 'Speak naturally: "I ate two rotis and dal"'}
          </p>
        </div>

        {/* Large Animated Microphone Visualizer */}
        <div className="flex flex-col items-center my-6">
          <div className="relative flex items-center justify-center">
            {/* Pulsing Ripple Rings */}
            <div
              className={`absolute w-36 h-36 rounded-full bg-emerald-500/10 border border-emerald-500/20 ${
                isListening ? 'animate-ping' : ''
              }`}
            />
            <div
              className={`absolute w-28 h-28 rounded-full bg-emerald-500/20 border border-emerald-500/30 ${
                isListening ? 'animate-pulse' : ''
              }`}
            />

            {/* Mic Center Button */}
            <button
              onClick={() =>
                handleSimulateVoice(
                  language === 'Tamil' ? 'ரெண்டு இட்லி சாம்பார் சாப்பிட்டேன்' : 'I ate two rotis and dal.',
                  language
                )
              }
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.35)] active:scale-95 transition-all cursor-pointer ${
                isListening
                  ? 'bg-red-500 text-white animate-bounce'
                  : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950'
              }`}
            >
              <Mic className="w-8 h-8 stroke-[2.5]" />
            </button>
          </div>

          <span className="text-xs font-semibold text-emerald-400 mt-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {isListening ? 'Listening & processing audio...' : 'Tap microphone to speak'}
          </span>
        </div>

        {/* Speech Recognition Output Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Transcribed Speech
            </span>
            <p className="text-sm font-semibold text-white mt-1 italic">
              "{detectedText}"
            </p>
          </div>

          {/* Parsed Result Box */}
          <div className="p-3 rounded-xl bg-[#0b1222] border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">
                Food Detected
              </span>
              <h4 className="text-sm font-bold text-white">{detectedFood.title}</h4>
              <span className="text-xs text-slate-400">{detectedFood.portion}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-emerald-400">{detectedFood.calories}</span>
              <span className="text-[10px] text-slate-400 block">kcal</span>
            </div>
          </div>
        </div>

        {/* Quick Sample Voice Command Chips */}
        <div className="mt-4">
          <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">
            Try speaking these commands:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateVoice(cmd.text, cmd.lang as any)}
                className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 text-xs active:scale-95 transition-all cursor-pointer"
              >
                {cmd.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons: Confirm & Edit */}
      <div className="space-y-2 pt-4">
        <PrimaryButton onClick={handleConfirm}>
          <Check className="w-4 h-4" />
          {isConfirmed ? 'Logged Successfully! ✓' : 'Confirm & Log to Diary'}
        </PrimaryButton>

        <SecondaryButton onClick={() => navigateTo('ADD_FOOD')}>
          <Edit3 className="w-4 h-4" />
          Edit Portion Details
        </SecondaryButton>
      </div>
    </div>
  );
};

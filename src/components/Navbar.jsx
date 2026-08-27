import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Award, 
  BookOpen, 
  Headphones, 
  Layers, 
  Mic, 
  FileCheck, 
  MessageSquare, 
  PenTool, 
  Gamepad2, 
  Printer, 
  BookMarked, 
  Quote, 
  LayoutDashboard, 
  Zap 
} from 'lucide-react';
import { sfx } from '../services/soundEffects';
import { calculateRank } from '../services/storageService';

export const TABS = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, color: '#FFE600' },
  { id: 'grammar', name: 'Grammar Master', icon: BookOpen, color: '#A855F7' },
  { id: 'listening', name: 'Listening Lab', icon: Headphones, color: '#4EED89' },
  { id: 'flashcards', name: 'Smart Flashcards', icon: Layers, color: '#FF5E8E' },
  { id: 'speaking', name: 'Speaking Coach', icon: Mic, color: '#38BDF8' },
  { id: 'exams', name: 'Kuis & Mock Exam', icon: FileCheck, color: '#F97316' },
  { id: 'roleplay', name: 'AI English Buddy', icon: MessageSquare, color: '#34D399' },
  { id: 'writing', name: 'Writing Checker', icon: PenTool, color: '#FBBF24' },
  { id: 'stories', name: 'Graded Stories', icon: BookMarked, color: '#C084FC' },
  { id: 'idioms', name: 'Idioms & Slang', icon: Quote, color: '#F43F5E' },
  { id: 'games', name: 'Games Arcade', icon: Gamepad2, color: '#E879F9' },
  { id: 'cheatsheets', name: 'Cheat Sheets', icon: Printer, color: '#60A5FA' },
];

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  userData, 
  setUserData 
}) {
  const { currentRank, progressPercent } = calculateRank(userData.xp);

  const handleLevelChange = (newLevel) => {
    sfx.playClick();
    setUserData(prev => ({ ...prev, selectedLevel: newLevel }));
  };

  const handleSoundToggle = () => {
    const next = !userData.soundEnabled;
    sfx.toggleSound(next);
    if (next) sfx.playClick();
    setUserData(prev => ({ ...prev, soundEnabled: next }));
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FEF9EF]/95 backdrop-blur-md border-b-3 border-[#18181B] select-none">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Clean Stylish Logo: jagoING */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center space-x-3 cursor-pointer" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFE600] border-3 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <Zap className="w-7 h-7 text-[#18181B] fill-current" />
              </motion.div>
            </div>
            
            <div className="flex items-baseline">
              <span className="font-black text-3xl text-[#18181B] font-['Outfit'] tracking-tight">
                jago<span className="text-[#FF5E8E]">ING</span>
              </span>
            </div>
          </motion.div>

          {/* Center: Neo Level Switcher */}
          <div className="flex items-center bg-[#FFFFFF] p-1.5 rounded-2xl border-3 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B]">
            {['SD', 'SMP', 'SMA'].map(lvl => {
              const isSelected = userData.selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => handleLevelChange(lvl)}
                  className={`relative px-4 py-1.5 text-xs font-black rounded-xl transition-all ${
                    isSelected ? 'text-[#18181B]' : 'text-[#71717A] hover:text-[#18181B]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-level-pill"
                      className="absolute inset-0 rounded-xl bg-[#FFE600] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{lvl}</span>
                </button>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Daily Streak */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#FFFBEB] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] text-[#18181B]"
            >
              <Flame className="w-4 h-4 text-[#F59E0B] fill-current animate-bounce" />
              <span className="font-extrabold text-xs">{userData.streak} Hari</span>
            </motion.div>

            {/* XP Rank */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] cursor-pointer hover:bg-[#FFE600] transition-colors"
              onClick={() => setActiveTab('dashboard')}
            >
              <Award className="w-4 h-4 text-[#A855F7]" />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-[10px] font-black text-[#18181B] uppercase leading-tight">
                  Lv.{currentRank.level} {currentRank.title}
                </span>
                <div className="w-16 bg-[#E4E4E7] h-1.5 rounded-full overflow-hidden border border-[#18181B] mt-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-[#FF5E8E] h-full rounded-full" 
                  />
                </div>
              </div>
              <span className="text-xs font-black text-[#18181B] bg-[#4EED89] px-2 py-0.5 rounded-md border border-[#18181B]">
                {userData.xp} XP
              </span>
            </motion.div>

            {/* Sound Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSoundToggle}
              aria-label="Toggle Sound"
              className="p-2.5 rounded-xl bg-[#FFFFFF] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#FFE600] transition-colors"
            >
              {userData.soundEnabled ? <Volume2 className="w-4 h-4 text-[#18181B]" /> : <VolumeX className="w-4 h-4 text-[#71717A]" />}
            </motion.button>

          </div>

        </div>
      </div>

      {/* Horizontal Nav Ribbon with Framer Motion Spring Tabs */}
      <div className="bg-[#FFFFFF] border-t-3 border-[#18181B] overflow-x-auto no-scrollbar py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex space-x-2 min-w-max">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  sfx.playClick();
                  setActiveTab(tab.id);
                }}
                className={`relative flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold border-2.5 border-[#18181B] transition-all ${
                  isActive
                    ? 'text-[#18181B] shadow-[3px_3px_0px_0px_#18181B] -rotate-1'
                    : 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] hover:shadow-[2px_2px_0px_0px_#18181B]'
                }`}
                style={{ backgroundColor: isActive ? tab.color : '#FFFFFF' }}
              >
                <Icon className="w-4 h-4 text-[#18181B]" />
                <span>{tab.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import DashboardModule from './components/Dashboard/DashboardModule';
import GrammarModule from './components/Grammar/GrammarModule';
import ListeningModule from './components/Listening/ListeningModule';
import FlashcardsModule from './components/Flashcards/FlashcardsModule';
import SpeakingModule from './components/Speaking/SpeakingModule';
import MockExamModule from './components/Exams/MockExamModule';
import RoleplayModule from './components/RoleplayChat/RoleplayModule';
import WritingModule from './components/Writing/WritingModule';
import StoriesModule from './components/Stories/StoriesModule';
import IdiomsModule from './components/Idioms/IdiomsModule';
import GamesModule from './components/Games/GamesModule';
import CheatSheetsModule from './components/CheatSheets/CheatSheetsModule';
import LevelUpModal from './components/Gamification/LevelUpModal';

import { 
  getStoredUserData, 
  saveUserData, 
  calculateRank 
} from './services/storageService';

const pageVariants = {
  initial: { opacity: 0, y: 12, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, y: -10, scale: 0.99, transition: { duration: 0.15 } }
};

export default function App() {
  const [userData, setUserData] = useState(() => getStoredUserData());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [earnedRank, setEarnedRank] = useState(null);

  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setUserData(prev => ({
        ...prev,
        studyTimeSeconds: (prev.studyTimeSeconds || 0) + 1
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEarnXP = (amount) => {
    setUserData(prev => {
      const prevRank = calculateRank(prev.xp).currentRank;
      const nextXP = prev.xp + amount;
      const newRank = calculateRank(nextXP).currentRank;

      if (newRank.level > prevRank.level) {
        setEarnedRank(newRank);
        setShowLevelUpModal(true);
      }

      return {
        ...prev,
        xp: nextXP
      };
    });
  };

  const handleCompleteQuest = (questId) => {
    setUserData(prev => {
      const quest = (prev.dailyQuests || []).find(q => q.id === questId && !q.completed);
      if (!quest) return prev;

      const prevRank = calculateRank(prev.xp).currentRank;
      const nextXP = prev.xp + quest.xp;
      const newRank = calculateRank(nextXP).currentRank;

      if (newRank.level > prevRank.level) {
        setEarnedRank(newRank);
        setShowLevelUpModal(true);
      }

      return {
        ...prev,
        xp: nextXP,
        dailyQuests: prev.dailyQuests.map(q =>
          q.id === questId ? { ...q, current: q.target, completed: true } : q
        )
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#FEF9EF] text-[#18181B] flex flex-col font-sans selection:bg-[#FFE600] selection:text-[#18181B]">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userData={userData} 
        setUserData={setUserData} 
      />

      {/* Main Content with Animated Tab Transitions */}
      <main className="flex-1 pb-16 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {activeTab === 'dashboard' && (
              <DashboardModule 
                userData={userData} 
                setActiveTab={setActiveTab} 
                onEarnXP={handleEarnXP} 
              />
            )}

            {activeTab === 'grammar' && (
              <GrammarModule 
                userData={userData} 
                onEarnXP={handleEarnXP} 
                onCompleteQuest={handleCompleteQuest} 
              />
            )}

            {activeTab === 'listening' && (
              <ListeningModule 
                userData={userData} 
                onEarnXP={handleEarnXP} 
                onCompleteQuest={handleCompleteQuest} 
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardsModule 
                userData={userData} 
                setUserData={setUserData} 
                onEarnXP={handleEarnXP} 
                onCompleteQuest={handleCompleteQuest} 
              />
            )}

            {activeTab === 'speaking' && (
              <SpeakingModule 
                userData={userData} 
                onEarnXP={handleEarnXP} 
                onCompleteQuest={handleCompleteQuest} 
              />
            )}

            {activeTab === 'exams' && (
              <MockExamModule 
                userData={userData} 
                setUserData={setUserData} 
                onEarnXP={handleEarnXP} 
                onCompleteQuest={handleCompleteQuest} 
              />
            )}

            {activeTab === 'roleplay' && (
              <RoleplayModule 
                userData={userData} 
                onEarnXP={handleEarnXP} 
                onCompleteQuest={handleCompleteQuest} 
              />
            )}

            {activeTab === 'writing' && (
              <WritingModule 
                onEarnXP={handleEarnXP} 
              />
            )}

            {activeTab === 'stories' && (
              <StoriesModule 
                userData={userData} 
                onEarnXP={handleEarnXP} 
                onCompleteQuest={handleCompleteQuest} 
              />
            )}

            {activeTab === 'idioms' && (
              <IdiomsModule 
                onEarnXP={handleEarnXP} 
              />
            )}

            {activeTab === 'games' && (
              <GamesModule 
                onEarnXP={handleEarnXP} 
              />
            )}

            {activeTab === 'cheatsheets' && (
              <CheatSheetsModule />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Level Up Modal */}
      {showLevelUpModal && earnedRank && (
        <LevelUpModal 
          rank={earnedRank} 
          onClose={() => setShowLevelUpModal(false)} 
        />
      )}

      {/* Clean Footer */}
      <footer className="border-t-3 border-[#18181B] py-6 text-center text-xs font-bold text-[#71717A] bg-[#FFFFFF] print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-black text-[#18181B] font-['Outfit'] text-base tracking-tight">jagoING</span>
            <span>• Platform Belajar Bahasa Inggris SD, SMP & SMA</span>
          </div>
          <div>
            <span>Dibuat dengan ❤️ untuk seluruh pelajar Indonesia</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

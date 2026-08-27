import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Sparkles, 
  Award, 
  BookOpen, 
  Headphones, 
  Layers, 
  FileCheck, 
  MessageSquare, 
  Mic,
  CheckCircle2, 
  ArrowRight,
  Trophy,
  Zap,
  Star
} from 'lucide-react';
import { calculateRank } from '../../services/storageService';
import { sfx } from '../../services/soundEffects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 25 }
  }
};

export default function DashboardModule({ 
  userData, 
  setActiveTab, 
  onEarnXP 
}) {
  const { currentRank, nextRank, progressPercent, xpToNext } = calculateRank(userData.xp);

  const srsCount = Object.keys(userData.srsCards || {}).length;
  const examCount = (userData.examHistory || []).length;
  const completedQuestsCount = userData.dailyQuests.filter(q => q.completed).length;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 py-8 space-y-8"
    >
      
      {/* Animated Marquee Ribbon */}
      <div className="relative overflow-hidden bg-[#18181B] text-[#FFE600] py-2 rounded-2xl border-3 border-[#18181B] shadow-[4px_4px_0px_0px_#FFE600]">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap space-x-8 text-xs font-black uppercase tracking-widest"
        >
          <span>⚡ Daily English Motivation: Practice makes progress!</span>
          <span>• 🎯 Target Harian: Selesaikan 4 Misi untuk Bonus XP</span>
          <span>• 🚀 Spaced Repetition SRS: Hafalan 5x Lebih Cepat</span>
          <span>• 🏆 Mock Exam: Uji Skor TOEFL & UTBK-SNBT</span>
          <span>⚡ Daily English Motivation: Practice makes progress!</span>
          <span>• 🎯 Target Harian: Selesaikan 4 Misi untuk Bonus XP</span>
          <span>• 🚀 Spaced Repetition SRS: Hafalan 5x Lebih Cepat</span>
        </motion.div>
      </div>

      {/* Hero Neo Banner with Floating Mascot Elements */}
      <motion.div 
        variants={itemVariants}
        className="p-8 sm:p-10 rounded-3xl bg-[#FFE600] border-4 border-[#18181B] shadow-[8px_8px_0px_0px_#18181B] relative overflow-hidden"
      >
        {/* Floating background decorative shapes */}
        <motion.div 
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#FF5E8E] rounded-3xl border-3 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] opacity-40 pointer-events-none"
        />
        <motion.div 
          animate={{ y: [0, 10, 0], rotate: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          className="absolute right-32 -top-6 w-20 h-20 bg-[#38BDF8] rounded-2xl border-3 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] opacity-40 pointer-events-none"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-xl bg-[#FFFFFF] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">
                JENJANG AKTIF: {userData.selectedLevel}
              </span>
              <span className="px-3.5 py-1 rounded-xl bg-[#FF5E8E] text-white font-black text-xs border-2.5 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] flex items-center space-x-1">
                <Flame className="w-4 h-4 fill-current animate-bounce" />
                <span>{userData.streak} HARI STREAK</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181B] font-['Outfit'] tracking-tight">
              Halo, {userData.name}! 👋 Siap Belajar Hari Ini?
            </h1>
            <p className="text-base font-bold text-[#18181B]/80 max-w-2xl leading-relaxed">
              Tingkatkan kemampuan bahasa Inggrismu dengan latihan interaktif. Kumpulkan XP dan raih gelar <strong>{nextRank ? nextRank.title : 'Grandmaster'}</strong>!
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              sfx.playClick();
              setActiveTab('grammar');
            }}
            className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-[#18181B] text-white font-black text-sm border-3 border-[#18181B] shadow-[5px_5px_0px_0px_#FFFFFF] hover:bg-[#FF5E8E] hover:text-[#18181B] hover:border-[#18181B] hover:shadow-[7px_7px_0px_0px_#18181B] transition-all shrink-0"
          >
            <span>Mulai Belajar Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Neo Bento Stat Cards with Spring Physics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.02 }}
          className="p-5 rounded-2xl bg-[#FFFFFF] border-3 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black text-[#71717A] uppercase">Level & Pangkat</span>
            <span className="p-2 rounded-xl bg-[#A855F7] border-2 border-[#18181B] text-white shadow-[2px_2px_0px_0px_#18181B]">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <h4 className="text-lg font-black text-[#18181B]">{currentRank.title}</h4>
          <span className="text-xs font-extrabold text-[#71717A]">Level {currentRank.level} • {userData.xp} XP</span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.02 }}
          className="p-5 rounded-2xl bg-[#FFFFFF] border-3 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black text-[#71717A] uppercase">Daily Streak</span>
            <span className="p-2 rounded-xl bg-[#F59E0B] border-2 border-[#18181B] text-white shadow-[2px_2px_0px_0px_#18181B]">
              <Flame className="w-4 h-4 fill-current" />
            </span>
          </div>
          <h4 className="text-lg font-black text-[#18181B]">{userData.streak} Hari Beruntun</h4>
          <span className="text-xs font-extrabold text-[#71717A]">{userData.freezeCount} Pelindung Beku</span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.02 }}
          className="p-5 rounded-2xl bg-[#FFFFFF] border-3 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black text-[#71717A] uppercase">Kosakata SRS</span>
            <span className="p-2 rounded-xl bg-[#FF5E8E] border-2 border-[#18181B] text-white shadow-[2px_2px_0px_0px_#18181B]">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <h4 className="text-lg font-black text-[#18181B]">{srsCount} Kartu Hafal</h4>
          <span className="text-xs font-extrabold text-[#71717A]">SuperMemo SM-2</span>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4, scale: 1.02 }}
          className="p-5 rounded-2xl bg-[#FFFFFF] border-3 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-black text-[#71717A] uppercase">Simulasi Ujian</span>
            <span className="p-2 rounded-xl bg-[#38BDF8] border-2 border-[#18181B] text-white shadow-[2px_2px_0px_0px_#18181B]">
              <FileCheck className="w-4 h-4" />
            </span>
          </div>
          <h4 className="text-lg font-black text-[#18181B]">{examCount} Sesi Tuntas</h4>
          <span className="text-xs font-extrabold text-[#71717A]">UTBK / TOEFL / UAS</span>
        </motion.div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Daily Quests Ticket */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div 
            variants={itemVariants}
            className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="neo-badge bg-[#4EED89] text-[#18181B] px-2.5 py-1 inline-block mb-1">
                  TARGET BELAJAR
                </span>
                <h3 className="text-2xl font-black text-[#18181B]">
                  Misi Harian ({completedQuestsCount}/{userData.dailyQuests.length})
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#F4F4F5] rounded-xl border-2 border-[#18181B] text-xs font-bold">
                Reset 24 Jam
              </span>
            </div>

            <div className="space-y-3">
              {userData.dailyQuests.map(q => (
                <motion.div 
                  key={q.id}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-2xl border-2.5 border-[#18181B] flex items-center justify-between transition-all ${
                    q.completed 
                      ? 'bg-[#ECFDF5] shadow-[2px_2px_0px_0px_#18181B]' 
                      : 'bg-[#FFFFFF] shadow-[3px_3px_0px_0px_#18181B]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className={`w-6 h-6 ${q.completed ? 'text-[#10B981]' : 'text-[#D4D4D8]'}`} />
                    <div>
                      <h5 className="font-extrabold text-sm text-[#18181B]">{q.title}</h5>
                      <span className="text-xs font-bold text-[#71717A]">Target: {q.target} sesi</span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-[#FFE600] text-[#18181B] font-black text-xs border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">
                    +{q.xp} XP
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Level XP Progress Bar */}
            <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2.5 border-[#18181B] space-y-2">
              <div className="flex items-center justify-between text-xs font-black text-[#18181B]">
                <span>Progres Menuju Level {nextRank ? nextRank.level : 'MAX'}:</span>
                <span>{progressPercent}% ({xpToNext} XP lagi)</span>
              </div>
              <div className="w-full bg-[#E4E4E7] h-3.5 rounded-full overflow-hidden border-2 border-[#18181B]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-[#FF5E8E] h-full rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Shortcuts */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#18181B] px-1">Akses Cepat Modul Pembelajaran</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { tab: 'grammar', title: 'Grammar', icon: BookOpen, bg: 'bg-[#A855F7]' },
                { tab: 'listening', title: 'Listening', icon: Headphones, bg: 'bg-[#4EED89]' },
                { tab: 'flashcards', title: 'Flashcards', icon: Layers, bg: 'bg-[#FF5E8E]' },
                { tab: 'speaking', title: 'Speaking', icon: Mic, bg: 'bg-[#38BDF8]' },
                { tab: 'exams', title: 'Mock Exam', icon: FileCheck, bg: 'bg-[#F97316]' },
                { tab: 'roleplay', title: 'AI Buddy', icon: MessageSquare, bg: 'bg-[#34D399]' },
              ].map((m, idx) => {
                const Icon = m.icon;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ y: -4, scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      sfx.playClick();
                      setActiveTab(m.tab);
                    }}
                    className="p-4 rounded-2xl bg-[#FFFFFF] border-2.5 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] text-left transition-all"
                  >
                    <div className={`w-9 h-9 rounded-xl ${m.bg} border-2 border-[#18181B] flex items-center justify-center mb-2 shadow-[2px_2px_0px_0px_#18181B]`}>
                      <Icon className="w-5 h-5 text-[#18181B]" />
                    </div>
                    <h5 className="font-black text-sm text-[#18181B]">{m.title}</h5>
                    <span className="text-[10px] font-bold text-[#71717A]">Buka Modul ➔</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right: Badges & Trophy Cabinet */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div 
            variants={itemVariants}
            className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="neo-badge bg-[#FFE600] text-[#18181B] px-2.5 py-1 inline-block mb-1">
                  PRESTASI
                </span>
                <h3 className="text-2xl font-black text-[#18181B]">Lemari Lencana & Piala</h3>
              </div>
              <Trophy className="w-7 h-7 text-[#F59E0B]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {userData.achievements.map((ach) => (
                <motion.div 
                  key={ach.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-2xl border-2.5 border-[#18181B] flex items-start space-x-3 transition-all ${
                    ach.unlocked 
                      ? 'bg-[#FEF3C7] shadow-[3px_3px_0px_0px_#18181B]' 
                      : 'bg-[#F4F4F5] shadow-[2px_2px_0px_0px_#18181B] opacity-70'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border-2 border-[#18181B] flex items-center justify-center text-xl shrink-0 shadow-[2px_2px_0px_0px_#18181B]">
                    {ach.icon}
                  </div>
                  <div>
                    <h5 className="font-black text-xs text-[#18181B]">{ach.title}</h5>
                    <p className="text-[11px] font-semibold text-[#71717A] mt-0.5 line-clamp-2">{ach.desc}</p>
                    <span className="text-[10px] font-black text-[#F59E0B] mt-1 inline-block">+{ach.xpReward} XP</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>

    </motion.div>
  );
}

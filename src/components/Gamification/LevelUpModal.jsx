import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, X, Trophy } from 'lucide-react';
import { sfx } from '../../services/soundEffects';

export default function LevelUpModal({ rank, onClose }) {
  useEffect(() => {
    sfx.playLevelUp();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#18181B]/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-[#FFFFFF] border-4 border-[#18181B] shadow-[10px_10px_0px_0px_#18181B] text-center animate-float">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#F4F4F5] border-2 border-[#18181B] text-[#18181B] hover:bg-[#FFE600]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-24 h-24 mx-auto rounded-3xl bg-[#FFE600] border-3.5 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B] flex items-center justify-center text-5xl mb-4">
          {rank.badge}
        </div>

        <span className="neo-badge bg-[#FF5E8E] text-white px-3 py-1 inline-block mb-2">
          LEVEL UP ACHIEVED!
        </span>

        <h3 className="text-3xl font-black text-[#18181B] mb-2 font-['Outfit']">
          Level {rank.level}: {rank.title}
        </h3>

        <p className="text-sm font-bold text-[#52525B] mb-6">
          Luar biasa! Penguasaan Bahasa Inggris kamu semakin meningkat pesat. Terus pertahankan semangat belajar setiap hari!
        </p>

        <button
          onClick={onClose}
          className="w-full py-4 rounded-2xl bg-[#FFE600] text-[#18181B] font-black text-sm border-3 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] hover:bg-[#FFEA2E] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          Lanjutkan Petualangan ⚡
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Gamepad2, RotateCcw, Zap } from 'lucide-react';
import { sfx } from '../../services/soundEffects';

const SCRAMBLE_WORDS = [
  { word: 'ELEPHANT', hint: 'Seekor hewan darat berbelalai panjang', meaning: 'Gajah' },
  { word: 'BUTTERFLY', hint: 'Serangga bersayap indah yang bermetamorfosis', meaning: 'Kupu-kupu' },
  { word: 'COURAGEOUS', hint: 'Sifat berani menghadapi bahaya atau rintangan', meaning: 'Pemberani' },
  { word: 'UBIQUITOUS', hint: 'Sesuatu yang ada di mana-mana pada waktu bersamaan', meaning: 'Serba hadir' },
  { word: 'PERSEVERANCE', hint: 'Kegigihan tanpa henti untuk meraih tujuan', meaning: 'Ketekunan' },
];

export default function GamesModule({ onEarnXP }) {
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [userLetters, setUserLetters] = useState([]);
  const [scrambledPool, setScrambledPool] = useState([]);
  const [gameScore, setGameScore] = useState(0);
  const [isWordCorrect, setIsWordCorrect] = useState(null);

  const currentScramble = SCRAMBLE_WORDS[scrambleIndex] || SCRAMBLE_WORDS[0];

  useEffect(() => {
    initScrambleWord(currentScramble.word);
  }, [scrambleIndex]);

  const initScrambleWord = (word) => {
    const letters = word.split('');
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setScrambledPool(shuffled);
    setUserLetters([]);
    setIsWordCorrect(null);
  };

  const handlePickLetter = (letter, pIdx) => {
    sfx.playClick();
    const newUserLetters = [...userLetters, letter];
    setUserLetters(newUserLetters);

    const newPool = [...scrambledPool];
    newPool.splice(pIdx, 1);
    setScrambledPool(newPool);

    if (newUserLetters.length === currentScramble.word.length) {
      const guessed = newUserLetters.join('');
      if (guessed === currentScramble.word) {
        setIsWordCorrect(true);
        sfx.playCorrect();
        setGameScore(prev => prev + 50);
        onEarnXP(25);

        setTimeout(() => {
          if (scrambleIndex + 1 < SCRAMBLE_WORDS.length) {
            setScrambleIndex(prev => prev + 1);
          } else {
            setScrambleIndex(0);
          }
        }, 1200);
      } else {
        setIsWordCorrect(false);
        sfx.playIncorrect();
      }
    }
  };

  const handleResetCurrentWord = () => {
    sfx.playClick();
    initScrambleWord(currentScramble.word);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#E879F9] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-[#18181B]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              VOCABULARY ARCADE • WORD SCRAMBLE
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Asah Kecepatan Mengingat Kosakata
            </h1>
            <p className="text-sm font-bold text-[#18181B]/80 mt-1 max-w-2xl">
              Mainkan tebak susun huruf acak (*Word Scramble*) untuk melatih memori ejaan dan kecepatan reflek bahasa Inggrismu.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-[#FFE600] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B]">
            <Zap className="w-5 h-5 text-[#18181B] fill-current" />
            <span className="font-black text-sm text-[#18181B]">Skor: {gameScore} Poin</span>
          </div>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="max-w-2xl mx-auto">
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-center space-y-6">
          
          <div className="flex items-center justify-between">
            <span className="neo-badge bg-[#E879F9] text-[#18181B] px-3 py-1">
              KATA {scrambleIndex + 1} DARI {SCRAMBLE_WORDS.length}
            </span>
            <button
              onClick={handleResetCurrentWord}
              className="flex items-center space-x-1 text-xs font-black text-[#71717A] hover:text-[#18181B]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Kocok Ulang Huruf</span>
            </button>
          </div>

          {/* Hint */}
          <div className="p-5 rounded-2xl bg-[#FFFBEB] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B]">
            <span className="text-[10px] font-black text-[#B45309] uppercase block mb-1">Petunjuk Kata:</span>
            <p className="text-base font-black text-[#18181B]">"{currentScramble.hint}"</p>
            <span className="text-xs font-black text-[#A855F7] mt-1 inline-block">Artinya: {currentScramble.meaning}</span>
          </div>

          {/* Spelled Slots */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 min-h-[64px] p-4 rounded-2xl bg-[#F8FAFC] border-2.5 border-[#18181B] shadow-inner">
            {userLetters.map((l, lIdx) => (
              <span
                key={lIdx}
                className="w-12 h-12 rounded-2xl bg-[#FFE600] text-[#18181B] font-black text-2xl flex items-center justify-center border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] animate-float"
              >
                {l}
              </span>
            ))}
            {userLetters.length === 0 && (
              <span className="text-xs font-bold text-[#A1A1AA] italic">Pilih huruf di bawah untuk menyusun kata</span>
            )}
          </div>

          {/* Scrambled Pool */}
          <div className="flex items-center justify-center flex-wrap gap-3">
            {scrambledPool.map((letter, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handlePickLetter(letter, pIdx)}
                className="w-13 h-13 p-3 rounded-2xl bg-[#FFFFFF] border-2.5 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] text-[#18181B] font-black text-2xl hover:bg-[#E879F9] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#18181B] transition-all"
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Status Alert */}
          {isWordCorrect === true && (
            <div className="p-4 rounded-2xl bg-[#ECFDF5] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] text-[#065F46] text-sm font-black animate-pulse">
              🎉 Benar Sekali! Kata: {currentScramble.word} (+50 Poin / +25 XP)
            </div>
          )}

          {isWordCorrect === false && (
            <div className="p-4 rounded-2xl bg-[#FEF2F2] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] text-[#DC2626] text-sm font-black">
              ❌ Belum tepat. Klik "Kocok Ulang Huruf" dan coba lagi!
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

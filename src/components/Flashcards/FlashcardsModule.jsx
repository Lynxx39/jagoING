import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  Volume2, 
  Sparkles, 
  BrainCircuit
} from 'lucide-react';
import { FLASHCARD_DECKS } from '../../data/flashcardsData';
import { calculateSM2 } from '../../services/srsEngine';
import { speechService } from '../../services/speechService';
import { sfx } from '../../services/soundEffects';

export default function FlashcardsModule({ userData, setUserData, onEarnXP, onCompleteQuest }) {
  const [activeDeckId, setActiveDeckId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const filteredDecks = FLASHCARD_DECKS.filter(d => d.level === userData.selectedLevel);
  const currentDeck = FLASHCARD_DECKS.find(d => d.id === activeDeckId) || filteredDecks[0];

  const cards = currentDeck ? currentDeck.cards : [];
  const currentCard = cards[currentIndex] || cards[0];

  const handleFlip = () => {
    sfx.playFlip();
    setIsFlipped(prev => !prev);
  };

  const handleSpeak = (e, text) => {
    e.stopPropagation();
    sfx.playClick();
    speechService.speak(text, { lang: 'en-US' });
  };

  const handleRateCard = (quality) => {
    if (!currentCard) return;
    sfx.playClick();

    // Feed the stored SM-2 state (not the static deck entry) back into the algorithm.
    const srsState = userData.srsCards?.[currentCard.id] || { repetitions: 0, interval: 1, easeFactor: 2.5 };
    const updatedCard = calculateSM2(quality, srsState);
    
    setUserData(prev => ({
      ...prev,
      srsCards: {
        ...(prev.srsCards || {}),
        [currentCard.id]: updatedCard
      }
    }));

    if (quality >= 3) {
      sfx.playCorrect();
      onEarnXP(15);
      onCompleteQuest('q_vocab');
    } else {
      sfx.playIncorrect();
    }

    setIsFlipped(false);
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#FF5E8E] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              SMART FLASHCARD SRS • SUPERMEMO SM-2
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Hafalkan Kosakata ke Long-Term Memory
            </h1>
            <p className="text-sm font-bold text-white/90 mt-1 max-w-2xl">
              Algoritma SM-2 menghitung interval pengulangan otomatis saat ingatanmu mulai memudar, membuat hafalan bertahan selamanya.
            </p>
          </div>
          <span className="px-4 py-2 rounded-2xl bg-[#FFE600] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] shrink-0">
            Deck {userData.selectedLevel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Decks Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] px-1">Daftar Deck {userData.selectedLevel}</h3>
          {filteredDecks.map(deck => {
            const isSelected = currentDeck && currentDeck.id === deck.id;
            return (
              <button
                key={deck.id}
                onClick={() => {
                  sfx.playClick();
                  setActiveDeckId(deck.id);
                  setCurrentIndex(0);
                  setIsFlipped(false);
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all border-2.5 border-[#18181B] ${
                  isSelected
                    ? 'bg-[#FFE600] text-[#18181B] shadow-[5px_5px_0px_0px_#18181B] -translate-y-1'
                    : 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] shadow-[3px_3px_0px_0px_#18181B]'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#FF5E8E] text-white border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#18181B]">{deck.name}</h4>
                    <p className="text-xs font-bold text-[#71717A] line-clamp-1 mt-0.5">{deck.description}</p>
                    <span className="text-[11px] font-black text-[#FF5E8E] mt-1 inline-block">
                      {deck.cards.length} Kosakata SRS
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: 3D Flashcard */}
        {currentCard && (
          <div className="lg:col-span-8 flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-black text-[#18181B]">
                KARTU {currentIndex + 1} DARI {cards.length}
              </span>
              <span className="neo-badge bg-[#38BDF8] text-[#18181B] px-2.5 py-1">
                SM-2 Ease: {userData.srsCards?.[currentCard.id]?.easeFactor || 2.5}x
              </span>
            </div>

            {/* 3D Flip Card */}
            <div 
              onClick={handleFlip}
              className="w-full max-w-xl h-80 cursor-pointer perspective-1000 select-none"
            >
              <div className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* FRONT */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-8 bg-[#FFFFFF] border-4 border-[#18181B] shadow-[8px_8px_0px_0px_#18181B] flex flex-col justify-between backface-hidden">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-xl bg-[#FFE600] text-[#18181B] font-mono text-xs uppercase font-black border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">
                      {currentCard.pos}
                    </span>
                    <button
                      onClick={(e) => handleSpeak(e, currentCard.word)}
                      className="p-3 rounded-2xl bg-[#FF5E8E] text-white hover:bg-[#FF477E] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                      title="Dengarkan Pelafalan Audio"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-center my-auto">
                    <h2 className="text-4xl sm:text-5xl font-black text-[#18181B] font-['Outfit'] mb-2">
                      {currentCard.word}
                    </h2>
                    <span className="text-sm font-mono font-bold text-[#71717A] bg-[#F4F4F5] px-4 py-1.5 rounded-full border-2 border-[#18181B] inline-block shadow-[2px_2px_0px_0px_#18181B]">
                      {currentCard.ipa}
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-1.5 text-[#71717A] text-xs font-black">
                    <RotateCw className="w-4 h-4 text-[#18181B]" />
                    <span>Klik kartu untuk membalik & melihat arti</span>
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-8 bg-[#FFE600] border-4 border-[#18181B] shadow-[8px_8px_0px_0px_#18181B] flex flex-col justify-between backface-hidden rotate-y-180">
                  <div className="flex items-center justify-between">
                    <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-2.5 py-1">
                      ARTI & CONTOH
                    </span>
                    <button
                      onClick={(e) => handleSpeak(e, currentCard.example)}
                      className="p-2.5 rounded-xl bg-[#FFFFFF] text-[#18181B] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="my-auto space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#18181B]">
                      {currentCard.meaning}
                    </h3>
                    <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] text-left">
                      <p className="text-xs font-black text-[#18181B] mb-0.5">"{currentCard.example}"</p>
                      <p className="text-[11px] font-bold text-[#71717A] italic">"{currentCard.exampleId}"</p>
                    </div>
                  </div>

                  <div className="text-center text-xs font-black text-[#18181B]">
                    Beri nilai ingatanmu di bawah untuk algoritma Spaced Repetition
                  </div>
                </div>

              </div>
            </div>

            {/* Rating Buttons */}
            {isFlipped && (
              <div className="w-full max-w-xl mt-6 p-4 rounded-2xl bg-[#FFFFFF] border-3 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B] grid grid-cols-4 gap-2.5">
                <button
                  onClick={() => handleRateCard(0)}
                  className="p-3 rounded-xl bg-[#FF5E8E] text-white border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 text-center"
                >
                  <span className="block text-xs font-black">Again (0)</span>
                  <span className="text-[10px] font-bold text-white/90">Ulang Segera</span>
                </button>
                <button
                  onClick={() => handleRateCard(3)}
                  className="p-3 rounded-xl bg-[#F59E0B] text-white border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 text-center"
                >
                  <span className="block text-xs font-black">Hard (3)</span>
                  <span className="text-[10px] font-bold text-white/90">1 Hari</span>
                </button>
                <button
                  onClick={() => handleRateCard(4)}
                  className="p-3 rounded-xl bg-[#38BDF8] text-[#18181B] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 text-center"
                >
                  <span className="block text-xs font-black">Good (4)</span>
                  <span className="text-[10px] font-bold text-[#18181B]/80">3-6 Hari</span>
                </button>
                <button
                  onClick={() => handleRateCard(5)}
                  className="p-3 rounded-xl bg-[#4EED89] text-[#18181B] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 text-center"
                >
                  <span className="block text-xs font-black">Easy (5)</span>
                  <span className="text-[10px] font-bold text-[#18181B]/80">10+ Hari</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

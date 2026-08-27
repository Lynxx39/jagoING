import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, Sparkles, RotateCcw, Award } from 'lucide-react';
import { GRAMMAR_DATA } from '../../data/grammarData';
import { sfx } from '../../services/soundEffects';

export default function GrammarModule({ userData, onEarnXP, onCompleteQuest }) {
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [drillAnswers, setDrillAnswers] = useState({});
  const [drillFeedback, setDrillFeedback] = useState({});
  const [scramblePicks, setScramblePicks] = useState({});

  const filteredTopics = GRAMMAR_DATA.filter(t => t.level === userData.selectedLevel);
  const currentTopic = GRAMMAR_DATA.find(t => t.id === selectedTopicId) || filteredTopics[0];

  const handleSelectOption = (drillId, option, correctAnswer) => {
    setDrillAnswers(prev => ({ ...prev, [drillId]: option }));
    const isCorrect = option === correctAnswer;
    setDrillFeedback(prev => ({ ...prev, [drillId]: isCorrect }));

    if (isCorrect) {
      sfx.playCorrect();
      onEarnXP(20);
      onCompleteQuest('q_grammar');
    } else {
      sfx.playIncorrect();
    }
  };

  const handleScrambleClick = (drillId, word, correctOrder) => {
    const current = scramblePicks[drillId] || [];
    if (current.includes(word)) {
      setScramblePicks(prev => ({ ...prev, [drillId]: current.filter(w => w !== word) }));
    } else {
      const next = [...current, word];
      setScramblePicks(prev => ({ ...prev, [drillId]: next }));

      if (next.length === correctOrder.length) {
        const isCorrect = JSON.stringify(next) === JSON.stringify(correctOrder);
        setDrillFeedback(prev => ({ ...prev, [drillId]: isCorrect }));
        if (isCorrect) {
          sfx.playCorrect();
          onEarnXP(25);
          onCompleteQuest('q_grammar');
        } else {
          sfx.playIncorrect();
        }
      }
    }
  };

  const handleResetScramble = (drillId) => {
    sfx.playClick();
    setScramblePicks(prev => ({ ...prev, [drillId]: [] }));
    setDrillFeedback(prev => ({ ...prev, [drillId]: undefined }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#A855F7] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider mb-1">
              <span className="px-3 py-1 rounded-xl bg-[#FFFFFF] text-[#18181B] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">
                MODUL GRAMMAR MASTER • JENJANG {userData.selectedLevel}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit'] mt-2">
              Kuasai Rumus & Tata Bahasa Inggris Secara Visual
            </h1>
            <p className="text-sm font-bold text-white/90 mt-1 max-w-2xl">
              Pelajari tata bahasa tanpa rumus membingungkan. Dilengkapi formula berwarna (*Color Tokens*) dan latihan interaktif langsung.
            </p>
          </div>
          <span className="px-4 py-2 rounded-2xl bg-[#FFE600] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] shrink-0">
            {filteredTopics.length} Topik {userData.selectedLevel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Topics Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] px-1">Daftar Materi {userData.selectedLevel}</h3>
          {filteredTopics.map((topic) => {
            const isSelected = currentTopic && currentTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  sfx.playClick();
                  setSelectedTopicId(topic.id);
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all border-2.5 border-[#18181B] ${
                  isSelected
                    ? 'bg-[#FFE600] text-[#18181B] shadow-[5px_5px_0px_0px_#18181B] -translate-y-1'
                    : 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] shadow-[3px_3px_0px_0px_#18181B]'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl p-2 rounded-xl bg-[#FFFFFF] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">{topic.icon}</span>
                  <div>
                    <span className="text-[10px] font-black text-[#A855F7] uppercase">{topic.category}</span>
                    <h4 className="font-black text-sm text-[#18181B]">{topic.title}</h4>
                    <p className="text-xs font-semibold text-[#71717A] line-clamp-1 mt-0.5">{topic.summary}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Lesson & Drills */}
        {currentTopic && (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Topic Details Card */}
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-6">
              <div>
                <span className="neo-badge bg-[#38BDF8] text-[#18181B] px-2.5 py-1 inline-block mb-2">
                  {currentTopic.level} • {currentTopic.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#18181B]">{currentTopic.title}</h2>
                <p className="text-sm font-semibold text-[#52525B] mt-1">{currentTopic.summary}</p>
              </div>

              {/* Color Formula Chips */}
              <div>
                <h4 className="text-xs font-black text-[#18181B] uppercase tracking-wider mb-2">Color Formula Tokens:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentTopic.colorFormula.map((item, idx) => (
                    <div key={idx} className="px-3.5 py-1.5 rounded-xl border-2 border-[#18181B] bg-[#FFFBEB] shadow-[2px_2px_0px_0px_#18181B] text-xs font-black text-[#18181B]">
                      {item.part}
                    </div>
                  ))}
                </div>
              </div>

              {/* Formula Syntax Box */}
              <div className="p-4 rounded-2xl bg-[#F4F4F5] border-2.5 border-[#18181B] space-y-1.5 font-mono text-xs text-[#18181B]">
                {Object.entries(currentTopic.formula).map(([key, val]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center">
                    <span className="font-black uppercase w-32 text-[#A855F7]">{key}:</span>
                    <span className="font-bold text-[#18181B]">{val}</span>
                  </div>
                ))}
              </div>

              {/* Rules List */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-[#18181B] uppercase tracking-wider">Aturan Utama:</h4>
                <ul className="space-y-1.5">
                  {currentTopic.rules.map((rule, idx) => (
                    <li key={idx} className="text-xs font-bold text-[#3F3F46] flex items-start space-x-2">
                      <span className="text-[#A855F7] font-black">•</span>
                      <span dangerouslySetInnerHTML={{ __html: rule }} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example Sentences */}
              <div>
                <h4 className="text-xs font-black text-[#18181B] uppercase tracking-wider mb-2">Contoh Kalimat:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentTopic.examples.map((ex, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#FEF3C7] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">
                      <p className="text-xs font-black text-[#18181B] mb-1">{ex.en}</p>
                      <p className="text-[11px] font-bold text-[#71717A]">{ex.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drills Section */}
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="neo-badge bg-[#FFE600] text-[#18181B] px-2.5 py-1 inline-block mb-1">
                    LATIHAN CEPAT
                  </span>
                  <h3 className="text-xl font-black text-[#18181B]">Uji Pemahaman Grammar</h3>
                </div>
              </div>

              <div className="space-y-6">
                {currentTopic.drills.map((drill, idx) => {
                  const status = drillFeedback[drill.id];
                  return (
                    <div key={drill.id} className="p-5 rounded-2xl bg-[#F8FAFC] border-2.5 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-[#A855F7] uppercase">Soal #{idx + 1} ({drill.type.replace('_', ' ')})</span>
                        {status === true && (
                          <span className="px-2.5 py-1 rounded-xl bg-[#4EED89] text-[#18181B] border-2 border-[#18181B] font-black text-xs shadow-[2px_2px_0px_0px_#18181B]">
                            ✓ TEPAT (+20 XP)
                          </span>
                        )}
                        {status === false && (
                          <span className="px-2.5 py-1 rounded-xl bg-[#FF5E8E] text-white border-2 border-[#18181B] font-black text-xs shadow-[2px_2px_0px_0px_#18181B]">
                            ✗ KURANG TEPAT
                          </span>
                        )}
                      </div>

                      {drill.type === 'multiple_choice' && (
                        <div>
                          <p className="text-sm font-black text-[#18181B] mb-4">{drill.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {drill.options.map((opt) => {
                              const isPicked = drillAnswers[drill.id] === opt;
                              const isCorrectOpt = opt === drill.answer;
                              let btnStyle = 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#FFE600]';

                              if (status !== undefined) {
                                if (isCorrectOpt) {
                                  btnStyle = 'bg-[#4EED89] text-[#18181B] font-black';
                                } else if (isPicked && !isCorrectOpt) {
                                  btnStyle = 'bg-[#FF5E8E] text-white font-bold';
                                }
                              }

                              return (
                                <button
                                  key={opt}
                                  onClick={() => handleSelectOption(drill.id, opt, drill.answer)}
                                  className={`p-3.5 rounded-xl border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] text-xs font-bold text-left transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${btnStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {drill.type === 'scramble' && (
                        <div>
                          <p className="text-sm font-black text-[#18181B] mb-2">{drill.question}</p>
                          <div className="min-h-[48px] p-2.5 mb-3 rounded-xl bg-[#FFFFFF] border-2.5 border-[#18181B] flex flex-wrap items-center gap-1.5 shadow-inner">
                            {(scramblePicks[drill.id] || []).map((w, wIdx) => (
                              <span
                                key={wIdx}
                                onClick={() => handleScrambleClick(drill.id, w, drill.correctOrder)}
                                className="px-3 py-1 rounded-lg bg-[#A855F7] text-white font-black text-xs border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] cursor-pointer hover:bg-[#FF5E8E] transition-colors"
                              >
                                {w}
                              </span>
                            ))}
                            {(!scramblePicks[drill.id] || scramblePicks[drill.id].length === 0) && (
                              <span className="text-xs font-bold text-[#A1A1AA] italic">Klik kata di bawah untuk menyusun kalimat...</span>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {drill.words.map((w, wIdx) => {
                              const isPicked = (scramblePicks[drill.id] || []).includes(w);
                              return (
                                <button
                                  key={wIdx}
                                  disabled={isPicked}
                                  onClick={() => handleScrambleClick(drill.id, w, drill.correctOrder)}
                                  className={`px-3 py-1.5 rounded-xl border-2 border-[#18181B] text-xs font-black transition-all ${
                                    isPicked
                                      ? 'opacity-30 bg-[#E4E4E7] text-[#71717A] shadow-none'
                                      : 'bg-[#FFFFFF] text-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-[#FFE600]'
                                  }`}
                                >
                                  {w}
                                </button>
                              );
                            })}
                          </div>

                          <button
                            onClick={() => handleResetScramble(drill.id)}
                            className="flex items-center space-x-1 text-xs font-bold text-[#71717A] hover:text-[#18181B]"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reset Susunan</span>
                          </button>
                        </div>
                      )}

                      {drill.type === 'error_spotting' && (
                        <div>
                          <p className="text-xs font-bold text-[#71717A] mb-1">Temukan kesalahan:</p>
                          <div className="p-3 rounded-xl bg-[#FFFFFF] border-2 border-[#18181B] text-sm font-black text-[#18181B] mb-3">
                            "{drill.sentence}"
                          </div>
                          <button
                            onClick={() => {
                              setDrillFeedback(prev => ({ ...prev, [drill.id]: true }));
                              sfx.playCorrect();
                              onEarnXP(20);
                            }}
                            className="px-4 py-2 rounded-xl bg-[#FFE600] text-[#18181B] border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] text-xs font-black hover:bg-[#FFD000]"
                          >
                            Lihat Jawaban & Solusi 💡
                          </button>
                        </div>
                      )}

                      {status !== undefined && (
                        <div className="mt-4 p-3.5 rounded-xl bg-[#FEF3C7] border-2 border-[#18181B] text-xs font-bold text-[#18181B]">
                          <span className="font-black text-[#B45309]">💡 Pembahasan: </span>
                          {drill.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

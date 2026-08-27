import React, { useState } from 'react';
import { 
  Headphones, 
  Play, 
  Pause, 
  Volume2, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff, 
  Sparkles,
  Send
} from 'lucide-react';
import { LISTENING_DATA } from '../../data/listeningData';
import { speechService } from '../../services/speechService';
import { sfx } from '../../services/soundEffects';

export default function ListeningModule({ userData, onEarnXP, onCompleteQuest }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [dictationInput, setDictationInput] = useState('');
  const [dictationChecked, setDictationChecked] = useState(false);
  const [dictationScore, setDictationScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFeedback, setQuizFeedback] = useState({});

  const filteredItems = LISTENING_DATA.filter(item => item.level === userData.selectedLevel);
  const currentItem = LISTENING_DATA.find(item => item.id === selectedId) || filteredItems[0];

  const handlePlayAudio = (textToSpeak) => {
    const text = textToSpeak || currentItem.audioText;
    setIsPlaying(true);
    sfx.playClick();

    speechService.speak(text, {
      rate: playbackRate,
      lang: currentItem.accent || 'en-US',
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const handleStopAudio = () => {
    speechService.stop();
    setIsPlaying(false);
    sfx.playClick();
  };

  const handleRateChange = (rate) => {
    sfx.playClick();
    setPlaybackRate(rate);
    if (isPlaying) {
      handlePlayAudio();
    }
  };

  const handleCheckDictation = () => {
    sfx.playClick();
    const target = currentItem.dictationExercise.targetSentence.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").trim();
    const user = dictationInput.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").trim();

    const isMatch = user === target;
    setDictationChecked(true);

    if (isMatch) {
      sfx.playCorrect();
      setDictationScore(100);
      onEarnXP(35);
      onCompleteQuest('q_listening');
    } else {
      const targetWords = target.split(' ');
      const userWords = user.split(' ');
      const matched = userWords.filter(w => targetWords.includes(w)).length;
      const sim = Math.round((matched / Math.max(targetWords.length, 1)) * 100);
      setDictationScore(sim);
      if (sim > 70) {
        sfx.playCorrect();
        onEarnXP(20);
        onCompleteQuest('q_listening');
      } else {
        sfx.playIncorrect();
      }
    }
  };

  const handleQuizSelect = (qId, option, correctAnswer) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: option }));
    const isCorrect = option === correctAnswer;
    setQuizFeedback(prev => ({ ...prev, [qId]: isCorrect }));

    if (isCorrect) {
      sfx.playCorrect();
      onEarnXP(20);
      onCompleteQuest('q_listening');
    } else {
      sfx.playIncorrect();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#4EED89] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-[#18181B]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              LISTENING LAB • JENJANG {userData.selectedLevel}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Latih Pendengaran & Pemahaman Aksen Asli
            </h1>
            <p className="text-sm font-bold text-[#18181B]/80 mt-1 max-w-2xl">
              Dengarkan dialog rekaman audio jernih, atur tempo kecepatan, lalu uji akurasi dikte dan pemahamanmu.
            </p>
          </div>
          <span className="px-4 py-2 rounded-2xl bg-[#FFE600] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] shrink-0">
            {filteredItems.length} Audio {userData.selectedLevel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Audio Playlist */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] px-1">Daftar Audio {userData.selectedLevel}</h3>
          {filteredItems.map(item => {
            const isSelected = currentItem && currentItem.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  speechService.stop();
                  setIsPlaying(false);
                  sfx.playClick();
                  setSelectedId(item.id);
                  setDictationInput('');
                  setDictationChecked(false);
                  setShowTranscript(false);
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all border-2.5 border-[#18181B] ${
                  isSelected
                    ? 'bg-[#FFE600] text-[#18181B] shadow-[5px_5px_0px_0px_#18181B] -translate-y-1'
                    : 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] shadow-[3px_3px_0px_0px_#18181B]'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-[#4EED89] border-2 border-[#18181B] text-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-[#10B981] uppercase">{item.speaker} • {item.accent}</span>
                    <h4 className="font-black text-sm text-[#18181B]">{item.title}</h4>
                    <span className="text-xs font-bold text-[#71717A] mt-0.5 inline-block">Durasi: ~{item.duration}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Audio Player & Exercises */}
        {currentItem && (
          <div className="lg:col-span-8 space-y-6">
            
            {/* Audio Controller Card */}
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="neo-badge bg-[#38BDF8] text-[#18181B] px-2.5 py-1 inline-block mb-1">
                    {currentItem.speaker} ({currentItem.accent})
                  </span>
                  <h2 className="text-2xl font-black text-[#18181B]">{currentItem.title}</h2>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center space-x-1.5 bg-[#F4F4F5] p-1.5 rounded-2xl border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">
                  {[0.75, 1.0, 1.25].map(rate => (
                    <button
                      key={rate}
                      onClick={() => handleRateChange(rate)}
                      className={`px-3 py-1 text-xs font-black rounded-xl transition-all ${
                        playbackRate === rate
                          ? 'bg-[#FFE600] text-[#18181B] border-2 border-[#18181B] shadow-[1px_1px_0px_0px_#18181B]'
                          : 'text-[#71717A] hover:text-[#18181B]'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={isPlaying ? handleStopAudio : () => handlePlayAudio()}
                  className={`flex items-center space-x-2 px-7 py-3.5 rounded-2xl font-black text-sm border-2.5 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
                    isPlaying
                      ? 'bg-[#FF5E8E] text-white'
                      : 'bg-[#4EED89] text-[#18181B] hover:bg-[#38E478]'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  <span>{isPlaying ? 'Hentikan Audio' : 'Putar Rekaman Audio 🔊'}</span>
                </button>

                <button
                  onClick={() => setShowTranscript(prev => !prev)}
                  className="flex items-center space-x-1.5 px-5 py-3.5 rounded-2xl bg-[#FFFFFF] border-2.5 border-[#18181B] text-xs font-black shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#F4F4F5]"
                >
                  {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span>{showTranscript ? 'Sembunyikan Transkrip' : 'Lihat Transkrip & Arti'}</span>
                </button>
              </div>

              {/* Transcript Reveal */}
              {showTranscript && (
                <div className="p-5 rounded-2xl bg-[#FFFBEB] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] space-y-3">
                  <div>
                    <h5 className="text-[11px] font-black uppercase text-[#D97706] tracking-wider">English Transcript:</h5>
                    <p className="text-sm font-bold text-[#18181B] whitespace-pre-line mt-1">{currentItem.transcript}</p>
                  </div>
                  <div className="pt-2 border-t-2 border-[#18181B]/20">
                    <h5 className="text-[11px] font-black uppercase text-[#71717A] tracking-wider">Terjemahan Bahasa Indonesia:</h5>
                    <p className="text-xs font-bold text-[#52525B] whitespace-pre-line mt-1">{currentItem.translation}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Dictation Challenge */}
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-4">
              <div>
                <span className="neo-badge bg-[#FFE600] text-[#18181B] px-2.5 py-1 inline-block mb-1">
                  TANTANGAN DIKTE
                </span>
                <h3 className="text-xl font-black text-[#18181B]">Ketik Kalimat yang Kamu Dengar</h3>
                <p className="text-xs font-bold text-[#71717A] mt-0.5">{currentItem.dictationExercise.prompt}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handlePlayAudio(currentItem.dictationExercise.audioClip)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#FFFBEB] text-[#18181B] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] text-xs font-black hover:bg-[#FFE600]"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Dengar Potongan Kalimat 🔉</span>
                </button>
              </div>

              <textarea
                value={dictationInput}
                onChange={(e) => setDictationInput(e.target.value)}
                placeholder="Ketik persis kalimat bahasa Inggris yang kamu dengar di sini..."
                rows={2}
                className="w-full p-4 rounded-2xl bg-[#F8FAFC] border-2.5 border-[#18181B] shadow-inner text-sm font-bold text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:bg-[#FFFFFF]"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={handleCheckDictation}
                  disabled={!dictationInput.trim()}
                  className="flex items-center space-x-1.5 px-6 py-3 rounded-2xl bg-[#FFE600] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#FFEA2E] disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                  <span>Cek Jawaban Dikte</span>
                </button>

                {dictationChecked && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-[#71717A]">Akurasi:</span>
                    <span className={`text-base font-black px-3 py-1 rounded-xl border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] ${dictationScore >= 80 ? 'bg-[#4EED89] text-[#18181B]' : 'bg-[#FFE600] text-[#18181B]'}`}>
                      {dictationScore}%
                    </span>
                  </div>
                )}
              </div>

              {dictationChecked && (
                <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border-2 border-[#18181B] text-xs font-bold text-[#18181B]">
                  <span className="text-[#059669]">Kunci Kalimat yang Benar: </span>
                  <span className="font-black">"{currentItem.dictationExercise.targetSentence}"</span>
                </div>
              )}
            </div>

            {/* Comprehension Quiz */}
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-5">
              <h3 className="text-xl font-black text-[#18181B]">📝 Kuis Pemahaman Rekaman</h3>

              <div className="space-y-6">
                {currentItem.questions.map((q, idx) => {
                  const status = quizFeedback[q.id];
                  return (
                    <div key={q.id} className="p-5 rounded-2xl bg-[#F8FAFC] border-2.5 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B]">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black text-[#10B981] uppercase">Pertanyaan #{idx + 1}</span>
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

                      <p className="text-sm font-black text-[#18181B] mb-3">{q.question}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {q.options.map((opt) => {
                          const isPicked = quizAnswers[q.id] === opt;
                          const isCorrectOpt = opt === q.answer;
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
                              onClick={() => handleQuizSelect(q.id, opt, q.answer)}
                              className={`p-3.5 rounded-xl border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] text-xs font-bold text-left transition-all ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {status !== undefined && (
                        <div className="mt-3.5 p-3.5 rounded-xl bg-[#ECFDF5] border-2 border-[#18181B] text-xs font-bold text-[#18181B]">
                          <span className="font-black text-[#059669]">💡 Alasan: </span>
                          {q.explanation}
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

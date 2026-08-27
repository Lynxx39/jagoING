import React, { useState } from 'react';
import { Mic, MicOff, Volume2, CheckCircle, RotateCcw, Sparkles } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { sfx } from '../../services/soundEffects';

const SPEAKING_DRILLS = [
  {
    id: 'spk_sd_1',
    level: 'SD',
    category: 'Daily Phonics',
    sentence: "The friendly dolphin is jumping high in the blue ocean.",
    ipa: "/ðə ˈfrɛndli ˈdɒlfɪn ɪz ˈdʒʌmpɪŋ haɪ ɪn ðə bluː ˈoʊʃən/",
    tips: "Fokus pada pelafalan huruf 'ph' pada dolphin seperti suara 'f'."
  },
  {
    id: 'spk_sd_2',
    level: 'SD',
    category: 'Breakfast Routine',
    sentence: "I enjoy eating delicious fresh pancakes with sweet honey.",
    ipa: "/aɪ ɪnˈdʒɔɪ ˈiːtɪŋ dɪˈlɪʃəs frɛʃ ˈpænkeɪks wɪð swiːt ˈhʌni/",
    tips: "Ucapkan akhiran 's' pada pancakes secara jelas."
  },
  {
    id: 'spk_smp_1',
    level: 'SMP',
    category: 'School Presentation',
    sentence: "We should collaborate actively to achieve outstanding results.",
    ipa: "/wiː ʃʊd kəˈlæbəreɪt ˈæktɪvli tuː əˈtʃiːv aʊtˈstændɪŋ rɪˈzʌlts/",
    tips: "Beri penekanan intonasi pada suku kata kedua kata 'collaborate' /kəˈlæbəreɪt/."
  },
  {
    id: 'spk_smp_2',
    level: 'SMP',
    category: 'Environmental Science',
    sentence: "Protecting natural wildlife habitats is essential for our planet.",
    ipa: "/prəˈtɛktɪŋ ˈnætʃrəl ˈwaɪldlaɪf ˈhæbɪtæts ɪz ɪˈsɛnʃəl fɔːr ˈaʊər ˈplænɪt/",
    tips: "Pastikan pengucapan 'essential' terdengar halus /ɪˈsɛnʃəl/."
  },
  {
    id: 'spk_sma_1',
    level: 'SMA',
    category: 'Academic Eloquence',
    sentence: "Technological innovation plays a pivotal role in mitigating climate change.",
    ipa: "/ˌtɛknəˈlɒdʒɪkəl ˌɪnəˈveɪʃən pleɪz ə ˈpɪvətl roʊl ɪn ˈmɪtɪɡeɪtɪŋ ˈklaɪmɪt tʃeɪndʒ/",
    tips: "Jaga ritme dan jeda artikulasi pada 'pivotal role' dan 'mitigating'."
  }
];

export default function SpeakingModule({ userData, onEarnXP, onCompleteQuest }) {
  const [selectedDrillId, setSelectedDrillId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState(null);
  const [wordResults, setWordResults] = useState([]);

  const filteredDrills = SPEAKING_DRILLS.filter(d => d.level === userData.selectedLevel);
  const currentDrill = SPEAKING_DRILLS.find(d => d.id === selectedDrillId) || filteredDrills[0];

  const handleListenModelAudio = () => {
    sfx.playClick();
    speechService.speak(currentDrill.sentence, { rate: 0.9, lang: 'en-US' });
  };

  const handleStartRecording = () => {
    sfx.playClick();
    setTranscript('');
    setScore(null);
    setWordResults([]);

    const started = speechService.startListening(
      (res) => {
        setTranscript(res.final || res.interim);
        if (res.isFinal) {
          evaluateSpeech(res.final);
          setIsRecording(false);
        }
      },
      (err) => {
        console.warn('Speech recognition error/timeout:', err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (started) {
      setIsRecording(true);
    } else {
      alert("Browser Anda memerlukan izin mikrofon atau tidak mendukung SpeechRecognition API. Silakan pastikan menggunakan Chrome/Edge.");
    }
  };

  const handleStopRecording = () => {
    speechService.stopListening();
    setIsRecording(false);
    if (transcript) {
      evaluateSpeech(transcript);
    }
  };

  const evaluateSpeech = (userSpeech) => {
    const targetWords = currentDrill.sentence.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(/\s+/);
    const spokenWords = userSpeech.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"").split(/\s+/);

    let matchCount = 0;
    const results = targetWords.map(tw => {
      const isMatched = spokenWords.includes(tw);
      if (isMatched) matchCount++;
      return { word: tw, matched: isMatched };
    });

    const calculatedScore = Math.round((matchCount / targetWords.length) * 100);
    setScore(calculatedScore);
    setWordResults(results);

    if (calculatedScore >= 70) {
      sfx.playCorrect();
      onEarnXP(30);
      onCompleteQuest('q_listening');
    } else {
      sfx.playIncorrect();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#38BDF8] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-[#18181B]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              SPEAKING COACH • VOICE RECOGNITION
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Latih Pelafalan & Kelancaran Bicara
            </h1>
            <p className="text-sm font-bold text-[#18181B]/80 mt-1 max-w-2xl">
              Dengarkan standar penutur asli, ucapkan kalimat melalui mikrofon, dan evaluasi akurasi kata demi kata seketika.
            </p>
          </div>
          <span className="px-4 py-2 rounded-2xl bg-[#FFE600] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] shrink-0">
            {filteredDrills.length} Kalimat {userData.selectedLevel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Drill Selector */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] px-1">Pilih Kalimat {userData.selectedLevel}</h3>
          {filteredDrills.map(drill => {
            const isSelected = currentDrill && currentDrill.id === drill.id;
            return (
              <button
                key={drill.id}
                onClick={() => {
                  sfx.playClick();
                  setSelectedDrillId(drill.id);
                  setTranscript('');
                  setScore(null);
                  setWordResults([]);
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all border-2.5 border-[#18181B] ${
                  isSelected
                    ? 'bg-[#FFE600] text-[#18181B] shadow-[5px_5px_0px_0px_#18181B] -translate-y-1'
                    : 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] shadow-[3px_3px_0px_0px_#18181B]'
                }`}
              >
                <span className="text-[10px] font-black text-[#0284C7] uppercase">{drill.category}</span>
                <p className="font-black text-sm text-[#18181B] line-clamp-2 mt-0.5">"{drill.sentence}"</p>
              </button>
            );
          })}
        </div>

        {/* Right: Studio Card */}
        {currentDrill && (
          <div className="lg:col-span-8 space-y-6">
            
            <div className="p-8 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] text-center space-y-4">
              <span className="neo-badge bg-[#38BDF8] text-[#18181B] px-3 py-1 inline-block">
                {currentDrill.category}
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#18181B] font-['Outfit'] leading-relaxed">
                "{currentDrill.sentence}"
              </h2>

              <p className="font-mono text-xs font-bold text-[#71717A] bg-[#F4F4F5] px-4 py-2 rounded-xl inline-block border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">
                {currentDrill.ipa}
              </p>

              <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#18181B] text-xs font-bold text-[#18181B] max-w-lg mx-auto">
                💡 <span className="font-black text-[#B45309]">Tips Pelafalan:</span> {currentDrill.tips}
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleListenModelAudio}
                  className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-[#FFFFFF] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#F4F4F5] font-black text-xs active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <Volume2 className="w-4 h-4 text-[#38BDF8]" />
                  <span>Dengarkan Native Speaker 🔉</span>
                </button>

                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`flex items-center space-x-2 px-8 py-3.5 rounded-2xl font-black text-sm border-3 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
                    isRecording
                      ? 'bg-[#FF5E8E] text-white animate-pulse'
                      : 'bg-[#FFE600] text-[#18181B] hover:bg-[#FFEA2E]'
                  }`}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  <span>{isRecording ? 'Sedang Merekam... (Klik Stop)' : 'Tekan & Ucapkan Sekarang 🎙️'}</span>
                </button>
              </div>
            </div>

            {/* Results Card */}
            {(transcript || score !== null) && (
              <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-[#71717A] uppercase tracking-wider">Hasil Pelafalan Suaramu:</h4>
                  {score !== null && (
                    <span className={`px-3 py-1 rounded-xl border-2 border-[#18181B] font-black text-xs shadow-[2px_2px_0px_0px_#18181B] ${score >= 70 ? 'bg-[#4EED89] text-[#18181B]' : 'bg-[#FFE600] text-[#18181B]'}`}>
                      Skor Akurasi: {score}% {score >= 70 ? '🎉 (+30 XP)' : '💪 Coba lagi'}
                    </span>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAFC] border-2 border-[#18181B] text-sm text-[#18181B]">
                  <span className="text-[#71717A] text-xs font-bold block mb-1">Suara terdeteksi:</span>
                  <p className="font-black italic">"{transcript || 'Mendengarkan ucapan...'}"</p>
                </div>

                {wordResults.length > 0 && (
                  <div>
                    <span className="text-xs font-black text-[#18181B] block mb-2">Evaluasi Kata per Kata:</span>
                    <div className="flex flex-wrap gap-2">
                      {wordResults.map((item, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] ${
                            item.matched
                              ? 'bg-[#4EED89] text-[#18181B]'
                              : 'bg-[#FF5E8E] text-white'
                          }`}
                        >
                          {item.word} {item.matched ? '✓' : '✗'}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

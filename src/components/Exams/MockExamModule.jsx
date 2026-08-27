import React, { useState, useEffect } from 'react';
import { 
  FileCheck, 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  XCircle, 
  Award, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { MOCK_EXAMS } from '../../data/mockExamsData';
import { sfx } from '../../services/soundEffects';

export default function MockExamModule({ userData, setUserData, onEarnXP, onCompleteQuest }) {
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0);
  const [examFinished, setExamFinished] = useState(false);
  const [scoreResult, setScoreResult] = useState(null);

  const filteredExams = MOCK_EXAMS.filter(e => e.level === userData.selectedLevel);
  const currentExam = MOCK_EXAMS.find(e => e.id === selectedExamId) || filteredExams[0];

  useEffect(() => {
    let timer;
    if (examStarted && !examFinished && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examFinished, timeLeftSeconds]);

  const handleStartExam = (exam) => {
    sfx.playClick();
    setSelectedExamId(exam.id);
    setExamStarted(true);
    setExamFinished(false);
    setCurrentQIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeftSeconds(exam.durationMinutes * 60);
    setScoreResult(null);
  };

  const handleSelectOption = (optionIndex) => {
    sfx.playClick();
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: optionIndex }));
  };

  const handleToggleFlag = (qIdx) => {
    sfx.playClick();
    setFlaggedQuestions(prev => ({ ...prev, [qIdx]: !prev[qIdx] }));
  };

  const handleSubmitExam = () => {
    if (!currentExam) return;
    sfx.playClick();

    let correctCount = 0;
    currentExam.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answerIndex) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / currentExam.questions.length) * 100);
    const passed = calculatedScore >= currentExam.passingScore;

    setScoreResult({
      score: calculatedScore,
      correctCount,
      totalQuestions: currentExam.questions.length,
      passed
    });
    setExamFinished(true);

    if (passed) {
      sfx.playLevelUp();
      onEarnXP(80);
      onCompleteQuest('q_exam');
    } else {
      sfx.playIncorrect();
      onEarnXP(30);
    }

    setUserData(prev => ({
      ...prev,
      examHistory: [
        ...(prev.examHistory || []),
        {
          examId: currentExam.id,
          title: currentExam.title,
          score: calculatedScore,
          date: new Date().toISOString()
        }
      ]
    }));
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#F97316] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              SIMULASI UJIAN • JENJANG {userData.selectedLevel}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Simulasi Ujian Sekolah, UTBK-SNBT & TOEFL
            </h1>
            <p className="text-sm font-bold text-white/90 mt-1 max-w-2xl">
              Uji ketepatan berpikir dengan timer hitung mundur, penanda ragu-ragu, dan pembahasan lengkap tiap nomor.
            </p>
          </div>
        </div>
      </div>

      {/* BEFORE EXAM: Selection */}
      {!examStarted && !examFinished && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map(exam => (
            <div key={exam.id} className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="neo-badge bg-[#FFE600] text-[#18181B] px-2.5 py-1">
                    {exam.category}
                  </span>
                  <span className="text-xs font-black text-[#18181B] flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-[#F97316]" />
                    <span>{exam.durationMinutes} Menit</span>
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#18181B] mb-2">{exam.title}</h3>
                <p className="text-xs font-bold text-[#71717A] mb-5">
                  Terdiri dari {exam.questions.length} soal terstandar dengan kelulusan minimal {exam.passingScore}%.
                </p>
              </div>

              <button
                onClick={() => handleStartExam(exam)}
                className="w-full py-3.5 rounded-2xl bg-[#F97316] text-white font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#EA580C] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                Mulai Simulasi Ujian 🚀
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DURING EXAM */}
      {examStarted && !examFinished && currentExam && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            
            <div className="p-4 rounded-2xl bg-[#FFFFFF] border-3 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] flex items-center justify-between">
              <span className="text-xs font-black text-[#18181B]">
                Soal #{currentQIndex + 1} dari {currentExam.questions.length}
              </span>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-[#FFFBEB] border-2 border-[#18181B] text-[#18181B] text-xs font-mono font-black shadow-[2px_2px_0px_0px_#18181B]">
                  <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>{formatTime(timeLeftSeconds)}</span>
                </div>

                <button
                  onClick={() => handleToggleFlag(currentQIndex)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-xl text-xs font-black border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] transition-colors ${
                    flaggedQuestions[currentQIndex]
                      ? 'bg-[#FFE600] text-[#18181B]'
                      : 'bg-[#FFFFFF] text-[#71717A] hover:text-[#18181B]'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{flaggedQuestions[currentQIndex] ? 'Ragu-ragu ✓' : 'Tandai Ragu'}</span>
                </button>
              </div>
            </div>

            <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B]">
              <p className="text-base sm:text-lg font-black text-[#18181B] whitespace-pre-line mb-6 leading-relaxed">
                {currentExam.questions[currentQIndex].text}
              </p>

              <div className="space-y-3">
                {currentExam.questions[currentQIndex].options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-4 rounded-2xl border-2.5 border-[#18181B] text-left text-xs sm:text-sm font-bold transition-all flex items-start space-x-3 ${
                        isSelected
                          ? 'bg-[#FFE600] text-[#18181B] shadow-[4px_4px_0px_0px_#18181B] -translate-y-0.5'
                          : 'bg-[#FFFFFF] text-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-[#F4F4F5]'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 border-2 border-[#18181B] ${
                        isSelected ? 'bg-[#18181B] text-white' : 'bg-[#F4F4F5] text-[#18181B]'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                disabled={currentQIndex === 0}
                onClick={() => {
                  sfx.playClick();
                  setCurrentQIndex(prev => prev - 1);
                }}
                className="flex items-center space-x-1.5 px-5 py-3 rounded-2xl bg-[#FFFFFF] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentQIndex + 1 < currentExam.questions.length ? (
                <button
                  onClick={() => {
                    sfx.playClick();
                    setCurrentQIndex(prev => prev + 1);
                  }}
                  className="flex items-center space-x-1.5 px-6 py-3 rounded-2xl bg-[#F97316] text-white font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#EA580C]"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  className="px-7 py-3 rounded-2xl bg-[#4EED89] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] hover:bg-[#38E478]"
                >
                  Selesaikan Ujian Sekarang ✓
                </button>
              )}
            </div>

          </div>

          {/* Palette */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B]">
              <h4 className="text-xs font-black text-[#18181B] uppercase tracking-wider mb-4">Navigasi Nomor Soal</h4>
              
              <div className="grid grid-cols-5 gap-2.5 mb-6">
                {currentExam.questions.map((_, qIdx) => {
                  const isAnswered = userAnswers[qIdx] !== undefined;
                  const isFlagged = flaggedQuestions[qIdx];
                  const isCurrent = currentQIndex === qIdx;

                  let style = 'bg-[#FFFFFF] text-[#18181B]';
                  if (isAnswered) style = 'bg-[#4EED89] text-[#18181B]';
                  if (isFlagged) style = 'bg-[#FFE600] text-[#18181B]';
                  if (isCurrent) style += ' scale-110 shadow-[4px_4px_0px_0px_#18181B]';

                  return (
                    <button
                      key={qIdx}
                      onClick={() => {
                        sfx.playClick();
                        setCurrentQIndex(qIdx);
                      }}
                      className={`h-11 rounded-xl border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] text-xs font-black transition-all ${style}`}
                    >
                      {qIdx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-2 text-xs font-bold text-[#52525B] border-t-2 border-[#18181B]/20 pt-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-md bg-[#4EED89] border border-[#18181B] inline-block"></span>
                  <span>Terjawab ({Object.keys(userAnswers).length})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded-md bg-[#FFE600] border border-[#18181B] inline-block"></span>
                  <span>Ragu-ragu ({Object.values(flaggedQuestions).filter(Boolean).length})</span>
                </div>
              </div>

              <button
                onClick={handleSubmitExam}
                className="w-full mt-6 py-3.5 rounded-2xl bg-[#4EED89] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#38E478]"
              >
                Kumpulkan Jawaban
              </button>
            </div>
          </div>

        </div>
      )}

      {/* AFTER EXAM */}
      {examFinished && scoreResult && currentExam && (
        <div className="space-y-8">
          
          <div className="p-8 rounded-3xl bg-[#FFFFFF] border-4 border-[#18181B] shadow-[8px_8px_0px_0px_#18181B] text-center max-w-2xl mx-auto space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-[#FFE600] border-3 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] flex items-center justify-center text-4xl">
              {scoreResult.passed ? '🏆' : '📚'}
            </div>
            
            <span className="neo-badge bg-[#F97316] text-white px-3 py-1">
              HASIL EVALUASI UJIAN
            </span>
            <h2 className="text-3xl font-black text-[#18181B] font-['Outfit']">{currentExam.title}</h2>
            
            <div className="my-4">
              <span className={`text-6xl font-black font-['Outfit'] ${scoreResult.passed ? 'text-[#10B981]' : 'text-[#F97316]'}`}>
                {scoreResult.score}
              </span>
              <span className="text-[#71717A] text-xl font-bold"> / 100</span>
            </div>

            <p className="text-sm font-bold text-[#52525B]">
              {scoreResult.passed 
                ? 'Selamat! Kamu berhasil melampaui passing grade ujian ini dengan sangat gemilang!' 
                : 'Pelajari pembahasan di bawah untuk memperkuat pemahamanmu.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleStartExam(currentExam)}
                className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-[#F97316] text-white font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#EA580C]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Ujian Ini</span>
              </button>
              <button
                onClick={() => {
                  setExamStarted(false);
                  setExamFinished(false);
                }}
                className="px-6 py-3.5 rounded-2xl bg-[#FFFFFF] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#F4F4F5]"
              >
                Pilih Ujian Lain
              </button>
            </div>
          </div>

          {/* Detailed Explanations */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h3 className="text-xl font-black text-[#18181B] mb-4">Pembahasan & Analisis Soal</h3>

            {currentExam.questions.map((q, idx) => {
              const userPick = userAnswers[idx];
              const isCorrect = userPick === q.answerIndex;

              return (
                <div key={idx} className="p-6 rounded-3xl bg-[#FFFFFF] border-3 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#71717A]">Nomor #{idx + 1}</span>
                    {isCorrect ? (
                      <span className="px-2.5 py-1 rounded-xl bg-[#4EED89] text-[#18181B] border-2 border-[#18181B] font-black text-xs shadow-[2px_2px_0px_0px_#18181B]">
                        ✓ Jawaban Benar
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-[#FF5E8E] text-white border-2 border-[#18181B] font-black text-xs shadow-[2px_2px_0px_0px_#18181B]">
                        ✗ Jawaban Salah
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-black text-[#18181B] whitespace-pre-line">{q.text}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
                    <div className="p-3 rounded-xl bg-[#F8FAFC] border-2 border-[#18181B]">
                      <span className="text-[#71717A] block mb-0.5">Pilihan Kamu:</span>
                      <span className={isCorrect ? 'text-[#10B981] font-black' : 'text-[#FF5E8E] font-black'}>
                        {userPick !== undefined ? q.options[userPick] : '(Tidak dijawab)'}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#ECFDF5] border-2 border-[#18181B]">
                      <span className="text-[#059669] block mb-0.5">Kunci yang Benar:</span>
                      <span className="text-[#10B981] font-black">{q.options[q.answerIndex]}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border-2 border-[#18181B] text-xs font-bold text-[#18181B]">
                    <span className="font-black text-[#B45309]">💡 Pembahasan: </span>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}

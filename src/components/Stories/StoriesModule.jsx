import React, { useState } from 'react';
import { 
  BookMarked, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  Clock
} from 'lucide-react';
import { STORIES_DATA } from '../../data/storiesData';
import { speechService } from '../../services/speechService';
import { sfx } from '../../services/soundEffects';

export default function StoriesModule({ userData, onEarnXP, onCompleteQuest }) {
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [clickedWordInfo, setClickedWordInfo] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);

  const filteredStories = STORIES_DATA.filter(s => s.level === userData.selectedLevel);
  const currentStory = STORIES_DATA.find(s => s.id === selectedStoryId) || filteredStories[0];

  const handleReadSentence = (idx) => {
    setActiveSentenceIndex(idx);
    sfx.playClick();
    const sentence = currentStory.sentences[idx];
    speechService.speak(sentence.en, {
      rate: 0.95,
      lang: 'en-US',
      onEnd: () => setActiveSentenceIndex(null)
    });
  };

  const handlePlayFullStory = () => {
    setIsPlayingAll(true);
    sfx.playClick();
    
    let idx = 0;
    const playNext = () => {
      if (idx < currentStory.sentences.length) {
        setActiveSentenceIndex(idx);
        speechService.speak(currentStory.sentences[idx].en, {
          rate: 0.95,
          lang: 'en-US',
          onEnd: () => {
            idx++;
            playNext();
          }
        });
      } else {
        setIsPlayingAll(false);
        setActiveSentenceIndex(null);
      }
    };
    playNext();
  };

  const handleStopStory = () => {
    speechService.stop();
    setIsPlayingAll(false);
    setActiveSentenceIndex(null);
    sfx.playClick();
  };

  const handleWordClick = (word) => {
    sfx.playClick();
    const clean = word.toLowerCase().replace(/[^a-z]/g, '');
    const meaning = currentStory.vocabularyHelp[clean] || 'Kamus cepat: Kosakata kontekstual cerita';
    setClickedWordInfo({ word: clean, meaning });
    speechService.speak(clean, { lang: 'en-US' });
  };

  const handleQuizSelect = (option) => {
    setQuizAnswer(option);
    const isCorrect = option === currentStory.quiz.answer;
    setQuizFeedback(isCorrect);

    if (isCorrect) {
      sfx.playCorrect();
      onEarnXP(30);
      onCompleteQuest('q_grammar');
    } else {
      sfx.playIncorrect();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#C084FC] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-[#18181B]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              GRADED STORIES • KARAOKE READ-ALONG
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Membaca Cerita dengan Audio Karaoke
            </h1>
            <p className="text-sm font-bold text-[#18181B]/80 mt-1 max-w-2xl">
              Teks tersorot saat dibaca, klik kata untuk arti instan, dan selesaikan kuis pemahaman di akhir cerita.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Stories list */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] px-1">Daftar Cerita {userData.selectedLevel}</h3>
          {filteredStories.map(story => {
            const isSelected = currentStory.id === story.id;
            return (
              <button
                key={story.id}
                onClick={() => {
                  handleStopStory();
                  setSelectedStoryId(story.id);
                  setClickedWordInfo(null);
                  setQuizAnswer(null);
                  setQuizFeedback(null);
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all border-2.5 border-[#18181B] ${
                  isSelected
                    ? 'bg-[#FFE600] text-[#18181B] shadow-[5px_5px_0px_0px_#18181B] -translate-y-1'
                    : 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] shadow-[3px_3px_0px_0px_#18181B]'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-3xl p-2 rounded-xl bg-[#FFFFFF] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">{story.coverEmoji}</span>
                  <div>
                    <span className="text-[10px] font-black text-[#9333EA] uppercase">{story.genre}</span>
                    <h4 className="font-black text-sm text-[#18181B]">{story.title}</h4>
                    <span className="text-xs font-bold text-[#71717A] flex items-center space-x-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{story.readTime} membaca</span>
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Story Reader */}
        {currentStory && (
          <div className="lg:col-span-8 space-y-6">
            
            <div className="p-8 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2.5 border-[#18181B]/20 pb-4">
                <div>
                  <span className="neo-badge bg-[#C084FC] text-[#18181B] px-2.5 py-1 inline-block mb-1">
                    {currentStory.level} • {currentStory.genre}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#18181B]">{currentStory.title}</h2>
                </div>

                <button
                  onClick={isPlayingAll ? handleStopStory : handlePlayFullStory}
                  className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl font-black text-xs border-2.5 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
                    isPlayingAll
                      ? 'bg-[#FF5E8E] text-white'
                      : 'bg-[#FFE600] text-[#18181B] hover:bg-[#FFEA2E]'
                  }`}
                >
                  {isPlayingAll ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isPlayingAll ? 'Hentikan Karaoke' : 'Putar Karaoke Cerita 🎵'}</span>
                </button>
              </div>

              {/* Sentences */}
              <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                {currentStory.sentences.map((sent, sIdx) => {
                  const isActive = activeSentenceIndex === sIdx;
                  return (
                    <div 
                      key={sIdx}
                      className={`p-4 rounded-2xl border-2.5 border-[#18181B] transition-all ${
                        isActive
                          ? 'bg-[#FFE600] shadow-[4px_4px_0px_0px_#18181B] scale-[1.01]'
                          : 'bg-[#F8FAFC] shadow-[2px_2px_0px_0px_#18181B] hover:bg-[#FFFFFF]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-black text-[#18181B]">
                          {sent.en.split(' ').map((word, wIdx) => (
                            <span
                              key={wIdx}
                              onClick={() => handleWordClick(word)}
                              className="cursor-pointer hover:bg-[#A855F7] hover:text-white px-0.5 rounded transition-colors mr-1 inline-block"
                            >
                              {word}
                            </span>
                          ))}
                        </p>
                        <button
                          onClick={() => handleReadSentence(sIdx)}
                          className="p-2 rounded-xl bg-[#FFFFFF] border-2 border-[#18181B] text-[#18181B] hover:bg-[#FFE600] shrink-0 shadow-[2px_2px_0px_0px_#18181B]"
                          title="Dengarkan Kalimat Ini"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-bold text-[#71717A] mt-2 italic border-t border-[#18181B]/15 pt-1.5">
                        {sent.id}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="text-xs font-black text-center text-[#71717A]">
                💡 Tips: Klik sembarang kata bahasa Inggris untuk mendengar pengucapan dan artinya!
              </div>
            </div>

            {/* Clicked Word Modal/Banner */}
            {clickedWordInfo && (
              <div className="p-5 rounded-2xl bg-[#FFFBEB] border-2.5 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-[#FFE600] border-2 border-[#18181B] text-[#18181B]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#B45309] uppercase">{clickedWordInfo.word}</span>
                    <p className="text-sm font-black text-[#18181B]">{clickedWordInfo.meaning}</p>
                  </div>
                </div>
                <button
                  onClick={() => speechService.speak(clickedWordInfo.word, { lang: 'en-US' })}
                  className="px-4 py-2 rounded-xl bg-[#FFFFFF] text-[#18181B] text-xs font-black border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-[#FFE600]"
                >
                  🔊 Dengarkan
                </button>
              </div>
            )}

            {/* Quiz */}
            <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-4">
              <h3 className="text-xl font-black text-[#18181B]">📝 Kuis Pemahaman Cerita</h3>
              <p className="text-sm font-black text-[#18181B]">{currentStory.quiz.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentStory.quiz.options.map((opt, oIdx) => {
                  const isPicked = quizAnswer === opt;
                  const isCorrectOpt = opt === currentStory.quiz.answer;
                  let btnStyle = 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#FFE600]';

                  if (quizFeedback !== null) {
                    if (isCorrectOpt) {
                      btnStyle = 'bg-[#4EED89] text-[#18181B] font-black';
                    } else if (isPicked && !isCorrectOpt) {
                      btnStyle = 'bg-[#FF5E8E] text-white font-bold';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleQuizSelect(opt)}
                      className={`p-4 rounded-2xl border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] text-xs font-bold text-left transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {quizFeedback !== null && (
                <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border-2 border-[#18181B] text-xs font-bold text-[#18181B]">
                  <span className="font-black text-[#059669]">💡 Penjelasan: </span>
                  {currentStory.quiz.explanation}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

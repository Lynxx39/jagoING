import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  AlertCircle,
  Lightbulb,
  RotateCcw
} from 'lucide-react';
import { ROLEPLAY_SCENARIOS } from '../../data/roleplayScenarios';
import { generateRoleplayReply } from '../../services/aiTutorEngine';
import { speechService } from '../../services/speechService';
import { sfx } from '../../services/soundEffects';

export default function RoleplayModule({ userData, onEarnXP, onCompleteQuest }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState(ROLEPLAY_SCENARIOS[0].id);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scenario = ROLEPLAY_SCENARIOS.find(s => s.id === selectedScenarioId) || ROLEPLAY_SCENARIOS[0];

  useEffect(() => {
    setMessages([
      {
        id: 'init_msg',
        sender: 'bot',
        text: scenario.initialMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [selectedScenarioId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    sfx.playClick();
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: userTime
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      const response = generateRoleplayReply(scenario.id, text, messages);
      
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: response.botReply,
        feedback: response.grammarFeedback,
        suggestion: response.suggestion,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      sfx.playCorrect();
      onEarnXP(response.xpEarned || 15);
      onCompleteQuest('q_listening');

      speechService.speak(response.botReply, { lang: 'en-US' });
    }, 600);
  };

  const handleVoiceInput = () => {
    sfx.playClick();
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      return;
    }

    const started = speechService.startListening(
      (res) => {
        setInputText(res.final || res.interim);
        if (res.isFinal) {
          setIsListening(false);
          handleSendMessage(res.final);
        }
      },
      (err) => {
        console.warn(err);
        setIsListening(false);
      },
      () => setIsListening(false)
    );

    if (started) {
      setIsListening(true);
    }
  };

  const handleSpeakText = (text) => {
    sfx.playClick();
    speechService.speak(text, { lang: 'en-US' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#34D399] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-[#18181B]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              AI ENGLISH BUDDY • ROLEPLAY TUTOR
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Simulasi Percakapan dengan Koreksi Tata Bahasa
            </h1>
            <p className="text-sm font-bold text-[#18181B]/80 mt-1 max-w-2xl">
              Latihan ngobrol bahasa Inggris di situasi nyata. AI mendengarkan suara dan memberikan saran perbaikan instan.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Scenarios */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#18181B] px-1">Pilih Skenario Percakapan</h3>
          {ROLEPLAY_SCENARIOS.map(sc => {
            const isSelected = scenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  sfx.playClick();
                  setSelectedScenarioId(sc.id);
                }}
                className={`w-full text-left p-4 rounded-2xl transition-all border-2.5 border-[#18181B] ${
                  isSelected
                    ? 'bg-[#FFE600] text-[#18181B] shadow-[5px_5px_0px_0px_#18181B] -translate-y-1'
                    : 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] shadow-[3px_3px_0px_0px_#18181B]'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl p-2 rounded-xl bg-[#FFFFFF] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]">{sc.avatar}</span>
                  <div>
                    <span className="text-[10px] font-black text-[#059669] uppercase">{sc.level} • {sc.role}</span>
                    <h4 className="font-black text-sm text-[#18181B]">{sc.title}</h4>
                    <p className="text-xs font-bold text-[#71717A] line-clamp-2 mt-0.5">{sc.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Chat Interface */}
        <div className="lg:col-span-8 flex flex-col h-[600px] rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b-3 border-[#18181B] bg-[#FFFBEB] flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{scenario.avatar}</span>
              <div>
                <h3 className="font-black text-sm text-[#18181B]">{scenario.title}</h3>
                <span className="text-xs text-[#059669] font-black">{scenario.role} • Siap Mengobrol</span>
              </div>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                setMessages([{
                  id: 'init_msg',
                  sender: 'bot',
                  text: scenario.initialMessage,
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]);
              }}
              className="p-2 rounded-xl bg-[#FFFFFF] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-[#FFE600]"
              title="Reset Percakapan"
            >
              <RotateCcw className="w-4 h-4 text-[#18181B]" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#FEF9EF]/50">
            {messages.map(msg => {
              const isBot = msg.sender === 'bot';
              return (
                <div key={msg.id} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl border-2.5 border-[#18181B] ${
                    isBot 
                      ? 'bg-[#FFFFFF] text-[#18181B] shadow-[4px_4px_0px_0px_#18181B]' 
                      : 'bg-[#FFE600] text-[#18181B] shadow-[4px_4px_0px_0px_#18181B]'
                  }`}>
                    <div className="flex items-center justify-between space-x-3 mb-1">
                      <span className="text-[10px] font-black uppercase text-[#71717A]">
                        {isBot ? scenario.role : 'Kamu (Pelajar)'}
                      </span>
                      {isBot && (
                        <button
                          onClick={() => handleSpeakText(msg.text)}
                          className="p-1 rounded-md text-[#18181B] hover:bg-[#F4F4F5]"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    
                    <p className="text-sm font-bold leading-relaxed">{msg.text}</p>
                    <span className="text-[9px] font-bold text-[#A1A1AA] block text-right mt-1">{msg.time}</span>
                  </div>

                  {/* AI Grammar Feedback */}
                  {msg.feedback && (
                    <div className="mt-2 max-w-[85%] p-3.5 rounded-2xl bg-[#FEF2F2] border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] text-xs">
                      <div className="flex items-center space-x-1.5 font-black text-[#DC2626] mb-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>Saran Perbaikan Tata Bahasa:</span>
                      </div>
                      {msg.feedback.errors.map((err, errIdx) => (
                        <p key={errIdx} className="text-[11px] font-bold text-[#18181B] mb-1">
                          • <span className="line-through text-[#DC2626]">{err.original}</span> ➔ <span className="text-[#16A34A]">{err.replacement}</span>: {err.rule}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Phrasing suggestion */}
                  {msg.suggestion && (
                    <div 
                      onClick={() => setInputText(msg.suggestion.replace("You can say: '", "").replace("'", ""))}
                      className="mt-1.5 max-w-[85%] px-3.5 py-2 rounded-xl bg-[#ECFDF5] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] text-[11px] font-black text-[#065F46] cursor-pointer hover:bg-[#D1FAE5] transition-colors flex items-center space-x-1.5"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                      <span>💡 <strong>Ide balasan:</strong> {msg.suggestion}</span>
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Starters */}
          <div className="px-4 py-2.5 bg-[#FFFFFF] border-t-2.5 border-[#18181B] flex items-center space-x-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-black text-[#71717A] uppercase shrink-0">Pilihan Cepat:</span>
            {scenario.suggestedStarters.map((starter, sIdx) => (
              <button
                key={sIdx}
                onClick={() => handleSendMessage(starter)}
                className="px-3 py-1 rounded-xl bg-[#F4F4F5] text-[#18181B] border-2 border-[#18181B] hover:bg-[#FFE600] text-xs font-bold whitespace-nowrap shadow-[2px_2px_0px_0px_#18181B]"
              >
                {starter}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#FFFFFF] border-t-3 border-[#18181B] flex items-center space-x-2">
            <button
              onClick={handleVoiceInput}
              className={`p-3.5 rounded-2xl border-2.5 border-[#18181B] transition-all ${
                isListening
                  ? 'bg-[#FF5E8E] text-white animate-pulse shadow-[2px_2px_0px_0px_#18181B]'
                  : 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#FFE600] shadow-[3px_3px_0px_0px_#18181B]'
              }`}
              title="Ketik dengan Suara (Mic)"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tulis pesan bahasa Inggris di sini..."
              className="flex-1 p-3.5 rounded-2xl bg-[#F8FAFC] border-2.5 border-[#18181B] text-sm font-bold text-[#18181B] focus:outline-none focus:bg-[#FFFFFF]"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-3.5 rounded-2xl bg-[#FFE600] text-[#18181B] font-black border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#FFEA2E] active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-40"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

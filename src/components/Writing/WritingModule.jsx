import React, { useState } from 'react';
import { 
  PenTool, 
  CheckCircle, 
  Sparkles, 
  Copy, 
  RotateCcw, 
  Zap
} from 'lucide-react';
import { analyzeGrammar } from '../../services/aiTutorEngine';
import { sfx } from '../../services/soundEffects';

export default function WritingModule({ onEarnXP }) {
  const [inputText, setInputText] = useState("Yesterday night, I am agree with my friend to discuss about our school project. He don't like when we are late.");
  const [copied, setCopied] = useState(false);

  const result = analyzeGrammar(inputText);

  const handleApplyFix = () => {
    sfx.playCorrect();
    setInputText(result.correctedText);
    onEarnXP(20);
  };

  const handleCopy = () => {
    sfx.playClick();
    navigator.clipboard.writeText(result.correctedText || inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#FBBF24] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-[#18181B]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              WRITING & ESSAY CHECKER
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Koreksi Esai & Deteksi Kesalahan Terjemahan Harfiah
            </h1>
            <p className="text-sm font-bold text-[#18181B]/80 mt-1 max-w-2xl">
              Cek tata bahasa, hilangkan false friends Indo-Inggris (*I am agree ➔ I agree*), dan pantau tingkat CEFR tulisanmu.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Editor */}
        <div className="lg:col-span-7 space-y-5">
          <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#18181B] uppercase tracking-wider">Tulis atau Tempel Teks:</span>
              <button
                onClick={() => setInputText('')}
                className="text-xs font-bold text-[#71717A] hover:text-[#18181B] flex items-center space-x-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Bersihkan Teks</span>
              </button>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              placeholder="Ketik esai atau kalimat bahasa Inggrismu di sini..."
              className="w-full p-4 rounded-2xl bg-[#F8FAFC] border-2.5 border-[#18181B] shadow-inner text-sm font-bold text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:bg-[#FFFFFF] leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {result.errors.length > 0 && (
                <button
                  onClick={handleApplyFix}
                  className="flex items-center space-x-1.5 px-5 py-3 rounded-2xl bg-[#4EED89] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#38E478] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <Zap className="w-4 h-4 text-[#18181B]" />
                  <span>Perbaiki Semua Otomatis ({result.errors.length})</span>
                </button>
              )}

              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-5 py-3 rounded-2xl bg-[#FFFFFF] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] hover:bg-[#F4F4F5]"
              >
                <Copy className="w-4 h-4" />
                <span>{copied ? 'Tersalin ✓' : 'Salin Teks Bersih'}</span>
              </button>
            </div>
          </div>

          {result.errors.length > 0 && (
            <div className="p-6 rounded-3xl bg-[#ECFDF5] border-3 border-[#18181B] shadow-[5px_5px_0px_0px_#18181B] space-y-2">
              <span className="text-xs font-black text-[#059669] flex items-center space-x-1.5 uppercase">
                <CheckCircle className="w-4 h-4" />
                <span>Rekomendasi Teks yang Telah Diperbaiki:</span>
              </span>
              <p className="text-sm font-black text-[#18181B] bg-[#FFFFFF] p-4 rounded-2xl border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] leading-relaxed">
                {result.correctedText}
              </p>
            </div>
          )}
        </div>

        {/* Right: Metrics & Feed */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-5">
            <h3 className="text-sm font-black text-[#18181B] uppercase tracking-wider">Kualitas Tulisan</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] text-center">
                <span className="text-[10px] font-black uppercase text-[#71717A] block mb-1">Skor Grammar</span>
                <span className={`text-4xl font-black font-['Outfit'] ${result.score >= 80 ? 'text-[#10B981]' : 'text-[#F97316]'}`}>
                  {result.score}%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] text-center flex flex-col justify-center">
                <span className="text-[10px] font-black uppercase text-[#71717A] block mb-1">Level CEFR</span>
                <span className="text-xs font-black text-[#18181B] bg-[#FFE600] px-2.5 py-1 rounded-xl border border-[#18181B] inline-block shadow-[1px_1px_0px_0px_#18181B]">
                  {result.readability}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-[#71717A] border-t-2 border-[#18181B]/20 pt-3">
              <span>Jumlah Kata: <strong className="text-[#18181B]">{result.wordCount}</strong></span>
              <span>Jumlah Kalimat: <strong className="text-[#18181B]">{result.sentenceCount}</strong></span>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#18181B]">
              Kesalahan Terdeteksi ({result.errors.length})
            </h4>

            {result.errors.length === 0 ? (
              <div className="p-4 rounded-2xl bg-[#ECFDF5] border-2 border-[#18181B] text-[#065F46] text-xs font-bold flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                <span>Luar biasa! Tidak ada kesalahan terjemahan harfiah.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {result.errors.map((err, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FEF2F2] border-2 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B] space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="line-through text-[#DC2626] font-bold">{err.original}</span>
                      <span className="text-[#18181B]">➔</span>
                      <span className="text-[#16A34A] font-black">{err.replacement}</span>
                    </div>
                    <p className="text-[#52525B] text-[11px] font-bold mt-1">{err.rule}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

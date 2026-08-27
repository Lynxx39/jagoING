import React, { useState } from 'react';
import { Quote, Volume2 } from 'lucide-react';
import { IDIOMS_DATA } from '../../data/idiomsData';
import { speechService } from '../../services/speechService';
import { sfx } from '../../services/soundEffects';

export default function IdiomsModule() {
  const [filterType, setFilterType] = useState('All');

  const filteredIdioms = filterType === 'All' 
    ? IDIOMS_DATA 
    : IDIOMS_DATA.filter(i => i.type === filterType);

  const handleSpeak = (text) => {
    sfx.playClick();
    speechService.speak(text, { lang: 'en-US' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#F43F5E] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              IDIOMS & PHRASAL VERBS
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Bicara Alami Seperti Penutur Asli
            </h1>
            <p className="text-sm font-bold text-white/90 mt-1 max-w-2xl">
              Ungkapan idiomatik dan kata kerja frasa yang sering muncul di ujian sekolah, percakapan sehari-hari, dan film.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-[#FFFFFF] p-1.5 rounded-2xl border-2.5 border-[#18181B] shadow-[3px_3px_0px_0px_#18181B]">
            {['All', 'Idiom', 'Phrasal Verb'].map(type => (
              <button
                key={type}
                onClick={() => {
                  sfx.playClick();
                  setFilterType(type);
                }}
                className={`px-3.5 py-1.5 text-xs font-black rounded-xl transition-all ${
                  filterType === type
                    ? 'bg-[#FFE600] text-[#18181B] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B]'
                    : 'text-[#71717A] hover:text-[#18181B]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdioms.map(item => (
          <div key={item.id} className="p-7 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="neo-badge bg-[#FFE600] text-[#18181B] px-2.5 py-1">
                  {item.type} • {item.level}
                </span>
                <button
                  onClick={() => handleSpeak(item.phrase)}
                  className="p-2.5 rounded-xl bg-[#F43F5E] text-white border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] hover:bg-[#E11D48]"
                  title="Dengarkan Pengucapan"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-2xl font-black text-[#18181B] mb-1 font-['Outfit']">{item.phrase}</h3>
              <p className="text-xs text-[#F43F5E] font-black mb-3">
                Makna: {item.actualMeaning}
              </p>

              <div className="p-4 rounded-2xl bg-[#FFFBEB] border-2 border-[#18181B] shadow-[2px_2px_0px_0px_#18181B] space-y-1 text-xs font-bold">
                <p className="text-[#18181B]">"{item.example}"</p>
                <p className="text-[11px] text-[#71717A] italic">"{item.exampleId}"</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-[#18181B]/15 flex items-center justify-between text-xs font-black text-[#71717A]">
              <span>Harfiah: "{item.literal}"</span>
              <span className="text-[#F43F5E]">#{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Printer } from 'lucide-react';
import { CHEATSHEETS_DATA } from '../../data/cheatsheetsData';
import { sfx } from '../../services/soundEffects';

export default function CheatSheetsModule() {
  const [selectedSheetId, setSelectedSheetId] = useState(CHEATSHEETS_DATA[0].id);
  const currentSheet = CHEATSHEETS_DATA.find(s => s.id === selectedSheetId) || CHEATSHEETS_DATA[0];

  const handlePrint = () => {
    sfx.playClick();
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="mb-8 p-7 rounded-3xl bg-[#60A5FA] border-3.5 border-[#18181B] shadow-[7px_7px_0px_0px_#18181B] text-[#18181B] print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="neo-badge bg-[#FFFFFF] text-[#18181B] px-3 py-1 inline-block mb-1">
              CHEAT SHEETS • READY TO PRINT
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-['Outfit'] mt-1">
              Lembar Ringkasan Rumus & Tabel Siap Cetak
            </h1>
            <p className="text-sm font-bold text-[#18181B]/80 mt-1 max-w-2xl">
              Gunakan lembar ringkasan ini untuk review kilat sebelum ujian atau cetak langsung menjadi catatan belajar fisik.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-[#FFE600] text-[#18181B] font-black text-xs border-2.5 border-[#18181B] shadow-[4px_4px_0px_0px_#18181B] hover:bg-[#FFEA2E] active:translate-x-0.5 active:translate-y-0.5 transition-all shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF 🖨️</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6 print:hidden">
        {CHEATSHEETS_DATA.map(sheet => (
          <button
            key={sheet.id}
            onClick={() => {
              sfx.playClick();
              setSelectedSheetId(sheet.id);
            }}
            className={`px-5 py-2.5 rounded-2xl border-2.5 border-[#18181B] text-xs font-black transition-all ${
              currentSheet.id === sheet.id
                ? 'bg-[#FFE600] text-[#18181B] shadow-[4px_4px_0px_0px_#18181B] -translate-y-0.5'
                : 'bg-[#FFFFFF] text-[#18181B] hover:bg-[#F4F4F5] shadow-[2px_2px_0px_0px_#18181B]'
            }`}
          >
            {sheet.title}
          </button>
        ))}
      </div>

      {/* Printable Sheet */}
      <div className="p-8 rounded-3xl bg-[#FFFFFF] border-3.5 border-[#18181B] shadow-[6px_6px_0px_0px_#18181B] text-[#18181B] print:border-none print:shadow-none print:p-0">
        <div className="border-b-3 border-[#18181B] pb-4 mb-6">
          <span className="neo-badge bg-[#60A5FA] text-[#18181B] px-2.5 py-1 inline-block mb-1">
            {currentSheet.category}
          </span>
          <h2 className="text-3xl font-black font-['Outfit'] mt-1">{currentSheet.title}</h2>
          <p className="text-xs font-bold text-[#71717A] mt-1">{currentSheet.description}</p>
        </div>

        <div className="space-y-8">
          {currentSheet.sections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h3 className="text-lg font-black text-[#18181B] bg-[#FFFBEB] px-3 py-1.5 rounded-xl border-2 border-[#18181B] inline-block shadow-[2px_2px_0px_0px_#18181B]">
                {sec.tenseGroup}
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-2 border-[#18181B] rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#18181B]">
                  <thead>
                    <tr className="bg-[#FFE600] border-b-2 border-[#18181B] text-[#18181B]">
                      <th className="p-3 font-black">Nama / Kategori</th>
                      <th className="p-3 font-black font-mono">Formula / Bentuk</th>
                      <th className="p-3 font-black">Kegunaan & Makna</th>
                      <th className="p-3 font-black">Contoh Kalimat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#18181B] bg-[#FFFFFF]">
                    {sec.items.map((item, iIdx) => (
                      <tr key={iIdx} className="hover:bg-[#FFFBEB]">
                        <td className="p-3 font-black text-[#18181B]">{item.name}</td>
                        <td className="p-3 font-mono font-bold text-[#A855F7]">{item.formula}</td>
                        <td className="p-3 font-bold text-[#52525B]">{item.usage}</td>
                        <td className="p-3 font-bold text-[#71717A] italic">"{item.example}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t-2 border-[#18181B] flex items-center justify-between text-xs font-black text-[#71717A]">
          <span>jagoING - Platform Belajar Bahasa Inggris Pintar SD, SMP & SMA</span>
          <span>Dicetak untuk Pembelajaran Mandiri</span>
        </div>
      </div>
    </div>
  );
}

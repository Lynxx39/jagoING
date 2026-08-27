# ⚡ jagoING - Platform Belajar Bahasa Inggris Pintar (SD • SMP • SMA)

<div align="center">

![jagoING Banner](https://img.shields.io/badge/jagoING-Platform%20Belajar%20Bahasa%20Inggris-FFE600?style=for-the-badge&logo=lightning&logoColor=18181B)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.0-FF5E8E?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-4EED89?style=flat-square&logo=github&logoColor=black)](https://lynxx39.github.io/jagoING/)

**jagoING** adalah platform pembelajaran Bahasa Inggris interaktif, modern, dan gamified yang dirancang khusus untuk siswa **SD, SMP, hingga SMA**. Dibangun dengan estetika desain **Neo-Brutalism** yang berani, dinamis, serta dilengkapi animasi pegas (*spring physics*) dari Framer Motion.

[Demo Aplikasi](https://lynxx39.github.io/jagoING/) • [Fitur Utama](#-fitur-utama) • [Teknologi](#-stack-teknologi) • [Panduan Menjalankan](#-cara-menjalankan-secara-lokal) • [Panduan Deploy](#-cara-deploy-ke-github-pages)

</div>

---

## 🎨 Tema & Desain: Neo-Brutalism & Craft

- **Border Tebal & Hard Shadows**: Garis tepi tegas 3px–4px hitam solid dengan bayangan tajam 4px–8px tanpa blur (`shadow-[6px_6px_0px_0px_#18181B]`).
- **Palet Warna Pop & Enerjik**: *Electric Yellow* (`#FFE600`), *Bubblegum Pink* (`#FF5E8E`), *Neon Emerald* (`#4EED89`), *Sky Blue* (`#38BDF8`), *Lavender* (`#A855F7`), dan *Warm Cream Canvas* (`#FEF9EF`).
- **Animasi Spring Physics & Micro-Interactions**: Didukung oleh **Framer Motion** untuk navigasi tab yang elastis (`layoutId`), efek *marquee ticker*, *floating stickers*, dan transisi antar halaman (`AnimatePresence`).

---

## 🌟 12 Modul Pembelajaran Lengkap

| Modul | Deskripsi & Fungsionalitas |
| :--- | :--- |
| **🎒 Jenjang SD, SMP, SMA** | Switcher instan di header yang secara dinamis menyesuaikan materi, tingkat kosakata, dan jenis kuis sesuai usia & kurikulum siswa. |
| **📖 Grammar Master** | Penjelasan visual rumus (*Color-Coded Syntax Tokens*) dan 3 jenis drill interaktif: *Multiple Choice*, *Sentence Scramble Builder*, dan *Error Spotting*. |
| **🎧 Listening Lab** | Pemutar audio Web Speech Synthesis dengan pengatur tempo kecepatan (0.75x, 1.0x, 1.25x), latihan mengetik dikte (*Dictation Trainer*), dan tes pemahaman dialog. |
| **🧠 Smart Flashcard SRS** | Algoritma Spaced Repetition **SuperMemo SM-2** dengan kartu 3D flip, pelafalan audio IPA, dan rating memori (*Again, Hard, Good, Easy*). |
| **🗣️ Speaking Coach** | Pelatih pelafalan lisan langsung melalui mikrofon (*Web Speech Recognition API*) dengan evaluasi akurasi kata demi kata secara real-time. |
| **📝 Kuis & Mock Exam** | Simulasi ujian sekolah, UTBK-SNBT (Literasi Bahasa Inggris), dan Mock TOEFL dengan timer hitung mundur, palet nomor soal, penanda ragu-ragu, dan pembahasan tuntas. |
| **💬 AI English Buddy** | Chatbot tutor interaktif untuk simulasi percakapan kontekstual (*Restoran, Bandara, Wawancara Kerja, Kelas Sekolah*) dengan koreksi tata bahasa otomatis. |
| **✍️ Writing Checker** | Penganalisis tata bahasa dan pendeteksi kesalahan terjemahan harfiah Indo-Inggris (*false friends* seperti *"I am agree"*, *"Join with us"*) serta indikator keterbacaan CEFR A1–C1. |
| **📚 Graded Stories** | Cerita berjenjang dengan fitur *Karaoke Audio Read-Along* (teks tersorot otomatis saat dibaca), *Click-to-Translate* kata instan, dan kuis pemahaman cerita. |
| **🧩 Idioms & Slang Master** | Bank idiom dan *Phrasal Verbs* populer dengan contoh kalimat nyata dan terjemahan kontekstual. |
| **🕹️ Minigames Arcade** | Game *Word Scramble* kosakata dengan timer, petunjuk clue, dan perolehan skor kombo. |
| **📑 Printable Cheat Sheets** | Matriks 16 Tenses dan tabel *Irregular Verbs* yang diformat rapi dan siap dicetak ke PDF/kertas via `window.print()`. |
| **🎮 Sistem Gamifikasi Penuh** | XP Level progression (*Novice* s/d *Grandmaster*), Daily Streak tracker, lemari piala (*Badges*), Misi Harian (*Daily Quests*), efek suara Web Audio API, dan selebrasi konfeti. |

---

## 🛠️ Stack Teknologi

- **Frontend**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Neo-Brutalism Design System
- **Animasi & Motion**: [Framer Motion](https://www.framer.com/motion/) + [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Ikonografi**: [Lucide React](https://lucide.dev/)
- **Audio & Suara**: Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`) + Web Audio API Synthesizer (SFX mandiri tanpa URL eksternal)
- **Penyimpanan State**: `LocalStorage` Persistence (SRS interval cards, streak, XP, progress)

---

## 🚀 Cara Menjalankan Secara Lokal

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/Lynxx39/jagoING.git
   cd jagoING
   ```

2. **Pasang Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan**:
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:5173/`.

4. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

---

## 📦 Cara Deploy ke GitHub Pages

Proyek ini telah dikonfigurasi menggunakan relative base path (`base: './'` di `vite.config.js`), sehingga dapat langsung di-deploy ke **GitHub Pages**:

1. Pasang package `gh-pages` jika belum:
   ```bash
   npm install -D gh-pages
   ```

2. Jalankan perintah build & deploy:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

3. Di pengaturan repositori GitHub (`Settings` > `Pages`), pastikan Source diatur ke branch `gh-pages` (folder `/root`).

---

## 📁 Struktur Direktori

```
jagoING/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   ├── grammarData.js       # Materi & drill grammar SD, SMP, SMA
│   │   ├── listeningData.js     # Audio dialog, transkrip & dikte
│   │   ├── flashcardsData.js    # Bank kosakata SRS (SD, SMP, SMA)
│   │   ├── mockExamsData.js     # Paket soal Mock Exam UTBK/TOEFL/UAS
│   │   ├── roleplayScenarios.js # Skenario percakapan AI Buddy
│   │   ├── storiesData.js       # Cerita berjenjang karaoke read-along
│   │   ├── idiomsData.js        # Bank idiom & phrasal verbs
│   │   └── cheatsheetsData.js   # Lembar matriks 16 tenses siap cetak
│   ├── services/
│   │   ├── srsEngine.js         # Algoritma SuperMemo SM-2 Spaced Repetition
│   │   ├── speechService.js     # Layanan TTS & Speech Recognition STT
│   │   ├── soundEffects.js      # Web Audio SFX generator
│   │   ├── aiTutorEngine.js     # Grammar analyzer & live Gemini/OpenAI caller
│   │   └── storageService.js    # LocalStorage sync & leveling rank
│   └── components/
│       ├── Navbar.jsx           # Topbar jagoING, level switcher, streak & tab springs
│       ├── Dashboard/           # Bento overview, marquee ribbon, daily quests
│       ├── Grammar/             # Modul visual grammar tokens & drills
│       ├── Listening/           # Modul player audio, speed control & dictation
│       ├── Flashcards/          # Modul 3D flip card SRS SM-2
│       ├── Speaking/            # Modul speech evaluation coach
│       ├── Exams/               # Modul simulasi kuis & mock exam dengan timer
│       ├── RoleplayChat/        # Modul chatbot tutor roleplay
│       ├── Writing/             # Modul writing checker & false friends detector
│       ├── Stories/             # Modul graded stories & click-to-translate
│       ├── Idioms/              # Modul idioms explorer
│       ├── Games/               # Minigames Arcade Word Scramble
│       ├── CheatSheets/         # Modul tabel siap cetak (PDF/print)
│       └── Gamification/        # Modal perayaan Level Up dengan confetti
```

---

<div align="center">
  Dibuat dengan ❤️ untuk seluruh pelajar Indonesia • <strong>jagoING ⚡</strong>
</div>

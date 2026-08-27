// Printable Cheat Sheets & Reference Matrices for Quick Review

export const CHEATSHEETS_DATA = [
  {
    id: 'cs_16_tenses',
    title: '📊 Matriks 16 Tenses Bahasa Inggris Terlengkap',
    category: 'Grammar Master Matrix',
    description: 'Ringkasan visual formula waktu: Present, Past, Future, dan Past Future.',
    sections: [
      {
        tenseGroup: 'Present Tenses (Masa Kini)',
        items: [
          { name: 'Simple Present', formula: 'S + V1 (s/es) / is,am,are', usage: 'Fakta & Kebiasaan rutin', example: 'She works diligently.' },
          { name: 'Present Continuous', formula: 'S + is/am/are + V-ing', usage: 'Sedang berlangsung saat ini', example: 'They are studying grammar.' },
          { name: 'Present Perfect', formula: 'S + have/has + V3', usage: 'Sudah selesai dengan efek terasa', example: 'I have finished my project.' },
          { name: 'Present Perfect Continuous', formula: 'S + have/has + been + V-ing', usage: 'Sudah berlangsung dan masih terus berjalan', example: 'He has been reading for 2 hours.' }
        ]
      },
      {
        tenseGroup: 'Past Tenses (Masa Lampau)',
        items: [
          { name: 'Simple Past', formula: 'S + V2 / was,were', usage: 'Peristiwa selesai di masa lalu', example: 'We visited Kyoto last year.' },
          { name: 'Past Continuous', formula: 'S + was/were + V-ing', usage: 'Sedang berlangsung di masa lampau', example: 'I was sleeping when you called.' },
          { name: 'Past Perfect', formula: 'S + had + V3', usage: 'Terjadi sebelum peristiwa lampau lain', example: 'The train had left before we arrived.' },
          { name: 'Past Perfect Continuous', formula: 'S + had + been + V-ing', usage: 'Berlangsung lama sebelum masa lalu', example: 'She had been waiting for an hour.' }
        ]
      },
      {
        tenseGroup: 'Future Tenses (Masa Depan)',
        items: [
          { name: 'Simple Future', formula: 'S + will + V1 / is,am,are going to + V1', usage: 'Rencana / prediksi masa depan', example: 'We will achieve our dreams.' },
          { name: 'Future Continuous', formula: 'S + will be + V-ing', usage: 'Sedang berlangsung di waktu mendatang', example: 'This time tomorrow, I will be flying.' },
          { name: 'Future Perfect', formula: 'S + will have + V3', usage: 'Akan sudah tuntas di masa depan', example: 'By 2028, he will have graduated.' }
        ]
      }
    ]
  },
  {
    id: 'cs_irregular_verbs',
    title: '⚡ Tabel Irregular Verbs Berfrekuensi Tinggi',
    category: 'Vocabulary Reference',
    description: 'Daftar perubahan kata kerja tidak beraturan yang wajib dihafal.',
    sections: [
      {
        tenseGroup: 'Kata Kerja Esensial (V1 ➔ V2 ➔ V3)',
        items: [
          { name: 'Become', formula: 'became ➔ become', usage: 'Menjadi', example: 'He became an engineer.' },
          { name: 'Begin', formula: 'began ➔ begun', usage: 'Memulai', example: 'The class began at 8 AM.' },
          { name: 'Choose', formula: 'chose ➔ chosen', usage: 'Memilih', example: 'She has chosen her major.' },
          { name: 'Drive', formula: 'drove ➔ driven', usage: 'Mengemudi', example: 'He drove safely home.' },
          { name: 'Forgive', formula: 'forgave ➔ forgiven', usage: 'Memaafkan', example: 'All mistakes were forgiven.' },
          { name: 'Speak', formula: 'spoke ➔ spoken', usage: 'Berbicara', example: 'English is spoken worldwide.' },
          { name: 'Write', formula: 'wrote ➔ written', usage: 'Menulis', example: 'The novel was written in 1984.' }
        ]
      }
    ]
  }
];

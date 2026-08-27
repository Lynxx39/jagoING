// Comprehensive Grammar Lessons & Drills for SD, SMP, SMA

export const GRAMMAR_DATA = [
  // ====================== SD (ELEMENTARY) ======================
  {
    id: 'sd_simple_present',
    level: 'SD',
    category: 'Tenses Dasar',
    title: 'Simple Present Tense (Kebiasaan Sehari-hari)',
    icon: '☀️',
    summary: 'Digunakan untuk menceritakan kegiatan yang kita lakukan setiap hari atau fakta umum.',
    formula: {
      positive: 'Subject + Verb 1 (+ s/es) + Object',
      negative: 'Subject + do/does not + Verb 1 + Object',
      interrogative: 'Do/Does + Subject + Verb 1 + Object?'
    },
    colorFormula: [
      { part: 'Subject (I/You/They/We)', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
      { part: 'Verb 1 (play / eat)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
      { part: 'Subject (He/She/It)', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
      { part: 'Verb 1 + s/es (plays / eats)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' }
    ],
    rules: [
      'Jika subjeknya **I, You, They, We** ➔ kata kerja **tetap** (contoh: *I drink milk*).',
      'Jika subjeknya **He, She, It, Budi** ➔ kata kerja ditambah **-s atau -es** (contoh: *He drinks milk*, *She watches TV*).'
    ],
    examples: [
      { en: 'I go to school by bicycle every morning.', id: 'Saya pergi ke sekolah naik sepeda setiap pagi.' },
      { en: 'My cat eats fish happily.', id: 'Kucing saya makan ikan dengan gembira.' },
      { en: 'She does not like spicy food.', id: 'Dia tidak suka makanan pedas.' }
    ],
    drills: [
      {
        id: 'sd_drill_1',
        type: 'multiple_choice',
        question: 'Rani _____ a glass of milk every morning.',
        options: ['drink', 'drinks', 'drinking', 'drank'],
        answer: 'drinks',
        explanation: 'Rani adalah orang ketiga tunggal (She), sehingga kata kerja "drink" ditambah akhiran -s menjadi "drinks".'
      },
      {
        id: 'sd_drill_2',
        type: 'scramble',
        question: 'Susun kata-kata berikut menjadi kalimat yang benar:',
        words: ['They', 'soccer', 'play', 'in the park', 'every Sunday'],
        correctOrder: ['They', 'play', 'soccer', 'in the park', 'every Sunday'],
        explanation: 'Pola kalimat: Subject (They) + Verb (play) + Object (soccer) + Place (in the park) + Time (every Sunday).'
      },
      {
        id: 'sd_drill_3',
        type: 'error_spotting',
        sentence: 'He do not eat spicy noodles.',
        errorPart: 'do not',
        correction: 'does not',
        explanation: 'Subjek "He" harus menggunakan kata bantu "does not", bukan "do not".'
      }
    ]
  },
  {
    id: 'sd_pronouns_articles',
    level: 'SD',
    category: 'Nouns & Pronouns',
    title: 'Articles (A, An, The) & Subject Pronouns',
    icon: '🍎',
    summary: 'Belajar menggunakan kata sandang A, An, The serta kata ganti I, You, He, She, It, We, They.',
    formula: {
      a: 'A + kata benda berbunyi konsonan (A book, A cat)',
      an: 'An + kata benda berbunyi vokal a, i, u, e, o (An apple, An elephant, An hour)'
    },
    colorFormula: [
      { part: 'A', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
      { part: 'An', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
      { part: 'The', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' }
    ],
    rules: [
      'Gunakan **A** jika huruf pertama kata benda dibaca suara konsonan (b, c, d, f, dsb).',
      'Gunakan **An** jika huruf pertama kata benda dibaca suara vokal (a, i, u, e, o).'
    ],
    examples: [
      { en: 'I see an umbrella on the table.', id: 'Saya melihat sebuah payung di atas meja.' },
      { en: 'He bought a new bicycle.', id: 'Dia membeli sebuah sepeda baru.' }
    ],
    drills: [
      {
        id: 'sd_art_1',
        type: 'multiple_choice',
        question: 'My brother wants to eat _____ orange.',
        options: ['a', 'an', 'the', 'some'],
        answer: 'an',
        explanation: 'Kata "orange" berawalan bunyi vokal /ɔrɪndʒ/, sehingga artikel yang tepat adalah "an".'
      }
    ]
  },

  // ====================== SMP (JUNIOR HIGH) ======================
  {
    id: 'smp_simple_past',
    level: 'SMP',
    category: 'Tenses Lampau',
    title: 'Simple Past Tense (Kejadian di Masa Lampau)',
    icon: '⏳',
    summary: 'Digunakan untuk menyatakan peristiwa yang sudah selesai dan terjadi di masa lalu.',
    formula: {
      positive: 'Subject + Verb 2 + Object + Time Signal',
      negative: 'Subject + did not + Verb 1 + Object',
      interrogative: 'Did + Subject + Verb 1 + Object?'
    },
    colorFormula: [
      { part: 'Subject', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
      { part: 'Verb 2 (Regular: -ed / Irregular)', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
      { part: 'Time Signal (yesterday, last week, 2 days ago)', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' }
    ],
    rules: [
      'Regular verbs mendapatkan akhiran **-ed** (contoh: *watch ➔ watched*, *play ➔ played*).',
      'Irregular verbs berubah bentuk kata secara khusus (contoh: *go ➔ went*, *buy ➔ bought*, *write ➔ wrote*).',
      'Pada kalimat negatif dan tanya, kata kerja kembali ke **Verb 1** karena sudah ada kata bantu **did**.'
    ],
    examples: [
      { en: 'We visited Bali during our school holiday last month.', id: 'Kami mengunjungi Bali saat liburan sekolah bulan lalu.' },
      { en: 'She did not bring her umbrella yesterday.', id: 'Dia tidak membawa payungnya kemarin.' },
      { en: 'Did you finish your English homework last night?', id: 'Apakah kamu menyelesaikan PR bahasa Inggrismu tadi malam?' }
    ],
    drills: [
      {
        id: 'smp_past_1',
        type: 'multiple_choice',
        question: 'Sarah _____ a beautiful letter to her pen pal two days ago.',
        options: ['writes', 'wrote', 'written', 'writing'],
        answer: 'wrote',
        explanation: 'Waktu "two days ago" menunjukkan masa lampau, sehingga digunakan Verb 2 dari write yaitu "wrote".'
      },
      {
        id: 'smp_past_2',
        type: 'error_spotting',
        sentence: 'They did not went to the library yesterday.',
        errorPart: 'went',
        correction: 'go',
        explanation: 'Setelah kata bantu "did not", kata kerja harus kembali ke bentuk pertama (Verb 1), yaitu "go".'
      }
    ]
  },
  {
    id: 'smp_modals_comparison',
    level: 'SMP',
    category: 'Adjectives & Modals',
    title: 'Degrees of Comparison & Modal Verbs',
    icon: '📊',
    summary: 'Membandingkan dua atau lebih benda (Comparative & Superlative) serta penggunaan Can, Must, Should.',
    formula: {
      comparative: 'Adj + -er than / More + Adj + than',
      superlative: 'The + Adj + -est / The most + Adj'
    },
    colorFormula: [
      { part: 'Positive (tall)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
      { part: 'Comparative (taller than / more expensive)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
      { part: 'Superlative (the tallest / the most expensive)', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' }
    ],
    rules: [
      '1 suku kata: tambah **-er / -est** (fast ➔ faster ➔ the fastest).',
      '2+ suku kata: gunakan **more / most** (beautiful ➔ more beautiful ➔ the most beautiful).'
    ],
    examples: [
      { en: 'Mount Everest is the highest mountain in the world.', id: 'Gunung Everest adalah gunung tertinggi di dunia.' },
      { en: 'You should study diligently before the exam.', id: 'Kamu sebaiknya belajar dengan tekun sebelum ujian.' }
    ],
    drills: [
      {
        id: 'smp_comp_1',
        type: 'multiple_choice',
        question: 'This math puzzle is _____ than the one we solved yesterday.',
        options: ['more difficult', 'difficulter', 'most difficult', 'as difficult'],
        answer: 'more difficult',
        explanation: 'Kata sifat "difficult" memiliki 3 suku kata, sehingga bentuk komparatifnya adalah "more difficult than".'
      }
    ]
  },

  // ====================== SMA (SENIOR HIGH) ======================
  {
    id: 'sma_conditionals',
    level: 'SMA',
    category: 'Advanced Syntax',
    title: 'Conditional Sentences (Type 0, 1, 2, 3) & Inversion',
    icon: '🔀',
    summary: 'Kalimat pengandaian faktual, masa depan, hipotesis masa kini, dan penyesalan masa lalu (Sering keluar di UTBK & TOEFL).',
    formula: {
      type1: 'If + Simple Present, S + will + Verb 1 (Kemungkinan nyata)',
      type2: 'If + Simple Past (were), S + would + Verb 1 (Khayalan masa kini)',
      type3: 'If + Past Perfect (had + V3), S + would have + Verb 3 (Penyesalan masa lalu)'
    },
    colorFormula: [
      { part: 'If-Clause Condition', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
      { part: 'Main Clause Result', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
      { part: 'Inverted (Had I known...)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' }
    ],
    rules: [
      'Type 2 menggunakan **were** untuk semua subjek (If I were you...).',
      'Type 3 mengandaikan peristiwa yang berlawanan dengan fakta masa lalu.',
      'Inversion Type 3: Menghilangkan kata *if* dengan membalik *Had + Subject + V3* (contoh: *Had she studied, she would have passed*).'
    ],
    examples: [
      { en: 'If it rains tomorrow, we will postpone the outdoor tournament.', id: 'Jika besok hujan, kami akan menunda turnamen luar ruangan.' },
      { en: 'If I won the national scholarship, I would study astrophysics abroad.', id: 'Seandainya saya memenangkan beasiswa nasional, saya akan kuliah astrofisika di luar negeri.' },
      { en: 'Had they arrived ten minutes earlier, they would have caught the morning train.', id: 'Seandainya mereka tiba sepuluh menit lebih awal, mereka pasti sudah sempat naik kereta pagi.' }
    ],
    drills: [
      {
        id: 'sma_cond_1',
        type: 'multiple_choice',
        question: 'If the laboratory _____ more sophisticated equipment, our research team would achieve better results.',
        options: ['has', 'had', 'have had', 'will have'],
        answer: 'had',
        explanation: 'Ini adalah Conditional Type 2 (khayalan saat ini, main clause menggunakan "would achieve"), sehingga if-clause membutuhkan Simple Past (had).'
      },
      {
        id: 'sma_cond_2',
        type: 'error_spotting',
        sentence: 'If I am you, I would take that prestigious internship offer immediately.',
        errorPart: 'am',
        correction: 'were',
        explanation: 'Dalam Conditional Type 2 untuk bentuk pengandaian tidak nyata, "were" digunakan untuk semua subjek termasuk "I".'
      }
    ]
  },
  {
    id: 'sma_passive_relative',
    level: 'SMA',
    category: 'Complex Grammar',
    title: 'Passive Voice & Relative Clauses (Reduced Clauses)',
    icon: '🧬',
    summary: 'Mengubah fokus kalimat ke objek yang dikenai tindakan dan menyederhanakan anak kalimat (who/which/that).',
    formula: {
      passive: 'Subject + Be (is/am/are/was/were/been) + Verb 3 (+ by Agent)',
      reduced: 'Active ➔ Verb-ing | Passive ➔ Verb-3'
    },
    colorFormula: [
      { part: 'Be + Past Participle (Verb 3)', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
      { part: 'Relative Pronoun (who/whom/whose/which)', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' }
    ],
    rules: [
      'Gunakan kata kerja bentuk ke-3 (Past Participle) setelah to be yang disesuaikan dengan tenses.',
      'Reduced Relative Clause: *The boy who is standing there* ➔ *The boy standing there*.'
    ],
    examples: [
      { en: 'The ancient manuscript was discovered by archeologists in 1923.', id: 'Naskah kuno tersebut ditemukan oleh para arkeolog pada tahun 1923.' },
      { en: 'The students attending the seminar received complimentary certificates.', id: 'Para siswa yang menghadiri seminar menerima sertifikat gratis.' }
    ],
    drills: [
      {
        id: 'sma_pass_1',
        type: 'multiple_choice',
        question: 'The renewable energy proposal _____ by the municipal council next Monday.',
        options: ['will review', 'will be reviewed', 'is reviewed', 'has been reviewed'],
        answer: 'will be reviewed',
        explanation: 'Subjek "proposal" adalah objek pasif yang akan ditinjau di masa depan ("next Monday"), sehingga menggunakan formula Simple Future Passive: "will be + V3" (will be reviewed).'
      }
    ]
  }
];

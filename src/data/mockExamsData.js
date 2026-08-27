// Mock Exams & Quizzes for SD, SMP, SMA

export const MOCK_EXAMS = [
  // ====================== SD EXAM ======================
  {
    id: 'exam_sd_1',
    level: 'SD',
    title: 'Simulasi Ujian Sekolah Dasar Bahasa Inggris',
    category: 'Ujian Sekolah',
    durationMinutes: 10,
    passingScore: 70,
    questions: [
      {
        id: 'q_sd_1',
        text: 'Look at the clock. It shows 07:15 AM. What is the correct English expression?',
        options: [
          'It is a quarter past seven in the morning.',
          'It is a quarter to seven in the evening.',
          'It is half past seven in the morning.',
          'It is seven o’clock sharp.'
        ],
        answerIndex: 0,
        explanation: '07:15 = lewat 15 menit (a quarter past) dari jam 7 (seven) pagi (AM / in the morning).'
      },
      {
        id: 'q_sd_2',
        text: 'What do cows give us to drink?',
        options: ['Orange juice', 'Fresh milk', 'Hot tea', 'Coffee'],
        answerIndex: 1,
        explanation: 'Sapi (cows) menghasilkan susu segar (fresh milk).'
      },
      {
        id: 'q_sd_3',
        text: 'My father’s sister is my _____ .',
        options: ['Uncle', 'Cousin', 'Aunt', 'Grandmother'],
        answerIndex: 2,
        explanation: 'Saudara perempuan dari ayah (father’s sister) adalah bibi/tante (aunt).'
      },
      {
        id: 'q_sd_4',
        text: 'Dono: "_____ do you go to school?"\nBudi: "I go to school by bicycle."',
        options: ['Where', 'How', 'When', 'Why'],
        answerIndex: 1,
        explanation: 'Kata tanya "How" digunakan untuk menanyakan cara atau moda transportasi (by bicycle).'
      },
      {
        id: 'q_sd_5',
        text: 'Which sentence is grammatically correct?',
        options: [
          'She play piano beautifully.',
          'She plays the piano beautifully.',
          'She playing piano beautifully.',
          'She is play piano beautifully.'
        ],
        answerIndex: 1,
        explanation: 'Subjek tunggal "She" pada Simple Present Tense membutuhkan verb berakhiran -s ("plays") dan alat musik memakai artikel "the".'
      }
    ]
  },

  // ====================== SMP EXAM ======================
  {
    id: 'exam_smp_1',
    level: 'SMP',
    title: 'Asesmen Standar Bahasa Inggris SMP',
    category: 'Ujian Tingkat SMP',
    durationMinutes: 15,
    passingScore: 75,
    questions: [
      {
        id: 'q_smp_1',
        text: 'Read the short notice:\n"CAUTION: WET FLOOR. PLEASE WALK CAREFULLY."\nWhere can you most likely find this notice?',
        options: [
          'In a dry desert museum',
          'Near a freshly cleaned hallway in a shopping mall',
          'Inside a dark movie theater during showtime',
          'On top of an airplane roof'
        ],
        answerIndex: 1,
        explanation: 'Peringatan lantai basah (wet floor) umumnya dipasang di lantai koridor yang baru saja dipel/dibersihkan.'
      },
      {
        id: 'q_smp_2',
        text: 'Dina: "I won first place in the storytelling competition yesterday!"\nRama: "_____ ! I am so proud of your hard work."',
        options: [
          'I am so sorry to hear that',
          'Congratulations',
          'Never mind',
          'You should try harder'
        ],
        answerIndex: 1,
        explanation: 'Ucapan "Congratulations!" adalah ungkapan apresiasi dan selamat atas prestasi orang lain.'
      },
      {
        id: 'q_smp_3',
        text: 'While the teacher was explaining the science experiment, the students _____ notes attentively.',
        options: ['are taking', 'were taking', 'have taken', 'take'],
        answerIndex: 1,
        explanation: 'Klausa "While + Past Continuous (was explaining)" yang menunjukkan dua peristiwa bersamaan di masa lampau diikuti oleh Past Continuous "were taking".'
      },
      {
        id: 'q_smp_4',
        text: 'Which of the following sentences expresses an obligation / necessity?',
        options: [
          'You might visit the museum next week.',
          'You must wear your student identity badge during the examination.',
          'You can borrow my pen if you need one.',
          'You would enjoy the school festival.'
        ],
        answerIndex: 1,
        explanation: 'Modal verb "must" menunjukkan kewajiban mutlak (obligation).'
      },
      {
        id: 'q_smp_5',
        text: 'Identify the antonym of the underlined word: "The ancient temple was completely **abandoned**."',
        options: ['Deserted', 'Occupied / Inhabited', 'Forgotten', 'Ruined'],
        answerIndex: 1,
        explanation: '"Abandoned" berarti ditinggalkan/kosong. Lawan katanya (antonym) adalah "Occupied / Inhabited" (dihuni/ditempati).'
      }
    ]
  },

  // ====================== SMA EXAM ======================
  {
    id: 'exam_sma_1',
    level: 'SMA',
    title: 'Simulasi UTBK-SNBT: Literasi Bahasa Inggris & Mock TOEFL',
    category: 'UTBK-SNBT / TOEFL',
    durationMinutes: 20,
    passingScore: 80,
    questions: [
      {
        id: 'q_sma_1',
        text: 'Passage excerpt: "Recent neuroscientific investigations reveal that bilingualism induces neuroplastic adaptations in the prefrontal cortex, enhancing executive cognitive control."\n\nWhat can be inferred from the excerpt regarding bilingual individuals?',
        options: [
          'They struggle with single-language communication.',
          'Their brain structure adapts in ways that improve multitasking and problem-solving abilities.',
          'They invariably lose memory retention after childhood.',
          'They require more sleep than monolingual individuals.'
        ],
        answerIndex: 1,
        explanation: '"Neuroplastic adaptations in the prefrontal cortex enhancing executive cognitive control" mengindikasikan adaptasi otak yang meningkatkan fungsi eksekutif seperti pemecahan masalah dan multitasking.'
      },
      {
        id: 'q_sma_2',
        text: 'Had the government invested earlier in renewable photovoltaic grids, the nation _____ such severe electricity shortfalls during the heatwave.',
        options: [
          'would not suffer',
          'will not suffer',
          'would not have suffered',
          'has not suffered'
        ],
        answerIndex: 2,
        explanation: 'Inverted Conditional Type 3 ("Had S + V3...") membutuhkan main clause berupa "would/could + have + V3" (would not have suffered).'
      },
      {
        id: 'q_sma_3',
        text: 'Choose the word closest in meaning to **"METICULOUS"** in academic writing:',
        options: ['Careless', 'Extremely thorough and precise', 'Rapid and impulsive', 'Ambiguous'],
        answerIndex: 1,
        explanation: '"Meticulous" berarti sangat teliti, cermat, dan berhati-hati (extremely thorough and precise).'
      },
      {
        id: 'q_sma_4',
        text: 'Not only _____ to meet the deadline, but they also exceeded all client expectations.',
        options: [
          'did the developers manage',
          'the developers managed',
          'they managed',
          'have managed developers'
        ],
        answerIndex: 0,
        explanation: 'Negative inversion rule: Kalimat yang diawali "Not only" membutuhkan struktur inversi auxiliary verb sebelum subjek ("did the developers manage").'
      },
      {
        id: 'q_sma_5',
        text: 'The archaeological artifacts _____ during the southern excavation are now preserved in the national museum.',
        options: ['uncovering', 'uncovered', 'were uncovered', 'which uncovered'],
        answerIndex: 1,
        explanation: 'Reduced relative clause pasif: "The artifacts (which were) uncovered during the excavation..." disingkat menjadi bentuk Past Participle "uncovered".'
      }
    ]
  }
];

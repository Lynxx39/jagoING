// Graded Reader Stories with Click-to-Translate & Karaoke Audio Read-Along

export const STORIES_DATA = [
  // ====================== SD STORY ======================
  {
    id: 'story_sd_1',
    level: 'SD',
    title: 'The Clever Mouse Deer and the River',
    genre: 'Fable / Dongeng',
    readTime: '3 min',
    coverEmoji: '🦌',
    sentences: [
      {
        en: "Once upon a time, a clever little mouse deer lived in a lush green forest.",
        id: "Alkisah, seekor kancil yang cerdik tinggal di hutan hijau yang lebat."
      },
      {
        en: "One sunny afternoon, he saw sweet ripe fruits across the wide river.",
        id: "Pada suatu sore yang cerah, ia melihat buah-buahan manis yang matang di seberang sungai yang lebar."
      },
      {
        en: "However, many hungry crocodiles were swimming in the water.",
        id: "Namun, banyak buaya lapar yang sedang berenang di dalam air."
      },
      {
        en: "The mouse deer smiled and said, 'The King wants me to count all the crocodiles in the river!'",
        id: "Kancil tersenyum dan berkata, 'Sang Raja memintaku untuk menghitung semua buaya di sungai!'"
      },
      {
        en: "The crocodiles lined up, and the clever mouse deer hopped across their backs safely.",
        id: "Buaya-buaya berbaris, dan kancil yang cerdik melompat di atas punggung mereka dengan selamat."
      }
    ],
    vocabularyHelp: {
      'clever': 'cerdik / pintar',
      'lush': 'rimbun / lebat',
      'ripe': 'matang',
      'crocodiles': 'buaya-buaya',
      'hopped': 'melompat',
      'safely': 'dengan aman'
    },
    quiz: {
      question: "How did the mouse deer cross the wide river safely?",
      options: [
        "By building a wooden boat",
        "By tricking the crocodiles into making a bridge",
        "By flying with bird wings",
        "By waiting for the river to dry up"
      ],
      answer: "By tricking the crocodiles into making a bridge",
      explanation: "Kancil memperdaya buaya agar berbaris sehingga ia bisa melompat di atas punggung mereka ke seberang."
    }
  },

  // ====================== SMP STORY ======================
  {
    id: 'story_smp_1',
    level: 'SMP',
    title: 'The Secret of the Whispering Lighthouse',
    genre: 'Mystery & Adventure',
    readTime: '4 min',
    coverEmoji: '🗼',
    sentences: [
      {
        en: "During their summer vacation, Maya and Leo explored an abandoned Victorian lighthouse on the rocky cliff.",
        id: "Selama liburan musim panas, Maya dan Leo menjelajahi sebuah mercusuar era Victoria yang terbengkalai di tebing berbatu."
      },
      {
        en: "Local legends claimed that a hidden brass telescope could reveal secret constellations on stormy nights.",
        id: "Legenda setempat mengatakan bahwa teropong kuningan tersembunyi bisa mengungkap rasi bintang rahasia pada malam badai."
      },
      {
        en: "Behind a loose wooden bookshelf, Leo discovered a dusty copper key and a handwritten journal.",
        id: "Di balik rak buku kayu yang longgar, Leo menemukan kunci tembaga berdebu dan sebuah jurnal bertuliskan tangan."
      },
      {
        en: "The journal contained nautical coordinates pointing to an underwater coral sanctuary.",
        id: "Jurnal tersebut berisi koordinat pelayaran yang mengarah ke suaka terumbu karang bawah laut."
      },
      {
        en: "Their curious discovery helped the marine conservation team protect rare sea turtles.",
        id: "Penemuan penuh rasa ingin tahu mereka membantu tim konservasi laut melindungi penyu laut langka."
      }
    ],
    vocabularyHelp: {
      'abandoned': 'terbengkalai / ditinggalkan',
      'constellations': 'rasi bintang',
      'nautical': 'kelautan / pelayaran',
      'sanctuary': 'tempat perlindungan / suaka',
      'conservation': 'konservasi / pelestarian'
    },
    quiz: {
      question: "What significant discovery was found in the old journal?",
      options: [
        "A map to pirate gold coins",
        "Nautical coordinates pointing to a coral sanctuary",
        "A recipe for seafood soup",
        "A blueprint for a new steam locomotive"
      ],
      answer: "Nautical coordinates pointing to a coral sanctuary",
      explanation: "Jurnal tersebut berisi koordinat laut yang mengarah ke lokasi suaka terumbu karang."
    }
  },

  // ====================== SMA STORY ======================
  {
    id: 'story_sma_1',
    level: 'SMA',
    title: 'Echoes of the Future: The Ethics of Cognitive AI',
    genre: 'Science & Philosophy',
    readTime: '5 min',
    coverEmoji: '🤖',
    sentences: [
      {
        en: "As neural networks evolve exponentially, ethical philosophers grapple with the boundaries of artificial consciousness.",
        id: "Seiring jaringan saraf tiruan berevolusi secara eksponensial, para filsuf etika bergulat dengan batasan kesadaran buatan."
      },
      {
        en: "Autonomous algorithms now demonstrate creative synthesis, synthesizing symphony movements and diagnosing complex medical anomalies.",
        id: "Algoritma otonom kini menunjukkan sintesis kreatif, menggubah gerakan simfoni dan mendiagnosis anomali medis yang kompleks."
      },
      {
        en: "Nevertheless, the quintessential essence of human empathy remains an elusive threshold for computational silicon.",
        id: "Kendati demikian, esensi hakiki dari empati manusia tetap menjadi ambang batas yang sulit diraih oleh komputasi silikon."
      },
      {
        en: "Global regulatory frameworks must harmonize technological innovation with humanistic safeguards.",
        id: "Kerangka regulasi global harus menyelaraskan inovasi teknologi dengan perlindungan nilai-nilai kemanusiaan."
      }
    ],
    vocabularyHelp: {
      'exponentially': 'secara eksponensial / berlipat ganda cepat',
      'grapple': 'bergulat / menghadapi tantangan sulit',
      'quintessential': 'esensi utama / hakiki',
      'elusive': 'sulit diraih atau dipahami',
      'harmonize': 'menyelaraskan'
    },
    quiz: {
      question: "According to the essay, what remains uniquely challenging for computational algorithms?",
      options: [
        "Calculating mathematical formulas",
        "The quintessential essence of human empathy",
        "Storing massive datasets in cloud storage",
        "Executing binary code commands"
      ],
      answer: "The quintessential essence of human empathy",
      explanation: "Teks menyatakan bahwa esensi empati manusia adalah ambang batas yang sulit dicapai oleh komputasi mesin."
    }
  }
];

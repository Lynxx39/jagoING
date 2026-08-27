// Listening Lab Data for SD, SMP, SMA

export const LISTENING_DATA = [
  // ====================== SD (ELEMENTARY) ======================
  {
    id: 'sd_list_animals',
    level: 'SD',
    title: 'A Day at the Friendly Zoo',
    speaker: 'Teacher Jenny',
    accent: 'en-US',
    duration: '0:35',
    audioText: "Welcome to the sunny zoo! Look over there. There is a tall giraffe eating green leaves. The little monkeys are jumping and swinging happily. The big elephant is drinking cool water with its long trunk. What a wonderful day to see lovely animals!",
    transcript: "Welcome to the sunny zoo! Look over there. There is a tall giraffe eating green leaves. The little monkeys are jumping and swinging happily. The big elephant is drinking cool water with its long trunk. What a wonderful day to see lovely animals!",
    translation: "Selamat datang di kebun binatang yang cerah! Lihat ke sebelah sana. Ada jerapah tinggi yang sedang makan daun hijau. Monyet-monyet kecil melompat dan berayun dengan gembira. Gajah besar sedang minum air sejuk dengan belalainya yang panjang. Sungguh hari yang menyenangkan untuk melihat hewan-hewan lucu!",
    dictationExercise: {
      prompt: "Ketik kalimat yang kamu dengar:",
      targetSentence: "The little monkeys are jumping happily.",
      audioClip: "The little monkeys are jumping happily."
    },
    questions: [
      {
        id: 'sd_lq_1',
        question: 'What is the tall giraffe eating in the zoo?',
        options: ['Fresh red apples', 'Green leaves', 'Fish and meat', 'Banana slices'],
        answer: 'Green leaves',
        explanation: 'Dalam rekaman dikatakan: "There is a tall giraffe eating green leaves."'
      },
      {
        id: 'sd_lq_2',
        question: 'What is the elephant using to drink cool water?',
        options: ['Its long ears', 'Its big feet', 'Its long trunk', 'Its strong tail'],
        answer: 'Its long trunk',
        explanation: 'Dalam rekaman disebutkan: "...drinking cool water with its long trunk."'
      }
    ]
  },

  // ====================== SMP (JUNIOR HIGH) ======================
  {
    id: 'smp_list_library',
    level: 'SMP',
    title: 'Borrowing Science Books at School Library',
    speaker: 'Librarian & Student (Dialogue)',
    accent: 'en-GB',
    duration: '0:50',
    audioText: "Excuse me, Mrs. Anderson. Could you please help me find the astronomy section? I am working on a school project about the solar system. Yes of course, Alex! The science books are located on shelf number four, just behind the digital catalog computer. You can borrow up to three books for two weeks with your student library card. Thank you very much for your help!",
    transcript: "Alex: Excuse me, Mrs. Anderson. Could you please help me find the astronomy section? I am working on a school project about the solar system.\nMrs. Anderson: Yes of course, Alex! The science books are located on shelf number four, just behind the digital catalog computer. You can borrow up to three books for two weeks with your student library card.\nAlex: Thank you very much for your help!",
    translation: "Alex: Permisi, Ibu Anderson. Bisakah Ibu membantu saya menemukan bagian astronomi? Saya sedang mengerjakan tugas proyek sekolah tentang tata surya.\nIbu Anderson: Ya tentu saja, Alex! Buku-buku sains berada di rak nomor empat, tepat di belakang komputer katalog digital. Kamu bisa meminjam hingga tiga buku selama dua minggu dengan kartu perpustakaan pelajarmu.\nAlex: Terima kasih banyak atas bantuannya!",
    dictationExercise: {
      prompt: "Ketik kalimat yang diucapkan penjaga perpustakaan:",
      targetSentence: "You can borrow up to three books for two weeks.",
      audioClip: "You can borrow up to three books for two weeks."
    },
    questions: [
      {
        id: 'smp_lq_1',
        question: 'What topic is Alex researching for his school project?',
        options: ['Ancient civilizations', 'The solar system', 'Marine biology', 'English poetry'],
        answer: 'The solar system',
        explanation: 'Alex mengatakan: "I am working on a school project about the solar system."'
      },
      {
        id: 'smp_lq_2',
        question: 'Where can Alex find the astronomy science books?',
        options: ['On shelf number four', 'Next to the front entrance', 'In the teacher lounge', 'On the second floor'],
        answer: 'On shelf number four',
        explanation: 'Ibu Anderson menjawab: "The science books are located on shelf number four..."'
      }
    ]
  },

  // ====================== SMA (SENIOR HIGH) ======================
  {
    id: 'sma_list_climate_tech',
    level: 'SMA',
    title: 'Academic Lecture: Artificial Intelligence & Clean Energy',
    speaker: 'Dr. Evelyn Hayes (Professor of Sustainable Tech)',
    accent: 'en-US',
    duration: '1:10',
    audioText: "Good afternoon, scholars. Today we examine the intersection between artificial intelligence and clean energy grids. By deploying machine learning algorithms, power distribution systems can predict electricity consumption surges with unprecedented precision. Consequently, renewable sources such as solar and offshore wind can be integrated seamlessly without causing severe voltage fluctuations. This innovation represents a pivotal milestone toward achieving net-zero carbon emissions by 2040.",
    transcript: "Good afternoon, scholars. Today we examine the intersection between artificial intelligence and clean energy grids. By deploying machine learning algorithms, power distribution systems can predict electricity consumption surges with unprecedented precision. Consequently, renewable sources such as solar and offshore wind can be integrated seamlessly without causing severe voltage fluctuations. This innovation represents a pivotal milestone toward achieving net-zero carbon emissions by 2040.",
    translation: "Selamat siang, para akademisi. Hari ini kita meneliti pertemuan antara kecerdasan buatan dan jaringan energi bersih. Dengan menerapkan algoritma pembelajaran mesin, sistem distribusi daya dapat memprediksi lonjakan konsumsi listrik dengan presisi yang belum pernah ada sebelumnya. Akibatnya, sumber daya terbarukan seperti tenaga surya dan angin lepas pantai dapat diintegrasikan dengan mulus tanpa menyebabkan fluktuasi tegangan yang parah. Inovasi ini merupakan tonggak penting menuju pencapaian emisi karbon nol bersih pada tahun 2040.",
    dictationExercise: {
      prompt: "Dengarkan dan ketik kalimat ilmiah berikut:",
      targetSentence: "Power distribution systems can predict electricity consumption surges with unprecedented precision.",
      audioClip: "Power distribution systems can predict electricity consumption surges with unprecedented precision."
    },
    questions: [
      {
        id: 'sma_lq_1',
        question: 'What is the primary benefit of deploying machine learning algorithms in power distribution?',
        options: [
          'Increasing fossil fuel extraction efficiency',
          'Predicting electricity consumption surges with high precision',
          'Eliminating the need for solar panels',
          'Reducing electric vehicle manufacturing costs'
        ],
        answer: 'Predicting electricity consumption surges with high precision',
        explanation: 'Disebutkan secara eksplisit: "power distribution systems can predict electricity consumption surges with unprecedented precision."'
      },
      {
        id: 'sma_lq_2',
        question: 'By which target year does this innovation aim to support net-zero carbon emissions?',
        options: ['2030', '2035', '2040', '2050'],
        answer: '2040',
        explanation: 'Dinyatakan di akhir kalimat: "...milestone toward achieving net-zero carbon emissions by 2040."'
      }
    ]
  }
];

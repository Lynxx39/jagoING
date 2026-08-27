// Roleplay Scenarios for Interactive AI Chatbot Tutor

export const ROLEPLAY_SCENARIOS = [
  {
    id: 'restaurant',
    title: '🍽️ Ordering at a Gourmet Restaurant',
    level: 'SD / SMP',
    role: 'Friendly Waiter',
    avatar: '👨‍🍳',
    description: 'Latih kemampuan memesan makanan, menanyakan rekomendasi menu, dan meminta tagihan.',
    initialMessage: "Welcome to Riverdale Bistro! Table for one or two? Would you like to see our dinner specials?",
    suggestedStarters: [
      "Table for one, please. Could I see the menu?",
      "What do you recommend for today's special?",
      "Do you have any vegetarian dishes?"
    ]
  },
  {
    id: 'airport',
    title: '✈️ Airport Check-in & Boarding',
    level: 'SMP / SMA',
    role: 'Airlines Check-in Officer',
    avatar: '👩‍✈️',
    description: 'Praktikkan percakapan di bandara internasional: pemeriksaan tiket, paspor, dan pemilihan kursi.',
    initialMessage: "Good day! Welcome to SkyWings Airlines. May I please see your passport and flight booking confirmation?",
    suggestedStarters: [
      "Here is my passport and e-ticket.",
      "Could I have a window seat, please?",
      "How many luggage bags can I check in?"
    ]
  },
  {
    id: 'interview',
    title: '💼 University & Job Interview',
    level: 'SMA',
    role: 'Senior Admissions Interviewer',
    avatar: '👔',
    description: 'Latihan wawancara beasiswa dan seleksi kerja dalam bahasa Inggris formal yang profesional.',
    initialMessage: "Welcome to our interview session. Thank you for joining us today. To start off, could you briefly introduce yourself and your aspirations?",
    suggestedStarters: [
      "Hello! I am excited to introduce my background in technology and language learning.",
      "My greatest strength is analytical problem solving and team collaboration.",
      "In five years, I aim to lead impactful community innovation projects."
    ]
  },
  {
    id: 'school',
    title: '🏫 First Day of International School',
    level: 'SD / SMP',
    role: 'Classmate Emma',
    avatar: '🎒',
    description: 'Perkenalan kasual dengan teman sekelas baru, membicarakan hobi, dan pelajaran favorit.',
    initialMessage: "Hi there! I'm Emma. Is this your first day at the academy? Which club are you planning to join?",
    suggestedStarters: [
      "Nice to meet you Emma! I am interested in joining the robotics and English clubs.",
      "Yes, it's my first day. What is your favorite subject here?",
      "Do you want to eat lunch together at the cafeteria?"
    ]
  }
];

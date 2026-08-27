// AI Tutor & Natural Grammar Analysis Engine
// Supports both high-speed offline NLP rules and live Gemini/OpenAI API integration

const COMMON_MISTAKES = [
  {
    pattern: /\bi am agree\b/gi,
    replacement: "I agree",
    rule: "Dalam Bahasa Inggris, 'agree' adalah kata kerja (verb), bukan adjective. Jangan gunakan 'am agree'.",
    severity: "error"
  },
  {
    pattern: /\bthanks god\b/gi,
    replacement: "Thank God",
    rule: "Gunakan 'Thank God' (tanpa s) untuk ungkapan syukur, atau 'Thanks to God'.",
    severity: "warning"
  },
  {
    pattern: /\bjoin with us\b/gi,
    replacement: "join us",
    rule: "Kata kerja 'join' adalah transitive verb, langsung diikuti objek tanpa preposisi 'with'.",
    severity: "warning"
  },
  {
    pattern: /\bhe don't\b/gi,
    replacement: "he doesn't",
    rule: "Subjek tunggal (He/She/It) menggunakan 'doesn't' (does not), bukan 'don't'.",
    severity: "error"
  },
  {
    pattern: /\bshe don't\b/gi,
    replacement: "she doesn't",
    rule: "Subjek tunggal (He/She/It) menggunakan 'doesn't', bukan 'don't'.",
    severity: "error"
  },
  {
    pattern: /\bit don't\b/gi,
    replacement: "it doesn't",
    rule: "Subjek 'It' menggunakan 'doesn't', bukan 'don't'.",
    severity: "error"
  },
  {
    pattern: /\bi have ever\b/gi,
    replacement: "I have / I have already",
    rule: "'Ever' umumnya digunakan dalam kalimat tanya (Have you ever...?) bukan kalimat positif (I have already visited...).",
    severity: "info"
  },
  {
    pattern: /\bopen the lamp\b/gi,
    replacement: "turn on the lamp / turn on the light",
    rule: "Untuk perangkat elektronik, gunakan 'turn on' / 'switch on', bukan 'open'.",
    severity: "warning"
  },
  {
    pattern: /\bclose the lamp\b/gi,
    replacement: "turn off the lamp / turn off the light",
    rule: "Untuk perangkat elektronik, gunakan 'turn off' / 'switch off', bukan 'close'.",
    severity: "warning"
  },
  {
    pattern: /\byesterday night\b/gi,
    replacement: "last night",
    rule: "Ungkapan yang benar untuk semalam adalah 'last night', bukan 'yesterday night'.",
    severity: "warning"
  },
  {
    pattern: /\bmore better\b/gi,
    replacement: "better",
    rule: "'Better' sudah merupakan bentuk komparatif dari 'good'. Jangan dobel 'more better'.",
    severity: "error"
  },
  {
    pattern: /\bdiscuss about\b/gi,
    replacement: "discuss",
    rule: "'Discuss' artinya sudah 'membicarakan tentang', jadi tidak perlu ditambah 'about'.",
    severity: "warning"
  },
  {
    pattern: /\bborrow to me\b/gi,
    replacement: "lend to me / lend me",
    rule: "'Borrow' = meminjam (dari seseorang). 'Lend' = meminjamkan (ke seseorang).",
    severity: "warning"
  }
];

export function analyzeGrammar(text) {
  if (!text || text.trim() === '') {
    return {
      errors: [],
      score: 100,
      readability: 'A1 - Beginner',
      wordCount: 0,
      sentenceCount: 0,
      correctedText: '',
      tips: []
    };
  }

  const errors = [];
  let correctedText = text;

  COMMON_MISTAKES.forEach(mistake => {
    const matches = [...text.matchAll(mistake.pattern)];
    if (matches.length > 0) {
      matches.forEach(m => {
        errors.push({
          original: m[0],
          replacement: mistake.replacement,
          rule: mistake.rule,
          severity: mistake.severity,
          index: m.index
        });
      });
      correctedText = correctedText.replace(mistake.pattern, mistake.replacement);
    }
  });

  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const avgWordLength = words.reduce((acc, w) => acc + w.length, 0) / (wordCount || 1);
  const sentenceCount = (text.match(/[.!?]+/g) || []).length || 1;
  const avgSentenceLength = wordCount / sentenceCount;

  let readability = 'A1 - Elementary';
  if (avgSentenceLength > 15 || avgWordLength > 6) {
    readability = 'C1 - Advanced Academic';
  } else if (avgSentenceLength > 10 || avgWordLength > 5.2) {
    readability = 'B2 - Upper Intermediate';
  } else if (avgSentenceLength > 7 || avgWordLength > 4.5) {
    readability = 'B1 - Intermediate';
  } else if (avgSentenceLength > 4) {
    readability = 'A2 - Pre-Intermediate';
  }

  const score = Math.max(0, 100 - (errors.length * 15));

  const tips = [];
  if (errors.length === 0 && wordCount > 5) {
    tips.push("Tata bahasa sangat baik! Struktur kalimat Anda terdengar natural.");
  }
  if (avgSentenceLength < 5 && wordCount > 10) {
    tips.push("Coba variasikan kalimat pendek dengan kata hubung seperti 'although', 'furthermore', atau 'whereas'.");
  }

  return {
    errors,
    score,
    readability,
    wordCount,
    sentenceCount,
    correctedText,
    tips
  };
}

// Live Cloud AI Call (Google Gemini API)
export async function callGeminiAI(apiKey, prompt, systemInstruction = "") {
  if (!apiKey) throw new Error("API Key Gemini belum disetel.");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${systemInstruction ? `[SYSTEM INSTRUCTION: ${systemInstruction}]\n\n` : ""}${prompt}` }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error?.message || "Gagal memanggil Google Gemini API");
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf, respon AI kosong.";
}

// Interactive Roleplay Response Engine
export function generateRoleplayReply(scenarioId, userMessage, history = []) {
  const cleanMsg = userMessage.toLowerCase().trim();
  const grammarCheck = analyzeGrammar(userMessage);

  let botReply = "";
  let suggestion = "";
  let xpEarned = 15;

  if (scenarioId === 'restaurant') {
    if (cleanMsg.includes('menu') || cleanMsg.includes('see')) {
      botReply = "Certainly! Here is our special menu. Today our Chef recommends the Grilled Salmon and Garlic Pasta. Would you like a beverage to start with?";
      suggestion = "You can say: 'I would like a glass of iced lemon tea, please.'";
    } else if (cleanMsg.includes('order') || cleanMsg.includes('want') || cleanMsg.includes('like') || cleanMsg.includes('pasta') || cleanMsg.includes('salmon') || cleanMsg.includes('burger')) {
      botReply = "Excellent choice! How would you like that prepared, and would you care for any dessert or side dish with it?";
      suggestion = "You can say: 'No dessert for now, just the main course, thanks.'";
    } else if (cleanMsg.includes('bill') || cleanMsg.includes('check') || cleanMsg.includes('pay')) {
      botReply = "Here is your check, sir/madam. That will be $24.50. Will you be paying with cash or credit card?";
      suggestion = "You can say: 'I will pay with card. Keep the change!'";
    } else {
      botReply = "Welcome to Riverdale Bistro! Table for one or two? What can I get started for you today?";
      suggestion = "You can say: 'Table for one please. Could I see the lunch menu?'";
    }
  } else if (scenarioId === 'airport') {
    if (cleanMsg.includes('passport') || cleanMsg.includes('ticket') || cleanMsg.includes('here')) {
      botReply = "Thank you! I see your booking to London. Do you have any check-in luggage, or just carry-on baggage?";
      suggestion = "You can say: 'I have one suitcase to check in and one backpack.'";
    } else if (cleanMsg.includes('bag') || cleanMsg.includes('luggage') || cleanMsg.includes('suitcase') || cleanMsg.includes('carry')) {
      botReply = "Please place your bags on the scale. Would you prefer an aisle seat or a window seat on the flight?";
      suggestion = "You can say: 'A window seat would be wonderful!'";
    } else {
      botReply = "Good day! Welcome to SkyWings Airlines check-in desk. May I please have your passport and booking reference code?";
      suggestion = "You can say: 'Here is my passport and e-ticket confirmation.'";
    }
  } else if (scenarioId === 'interview') {
    if (cleanMsg.includes('name') || cleanMsg.includes('graduate') || cleanMsg.includes('student') || cleanMsg.includes('experience')) {
      botReply = "That sounds impressive! What would you say is your greatest strength, and how do you handle tight deadlines under pressure?";
      suggestion = "You can say: 'My greatest strength is problem-solving and staying calm during team challenges.'";
    } else if (cleanMsg.includes('strength') || cleanMsg.includes('pressure') || cleanMsg.includes('deadline') || cleanMsg.includes('work')) {
      botReply = "Very well said. Where do you see yourself in the next five years if you join our company?";
      suggestion = "You can say: 'I see myself leading innovative projects and mentoring junior teammates.'";
    } else {
      botReply = "Welcome to your interview! Thank you for taking the time today. Could you tell me a little bit about yourself and your background?";
      suggestion = "You can say: 'Hello! I am a passionate student enthusiastic about English communication and technology.'";
    }
  } else {
    if (cleanMsg.includes('hello') || cleanMsg.includes('hi')) {
      botReply = "Hello there! It is great to practice English with you today. What topic would you like to explore together?";
      suggestion = "You can say: 'Let\\'s talk about daily hobbies and school activities!'";
    } else if (cleanMsg.includes('hobby') || cleanMsg.includes('game') || cleanMsg.includes('music') || cleanMsg.includes('read') || cleanMsg.includes('sport')) {
      botReply = "That sounds fascinating! How long have you been interested in that, and what do you enjoy most about it?";
      suggestion = "You can say: 'I have been doing it for two years because it helps me relax.'";
    } else {
      botReply = `That is very interesting! Could you tell me more about what you mean by "${userMessage.slice(0, 30)}..."?`;
      suggestion = "Try to explain your thoughts with an example!";
    }
  }

  return {
    botReply,
    grammarFeedback: grammarCheck.errors.length > 0 ? {
      hasErrors: true,
      errors: grammarCheck.errors,
      improvedSentence: grammarCheck.correctedText
    } : null,
    suggestion,
    xpEarned
  };
}

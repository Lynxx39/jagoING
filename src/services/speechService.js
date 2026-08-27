// Web Speech API Service (Text-To-Speech & Speech-To-Text Recognition)

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.selectedVoice = null;
    this.recognition = null;
    this.isListening = false;
    this.rate = 1.0;
    this.pitch = 1.0;

    if (this.synth) {
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    // Default to US or UK English voice
    const englishVoice = this.voices.find(v => v.lang === 'en-US') ||
                         this.voices.find(v => v.lang === 'en-GB') ||
                         this.voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) {
      this.selectedVoice = englishVoice;
    }
  }

  speak(text, options = {}) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    this.synth.cancel();

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || this.rate;
    utterance.pitch = options.pitch || this.pitch;
    utterance.lang = options.lang || 'en-US';

    if (options.voice) {
      const match = this.voices.find(v => v.name === options.voice);
      if (match) utterance.voice = match;
    } else if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onBoundary) utterance.onboundary = options.onBoundary;
    if (options.onError) utterance.onerror = options.onError;

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // Speech Recognition (Speech-to-Text)
  initRecognition(onResult, onError, onEnd) {
    if (typeof window === 'undefined') return null;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported in this browser.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (onResult) {
        onResult({
          final: finalTranscript.trim(),
          interim: interimTranscript.trim(),
          isFinal: finalTranscript.length > 0
        });
      }
    };

    recognition.onerror = (event) => {
      if (onError) onError(event.error);
    };

    recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    this.recognition = recognition;
    return recognition;
  }

  startListening(onResult, onError, onEnd) {
    const rec = this.initRecognition(onResult, onError, onEnd);
    if (!rec) return false;

    try {
      rec.start();
      this.isListening = true;
      return true;
    } catch (e) {
      console.error('Error starting speech recognition:', e);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.error(e);
      }
      this.isListening = false;
    }
  }
}

export const speechService = new SpeechService();

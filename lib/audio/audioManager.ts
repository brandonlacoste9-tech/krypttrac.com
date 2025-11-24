// Audio Manager for Krypto Kings Voice Announcements
// Uses Web Speech API (Text-to-Speech)

const STORAGE_KEY = 'kk-audio-settings';

interface AudioSettings {
  enabled: boolean;
  volume: number; // 0-1 scale
}

const defaultSettings: AudioSettings = {
  enabled: true,
  volume: 0.8,
};

// Voice announcement presets - Street Kings Edition
export const announcements = {
  appOpen: "Yooo FAAM, let's get this bread!",
  portfolioUp10: "Your bag is moonin', King!",
  portfolioUp20: "We stackin' W's today! Let's GO!",
  newATH: "New peak unlocked! Crown secured!",
  priceAlert: (coin: string, price: string) => `Heads up King! ${coin} just hit $${price}!`,
  welcome: "Welcome back King, your bag awaits!",
  signIn: "King's in the building! Let's work!",
  signOut: "Peace out King, secure the bag!",
  bigWin: "That's a FAT W right there!",
  error: "Hold up, something ain't right.",
  // Theme activation lines
  themeGoldenChild: "Golden Child activated! Now you're shinin', King!",
  themePlatinumSuite: "Platinum Suite unlocked! Chrome everything, baby!",
  themeChange: "New drip, new vibe! Let's get it!",
  themeLockedGold: "That's Gold King exclusive, fam. Level up!",
  themeLockedPlatinum: "Platinum status required. You know what to do, King!",
};

// Check browser support
export function isSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

// Get settings from localStorage
export function getSettings(): AudioSettings {
  if (typeof window === 'undefined') return defaultSettings;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load audio settings:', e);
  }
  return defaultSettings;
}

// Save settings to localStorage
function saveSettings(settings: AudioSettings): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save audio settings:', e);
  }
}

// Set volume (0-1 scale)
export function setVolume(volume: number): void {
  const settings = getSettings();
  settings.volume = Math.max(0, Math.min(1, volume));
  saveSettings(settings);
}

// Toggle audio on/off
export function toggleAudio(enabled: boolean): void {
  const settings = getSettings();
  settings.enabled = enabled;
  saveSettings(settings);
}

// Get a deep, confident male voice
function getPreferredVoice(): SpeechSynthesisVoice | null {
  if (!isSupported()) return null;

  const voices = window.speechSynthesis.getVoices();

  // Preferred voice names (male, deep, confident)
  const preferredNames = [
    'Google UK English Male',
    'Microsoft David',
    'Microsoft Mark',
    'Daniel',
    'Alex',
    'Google US English',
    'Samantha', // fallback
  ];

  // Try to find a preferred voice
  for (const name of preferredNames) {
    const voice = voices.find(v => v.name.includes(name));
    if (voice) return voice;
  }

  // Fallback to first English male voice
  const englishMale = voices.find(v =>
    v.lang.startsWith('en') && v.name.toLowerCase().includes('male')
  );
  if (englishMale) return englishMale;

  // Fallback to first English voice
  const english = voices.find(v => v.lang.startsWith('en'));
  if (english) return english;

  // Last resort: first available voice
  return voices[0] || null;
}

// Main speak function
export async function speak(text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isSupported()) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }

    const settings = getSettings();

    if (!settings.enabled) {
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Configure voice settings for hype, confident delivery
    utterance.volume = settings.volume;
    utterance.rate = 1.0; // Normal speed
    utterance.pitch = 0.9; // Slightly deeper

    // Set preferred voice (may need to wait for voices to load)
    const setVoice = () => {
      const voice = getPreferredVoice();
      if (voice) {
        utterance.voice = voice;
      }
    };

    // Voices might not be loaded immediately
    if (window.speechSynthesis.getVoices().length > 0) {
      setVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (event) => {
      console.warn('Speech error:', event.error);
      resolve(); // Resolve anyway to not block the app
    };

    window.speechSynthesis.speak(utterance);
  });
}

// Convenience functions for specific announcements
export async function announceAppOpen(): Promise<void> {
  return speak(announcements.appOpen);
}

export async function announcePortfolioGain(percentGain: number): Promise<void> {
  if (percentGain >= 20) {
    return speak(announcements.portfolioUp20);
  } else if (percentGain >= 10) {
    return speak(announcements.portfolioUp10);
  }
}

export async function announceNewATH(): Promise<void> {
  return speak(announcements.newATH);
}

export async function announcePriceAlert(coin: string, price: string): Promise<void> {
  return speak(announcements.priceAlert(coin, price));
}

export async function announceWelcome(): Promise<void> {
  return speak(announcements.welcome);
}

// Initialize - preload voices
export function initAudio(): void {
  if (!isSupported()) return;

  // Trigger voice loading
  window.speechSynthesis.getVoices();

  // Some browsers need this event
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

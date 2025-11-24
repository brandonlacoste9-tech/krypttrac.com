// Haptic Feedback Manager for Krypto Kings
// Uses Navigator.vibrate() API

const STORAGE_KEY = 'kk-haptic-settings';

export type IntensityLevel = 'subtle' | 'medium' | 'strong';

interface HapticSettings {
  enabled: boolean;
  intensity: IntensityLevel;
}

const defaultSettings: HapticSettings = {
  enabled: true,
  intensity: 'medium',
};

// Vibration patterns by event and intensity (in milliseconds)
const patterns = {
  appOpen: {
    subtle: [50, 30, 100],
    medium: [100, 50, 150],
    strong: [150, 75, 200],
  },
  smallWin: {
    // +5-10%
    subtle: [30, 20, 30],
    medium: [50, 30, 50],
    strong: [75, 50, 75],
  },
  bigWin: {
    // +10-20%
    subtle: [50, 30, 50, 30, 100],
    medium: [100, 50, 100, 50, 150],
    strong: [150, 75, 150, 75, 200],
  },
  hugeWin: {
    // +20%+
    subtle: [100, 50, 100, 50, 100],
    medium: [150, 75, 150, 75, 150],
    strong: [200, 100, 200, 100, 200],
  },
  newATH: {
    subtle: [150, 100, 150, 100, 150],
    medium: [200, 150, 200, 150, 200],
    strong: [300, 200, 300, 200, 300],
  },
  tap: {
    // Quick feedback for button taps
    subtle: [10],
    medium: [20],
    strong: [30],
  },
  success: {
    subtle: [30, 30, 50],
    medium: [50, 50, 100],
    strong: [75, 75, 150],
  },
  error: {
    subtle: [50, 50, 50, 50],
    medium: [100, 100, 100, 100],
    strong: [150, 150, 150, 150],
  },
};

// Check browser and device support
export function isSupported(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof navigator === 'undefined') return false;
  return 'vibrate' in navigator;
}

// Check if likely a mobile device
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof navigator === 'undefined') return false;

  // Check for touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check user agent for mobile keywords
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'mobile', 'tablet'];
  const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));

  return hasTouch && isMobileUA;
}

// Get settings from localStorage
export function getSettings(): HapticSettings {
  if (typeof window === 'undefined') return defaultSettings;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to load haptic settings:', e);
  }
  return defaultSettings;
}

// Save settings to localStorage
function saveSettings(settings: HapticSettings): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Failed to save haptic settings:', e);
  }
}

// Set intensity level
export function setIntensity(level: IntensityLevel): void {
  const settings = getSettings();
  settings.intensity = level;
  saveSettings(settings);
}

// Toggle haptics on/off
export function toggleHaptics(enabled: boolean): void {
  const settings = getSettings();
  settings.enabled = enabled;
  saveSettings(settings);
}

// Core vibrate function
export function vibrate(pattern: number[]): boolean {
  if (!isSupported()) return false;

  const settings = getSettings();
  if (!settings.enabled) return false;

  try {
    return navigator.vibrate(pattern);
  } catch (e) {
    console.warn('Vibration failed:', e);
    return false;
  }
}

// Stop any ongoing vibration
export function stopVibration(): void {
  if (!isSupported()) return;

  try {
    navigator.vibrate(0);
  } catch (e) {
    console.warn('Stop vibration failed:', e);
  }
}

// Get pattern for current intensity
function getPattern(eventType: keyof typeof patterns): number[] {
  const settings = getSettings();
  return patterns[eventType][settings.intensity];
}

// Convenience functions for specific events
export function vibrateAppOpen(): boolean {
  return vibrate(getPattern('appOpen'));
}

export function vibrateSmallWin(): boolean {
  return vibrate(getPattern('smallWin'));
}

export function vibrateBigWin(): boolean {
  return vibrate(getPattern('bigWin'));
}

export function vibrateHugeWin(): boolean {
  return vibrate(getPattern('hugeWin'));
}

export function vibrateNewATH(): boolean {
  return vibrate(getPattern('newATH'));
}

export function vibrateTap(): boolean {
  return vibrate(getPattern('tap'));
}

export function vibrateSuccess(): boolean {
  return vibrate(getPattern('success'));
}

export function vibrateError(): boolean {
  return vibrate(getPattern('error'));
}

// Vibrate based on portfolio gain percentage
export function vibrateForGain(percentGain: number): boolean {
  if (percentGain >= 20) {
    return vibrateHugeWin();
  } else if (percentGain >= 10) {
    return vibrateBigWin();
  } else if (percentGain >= 5) {
    return vibrateSmallWin();
  }
  return false;
}

// Test vibration with current intensity
export function testVibration(): boolean {
  const settings = getSettings();
  // Use bigWin pattern for testing - feels satisfying
  const pattern = patterns.bigWin[settings.intensity];

  if (!isSupported()) return false;

  try {
    return navigator.vibrate(pattern);
  } catch (e) {
    console.warn('Test vibration failed:', e);
    return false;
  }
}

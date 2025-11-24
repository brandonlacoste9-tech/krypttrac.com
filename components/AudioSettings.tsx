'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, Vibrate, Smartphone } from 'lucide-react';
import {
  isSupported as isAudioSupported,
  getSettings as getAudioSettings,
  setVolume,
  toggleAudio,
  speak,
  announcements,
} from '@/lib/audio/audioManager';
import {
  isSupported as isHapticSupported,
  isMobileDevice,
  getSettings as getHapticSettings,
  toggleHaptics,
  setIntensity,
  testVibration,
  IntensityLevel,
} from '@/lib/haptics/hapticManager';
import { useThemeStore } from '@/lib/themeStore';

interface AudioSettingsProps {
  compact?: boolean;
}

export default function AudioSettings({ compact = false }: AudioSettingsProps) {
  // Audio state
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [volume, setVolumeState] = useState(80);
  const [audioSupported, setAudioSupported] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Haptic state
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [intensity, setIntensityState] = useState<IntensityLevel>('medium');
  const [hapticSupported, setHapticSupported] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTestingHaptic, setIsTestingHaptic] = useState(false);

  const { theme } = useThemeStore();

  // Load settings on mount
  useEffect(() => {
    // Audio
    setAudioSupported(isAudioSupported());
    const audioSettings = getAudioSettings();
    setAudioEnabled(audioSettings.enabled);
    setVolumeState(Math.round(audioSettings.volume * 100));

    // Haptic
    setHapticSupported(isHapticSupported());
    setIsMobile(isMobileDevice());
    const hapticSettings = getHapticSettings();
    setHapticEnabled(hapticSettings.enabled);
    setIntensityState(hapticSettings.intensity);
  }, []);

  // Audio handlers
  const handleAudioToggle = () => {
    const newEnabled = !audioEnabled;
    setAudioEnabled(newEnabled);
    toggleAudio(newEnabled);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolumeState(newVolume);
    setVolume(newVolume / 100);
  };

  const handleTestAudio = async () => {
    if (isTesting) return;
    setIsTesting(true);

    const wasEnabled = audioEnabled;
    if (!wasEnabled) toggleAudio(true);

    await speak(announcements.appOpen);

    if (!wasEnabled) toggleAudio(false);
    setIsTesting(false);
  };

  // Haptic handlers
  const handleHapticToggle = () => {
    const newEnabled = !hapticEnabled;
    setHapticEnabled(newEnabled);
    toggleHaptics(newEnabled);
  };

  const handleIntensityChange = (level: IntensityLevel) => {
    setIntensityState(level);
    setIntensity(level);
  };

  const handleTestHaptic = () => {
    if (isTestingHaptic) return;
    setIsTestingHaptic(true);

    const wasEnabled = hapticEnabled;
    if (!wasEnabled) toggleHaptics(true);

    testVibration();

    if (!wasEnabled) toggleHaptics(false);

    setTimeout(() => setIsTestingHaptic(false), 500);
  };

  // Compact mode for dropdown
  if (compact) {
    return (
      <div className="space-y-2 px-3 py-2">
        {/* Audio row */}
        {audioSupported && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleAudioToggle}
              className={`p-2 rounded-lg transition-all duration-200 ${
                audioEnabled ? 'bg-white/10' : 'bg-white/5'
              }`}
              title={audioEnabled ? 'Disable voice' : 'Enable voice'}
            >
              {audioEnabled ? (
                <Volume2 size={16} style={{ color: theme.accent }} />
              ) : (
                <VolumeX size={16} className="text-gray-500" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              disabled={!audioEnabled}
              className="flex-1 h-1 rounded-full appearance-none cursor-pointer disabled:opacity-50"
              style={{
                background: audioEnabled
                  ? `linear-gradient(to right, ${theme.accent} ${volume}%, rgba(255,255,255,0.1) ${volume}%)`
                  : 'rgba(255,255,255,0.1)',
              }}
            />

            <span className="text-xs text-gray-400 w-8">{volume}%</span>
          </div>
        )}

        {/* Haptic row - only on mobile */}
        {hapticSupported && isMobile && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleHapticToggle}
              className={`p-2 rounded-lg transition-all duration-200 ${
                hapticEnabled ? 'bg-white/10' : 'bg-white/5'
              }`}
              title={hapticEnabled ? 'Disable haptics' : 'Enable haptics'}
            >
              <Vibrate
                size={16}
                style={{ color: hapticEnabled ? theme.accent : '#6b7280' }}
              />
            </button>

            <div className="flex-1 flex gap-1">
              {(['subtle', 'medium', 'strong'] as IntensityLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => handleIntensityChange(level)}
                  disabled={!hapticEnabled}
                  className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-all duration-200 disabled:opacity-50 ${
                    intensity === level
                      ? ''
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                  style={
                    intensity === level
                      ? { background: `${theme.accent}30`, color: theme.accent }
                      : {}
                  }
                >
                  {level.charAt(0).toUpperCase() + level.slice(1, 3)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full settings panel
  return (
    <div
      className="rounded-xl p-4 space-y-6"
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Voice Settings */}
      {audioSupported && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Mic size={18} style={{ color: theme.accent }} />
            <h3 className="font-semibold text-white">Voice Settings</h3>
          </div>

          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-300">Voice Announcements</span>
            <button
              onClick={handleAudioToggle}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                audioEnabled ? '' : 'bg-gray-700'
              }`}
              style={{ background: audioEnabled ? theme.accent : undefined }}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
                  audioEnabled ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Volume</span>
              <span className="text-sm font-medium" style={{ color: theme.accent }}>
                {volume}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <VolumeX size={16} className="text-gray-500" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                disabled={!audioEnabled}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer disabled:opacity-50"
                style={{
                  background: audioEnabled
                    ? `linear-gradient(to right, ${theme.accent} ${volume}%, rgba(255,255,255,0.1) ${volume}%)`
                    : 'rgba(255,255,255,0.1)',
                }}
              />
              <Volume2 size={16} style={{ color: audioEnabled ? theme.accent : '#6b7280' }} />
            </div>
          </div>

          {/* Test Button */}
          <button
            onClick={handleTestAudio}
            disabled={isTesting}
            className="w-full py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: `${theme.accent}20`,
              color: theme.accent,
              border: `1px solid ${theme.accent}40`,
            }}
          >
            {isTesting ? 'Speaking...' : 'Test Voice'}
          </button>
        </div>
      )}

      {/* Haptic Settings - only show on mobile */}
      {hapticSupported && isMobile && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Vibrate size={18} style={{ color: theme.accent }} />
            <h3 className="font-semibold text-white">Haptic Feedback</h3>
            <span className="text-xs text-gray-500 ml-auto flex items-center gap-1">
              <Smartphone size={12} />
              Mobile only
            </span>
          </div>

          {/* Enable/Disable Toggle */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-300">Vibration Feedback</span>
            <button
              onClick={handleHapticToggle}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                hapticEnabled ? '' : 'bg-gray-700'
              }`}
              style={{ background: hapticEnabled ? theme.accent : undefined }}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
                  hapticEnabled ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>

          {/* Intensity Selector */}
          <div className="mb-4">
            <span className="text-sm text-gray-300 block mb-2">Intensity</span>
            <div className="grid grid-cols-3 gap-2">
              {(['subtle', 'medium', 'strong'] as IntensityLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => handleIntensityChange(level)}
                  disabled={!hapticEnabled}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-50 ${
                    intensity === level
                      ? ''
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                  style={
                    intensity === level
                      ? {
                          background: `${theme.accent}30`,
                          color: theme.accent,
                          border: `1px solid ${theme.accent}`,
                        }
                      : { border: '1px solid transparent' }
                  }
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Test Button */}
          <button
            onClick={handleTestHaptic}
            disabled={isTestingHaptic || !hapticEnabled}
            className="w-full py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: `${theme.accent}20`,
              color: theme.accent,
              border: `1px solid ${theme.accent}40`,
            }}
          >
            {isTestingHaptic ? 'Vibrating...' : 'Test Haptics'}
          </button>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        {audioSupported && hapticSupported && isMobile
          ? 'Voice uses browser speech synthesis. Haptics require mobile device.'
          : audioSupported
          ? 'Voice uses your browser\'s speech synthesis'
          : 'Audio features not supported in this browser'}
      </p>
    </div>
  );
}

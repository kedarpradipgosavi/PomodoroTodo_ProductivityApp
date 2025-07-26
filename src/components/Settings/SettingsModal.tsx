/**
 * Settings modal for customizing app preferences
 */

import React from 'react';
import { X, Volume2, VolumeX, Palette, Clock, Zap } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { themes, ThemeKey } from '../../styles/themes';

export function SettingsModal() {
  const { showSettingsModal, hideSettings, settings, updateSettings } = useAppContext();

  if (!showSettingsModal) return null;

  const handleThemeChange = (theme: ThemeKey) => {
    updateSettings({ theme });
  };

  const handleWorkDurationChange = (duration: number) => {
    updateSettings({ workDuration: Math.max(1, Math.min(60, duration)) });
  };

  const handleBreakDurationChange = (duration: number) => {
    updateSettings({ breakDuration: Math.max(1, Math.min(30, duration)) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-screen overflow-y-auto scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-lg mr-3">
              <Palette className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Settings</h2>
              <p className="text-sm text-gray-600">Customize your Pomodoro experience</p>
            </div>
          </div>
          <button
            onClick={hideSettings}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus-ring"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Timer Settings */}
          <div>
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Timer Settings</h3>
            </div>

            <div className="space-y-4">
              {/* Work Duration */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Work Duration</label>
                  <p className="text-xs text-gray-500">Focus session length in minutes</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleWorkDurationChange(settings.workDuration - 5)}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded focus-ring"
                  >
                    <span className="w-4 h-4 flex items-center justify-center font-bold">−</span>
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={settings.workDuration}
                    onChange={(e) => handleWorkDurationChange(parseInt(e.target.value) || 25)}
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <button
                    onClick={() => handleWorkDurationChange(settings.workDuration + 5)}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded focus-ring"
                  >
                    <span className="w-4 h-4 flex items-center justify-center font-bold">+</span>
                  </button>
                </div>
              </div>

              {/* Break Duration */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Break Duration</label>
                  <p className="text-xs text-gray-500">Rest period length in minutes</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBreakDurationChange(settings.breakDuration - 1)}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded focus-ring"
                  >
                    <span className="w-4 h-4 flex items-center justify-center font-bold">−</span>
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={settings.breakDuration}
                    onChange={(e) => handleBreakDurationChange(parseInt(e.target.value) || 5)}
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    onClick={() => handleBreakDurationChange(settings.breakDuration + 1)}
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded focus-ring"
                  >
                    <span className="w-4 h-4 flex items-center justify-center font-bold">+</span>
                  </button>
                </div>
              </div>

              {/* Auto Start Break */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">Auto-start breaks</label>
                  <p className="text-xs text-gray-500">Automatically begin break timer</p>
                </div>
                <button
                  onClick={() => updateSettings({ autoStartBreak: !settings.autoStartBreak })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-ring ${
                    settings.autoStartBreak ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoStartBreak ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Audio Settings */}
          <div>
            <div className="flex items-center mb-4">
              <Volume2 className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Audio</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Sound notifications</label>
                <p className="text-xs text-gray-500">Play sounds when timer ends</p>
              </div>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`p-2 rounded-lg transition-colors focus-ring ${
                  settings.soundEnabled 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {settings.soundEnabled ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Theme Settings */}
          <div>
            <div className="flex items-center mb-4">
              <Palette className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key as ThemeKey)}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover-lift ${
                    settings.theme === key 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div 
                      className="w-6 h-6 rounded-full mr-3"
                      style={{ backgroundColor: theme.primary }}
                    />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{theme.name}</div>
                      <div className="text-xs text-gray-500">
                        {key === 'tomato' && 'Classic warm red theme'}
                        {key === 'mint' && 'Refreshing green theme'}
                        {key === 'dark' && 'Dark mode for night owls'}
                      </div>
                    </div>
                  </div>
                  {settings.theme === key && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div>
            <div className="flex items-center mb-4">
              <Zap className="w-5 h-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Keyboard Shortcuts</h3>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Start/Pause Timer</span>
                <kbd className="px-2 py-1 bg-white rounded text-xs border">Space</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Next Task</span>
                <kbd className="px-2 py-1 bg-white rounded text-xs border">N</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Open Settings</span>
                <kbd className="px-2 py-1 bg-white rounded text-xs border">S</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Close Modal</span>
                <kbd className="px-2 py-1 bg-white rounded text-xs border">Esc</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={hideSettings}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus-ring"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
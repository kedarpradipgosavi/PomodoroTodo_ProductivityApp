/**
 * Pomodoro timer modal with tomato-styled interface
 */

import React, { useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useTimer } from '../../hooks/useTimer';
import { formatTime, minutesToSeconds } from '../../utils/formatTime';
import { TimerDisplay } from './TimerDisplay';

export function TimerModal() {
  const { 
    showTimerModal, 
    hideTimer, 
    settings, 
    updateSettings,
    timerState: globalTimerState,
    incrementPomodoroSessions,
    todos,
    updateTodo,
  } = useAppContext();

  const currentTodo = globalTimerState.currentTodoId 
    ? todos.find(todo => todo.id === globalTimerState.currentTodoId)
    : null;

  const {
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
  } = useTimer({
    workDuration: settings.workDuration,
    breakDuration: settings.breakDuration,
    autoStartBreak: settings.autoStartBreak,
    soundEnabled: settings.soundEnabled,
    onTimerComplete: (mode) => {
      if (mode === 'work') {
        incrementPomodoroSessions();
        if (currentTodo) {
          updateTodo(currentTodo.id, {
            pomodoroSessions: currentTodo.pomodoroSessions + 1,
          });
        }
      }
    },
  });

  const handleStartPause = () => {
    if (timerState.isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };

  const adjustWorkDuration = (increment: number) => {
    const newDuration = Math.max(1, Math.min(60, settings.workDuration + increment));
    updateSettings({ workDuration: newDuration });
    if (!timerState.isRunning && timerState.mode === 'work') {
      resetTimer();
    }
  };

  const adjustBreakDuration = (increment: number) => {
    const newDuration = Math.max(1, Math.min(30, settings.breakDuration + increment));
    updateSettings({ breakDuration: newDuration });
    if (!timerState.isRunning && timerState.mode === 'break') {
      resetTimer();
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showTimerModal) return;
      
      if (e.code === 'Space') {
        e.preventDefault();
        handleStartPause();
      } else if (e.key === 'Escape') {
        hideTimer();
      } else if (e.key === 'r' || e.key === 'R') {
        resetTimer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTimerModal, handleStartPause, hideTimer, resetTimer]);

  if (!showTimerModal) return null;

  const progress = timerState.mode === 'work' 
    ? 1 - (timerState.currentTime / minutesToSeconds(settings.workDuration))
    : 1 - (timerState.currentTime / minutesToSeconds(settings.breakDuration));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-screen overflow-y-auto scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {timerState.mode === 'work' ? '🍅 Focus Time' : '☕ Break Time'}
            </h2>
            {currentTodo && (
              <p className="text-sm text-gray-600 mt-1 truncate">
                Working on: {currentTodo.text}
              </p>
            )}
          </div>
          <button
            onClick={hideTimer}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus-ring"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timer Display */}
        <div className="p-8 text-center">
          <TimerDisplay
            time={timerState.currentTime}
            mode={timerState.mode}
            progress={progress}
            isRunning={timerState.isRunning}
          />

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={() => switchMode(timerState.mode === 'work' ? 'break' : 'work')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus-ring"
              title="Switch Mode"
            >
              {timerState.mode === 'work' ? '☕' : '🍅'}
            </button>

            <button
              onClick={handleStartPause}
              className={`px-6 py-3 rounded-xl font-semibold transition-all hover-lift focus-ring ${
                timerState.mode === 'work'
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {timerState.isRunning ? (
                <><Pause className="w-5 h-5 mr-2 inline" />Pause</>
              ) : (
                <><Play className="w-5 h-5 mr-2 inline" />Start</>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus-ring"
              title="Reset Timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Duration Controls */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Work Duration</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => adjustWorkDuration(-5)}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded focus-ring"
                  disabled={timerState.isRunning}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {settings.workDuration}m
                </span>
                <button
                  onClick={() => adjustWorkDuration(5)}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded focus-ring"
                  disabled={timerState.isRunning}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Break Duration</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => adjustBreakDuration(-1)}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded focus-ring"
                  disabled={timerState.isRunning}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {settings.breakDuration}m
                </span>
                <button
                  onClick={() => adjustBreakDuration(1)}
                  className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded focus-ring"
                  disabled={timerState.isRunning}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              <kbd className="px-1 py-0.5 bg-white rounded text-xs">Space</kbd> Start/Pause • 
              <kbd className="px-1 py-0.5 bg-white rounded text-xs mx-1">R</kbd> Reset • 
              <kbd className="px-1 py-0.5 bg-white rounded text-xs">Esc</kbd> Close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
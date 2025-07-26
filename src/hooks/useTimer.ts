/**
 * Custom hook for managing timer functionality
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { TimerState, TimerMode } from '../types';
import { minutesToSeconds } from '../utils/formatTime';
import { playNotificationSound, showNotification } from '../utils/audio';

interface UseTimerProps {
  workDuration: number; // in minutes
  breakDuration: number; // in minutes
  autoStartBreak: boolean;
  soundEnabled: boolean;
  onTimerComplete?: (mode: TimerMode) => void;
}

export function useTimer({
  workDuration,
  breakDuration,
  autoStartBreak,
  soundEnabled,
  onTimerComplete,
}: UseTimerProps) {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    currentTime: minutesToSeconds(workDuration),
    mode: 'work',
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedTimeRef = useRef<number>(0);

  /**
   * Start the timer
   */
  const startTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isRunning: true, isPaused: false }));
    startTimeRef.current = Date.now() - elapsedTimeRef.current * 1000;
  }, []);

  /**
   * Pause the timer
   */
  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isRunning: false, isPaused: true }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Reset the timer
   */
  const resetTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false,
      currentTime: minutesToSeconds(prev.mode === 'work' ? workDuration : breakDuration),
    }));
    elapsedTimeRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [workDuration, breakDuration]);

  /**
   * Switch between work and break modes
   */
  const switchMode = useCallback((mode: TimerMode) => {
    const duration = mode === 'work' ? workDuration : breakDuration;
    setTimerState(prev => ({
      ...prev,
      mode,
      currentTime: minutesToSeconds(duration),
      isRunning: false,
      isPaused: false,
    }));
    elapsedTimeRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [workDuration, breakDuration]);

  /**
   * Handle timer completion
   */
  const handleTimerComplete = useCallback(() => {
    const currentMode = timerState.mode;
    
    // Play sound notification
    if (soundEnabled) {
      playNotificationSound(currentMode);
    }
    
    // Show browser notification
    const title = currentMode === 'work' ? 'Work Session Complete!' : 'Break Time Over!';
    const body = currentMode === 'work' 
      ? 'Great job! Time for a break.' 
      : 'Break time is over. Ready to focus?';
    showNotification(title, body);
    
    // Call completion callback
    onTimerComplete?.(currentMode);
    
    // Auto-switch to break mode or stop
    if (currentMode === 'work') {
      switchMode('break');
      if (autoStartBreak) {
        setTimeout(() => startTimer(), 1000);
      }
    } else {
      switchMode('work');
    }
  }, [timerState.mode, soundEnabled, onTimerComplete, switchMode, autoStartBreak, startTimer]);

  /**
   * Timer interval effect
   */
  useEffect(() => {
    if (timerState.isRunning) {
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        elapsedTimeRef.current = Math.floor((now - startTimeRef.current) / 1000);
        
        const totalDuration = minutesToSeconds(
          timerState.mode === 'work' ? workDuration : breakDuration
        );
        const remainingTime = Math.max(0, totalDuration - elapsedTimeRef.current);
        
        setTimerState(prev => ({ ...prev, currentTime: remainingTime }));
        
        // Check if timer is complete
        if (remainingTime === 0) {
          handleTimerComplete();
        }
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timerState.isRunning, timerState.mode, workDuration, breakDuration, handleTimerComplete]);

  /**
   * Update timer duration when settings change
   */
  useEffect(() => {
    if (!timerState.isRunning && !timerState.isPaused) {
      const duration = timerState.mode === 'work' ? workDuration : breakDuration;
      setTimerState(prev => ({ ...prev, currentTime: minutesToSeconds(duration) }));
    }
  }, [workDuration, breakDuration, timerState.isRunning, timerState.isPaused, timerState.mode]);

  return {
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    switchMode,
  };
}
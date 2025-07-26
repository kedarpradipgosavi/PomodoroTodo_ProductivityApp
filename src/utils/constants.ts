/**
 * Application constants and default values
 */

import { Settings } from '../types';

export const DEFAULT_SETTINGS: Settings = {
  workDuration: 25,
  breakDuration: 5,
  autoStartBreak: true,
  theme: 'tomato',
  soundEnabled: true,
};

export const KEYBOARD_SHORTCUTS = {
  START_PAUSE_TIMER: ' ', // Space
  NEXT_TASK: 'n',
  OPEN_SETTINGS: 's',
  ESCAPE: 'Escape',
};

export const STORAGE_KEYS = {
  TODOS: 'pomodoro-todos',
  SETTINGS: 'pomodoro-settings',
  DAILY_STATS: 'pomodoro-daily-stats',
};

export const TIMER_SOUNDS = {
  work_complete: '/sounds/work-complete.mp3',
  break_complete: '/sounds/break-complete.mp3',
};

export const ANIMATION_DURATION = 300; // milliseconds
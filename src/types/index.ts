/**
 * Type definitions for the PomodoroTodo application
 */

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  pomodoroSessions: number;
}

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  currentTime: number;
  mode: 'work' | 'break';
  currentTodoId?: string;
}

export interface Settings {
  workDuration: number; // in minutes
  breakDuration: number; // in minutes
  autoStartBreak: boolean;
  theme: 'tomato' | 'mint' | 'dark';
  soundEnabled: boolean;
}

export interface DailyStats {
  date: string;
  completedTodos: number;
  totalTodos: number;
  pomodoroSessions: number;
  totalFocusTime: number; // in minutes
}

export interface AppState {
  todos: Todo[];
  timerState: TimerState;
  settings: Settings;
  dailyStats: DailyStats;
  showTimerModal: boolean;
  showSettingsModal: boolean;
}

export type Theme = 'tomato' | 'mint' | 'dark';

export type TimerMode = 'work' | 'break';
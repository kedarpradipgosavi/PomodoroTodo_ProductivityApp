/**
 * Local storage utilities for persisting application data
 */

import { Todo, Settings, DailyStats } from '../types';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from './constants';

/**
 * Save todos to localStorage
 */
export const saveTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos:', error);
  }
};

/**
 * Load todos from localStorage
 */
export const loadTodos = (): Todo[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TODOS);
    if (saved) {
      const todos = JSON.parse(saved);
      // Convert date strings back to Date objects
      return todos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        completedAt: todo.completedAt ? new Date(todo.completedAt) : undefined,
      }));
    }
  } catch (error) {
    console.error('Failed to load todos:', error);
  }
  return [];
};

/**
 * Save settings to localStorage
 */
export const saveSettings = (settings: Settings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

/**
 * Load settings from localStorage
 */
export const loadSettings = (): Settings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      const settings = JSON.parse(saved);
      return { ...DEFAULT_SETTINGS, ...settings };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return DEFAULT_SETTINGS;
};

/**
 * Save daily stats to localStorage
 */
export const saveDailyStats = (stats: DailyStats): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DAILY_STATS, JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save daily stats:', error);
  }
};

/**
 * Load daily stats from localStorage
 */
export const loadDailyStats = (): DailyStats => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.DAILY_STATS);
    const today = new Date().toDateString();
    
    if (saved) {
      const stats = JSON.parse(saved);
      // Return stats if they're for today, otherwise return fresh stats
      if (stats.date === today) {
        return stats;
      }
    }
  } catch (error) {
    console.error('Failed to load daily stats:', error);
  }
  
  // Return fresh daily stats
  return {
    date: new Date().toDateString(),
    completedTodos: 0,
    totalTodos: 0,
    pomodoroSessions: 0,
    totalFocusTime: 0,
  };
};
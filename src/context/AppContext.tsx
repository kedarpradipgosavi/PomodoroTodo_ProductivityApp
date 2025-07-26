/**
 * Main application context provider
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, Todo, Settings, DailyStats, TimerMode } from '../types';
import { DEFAULT_SETTINGS } from '../utils/constants';
import { loadTodos, saveTodos, loadSettings, saveSettings, loadDailyStats, saveDailyStats } from '../utils/storage';
import { applyTheme } from '../styles/themes';

interface AppContextType extends AppState {
  // Todo actions
  addTodo: (text: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  reorderTodos: (todos: Todo[]) => void;
  
  // Timer actions
  showTimer: (todoId?: string) => void;
  hideTimer: () => void;
  
  // Settings actions
  updateSettings: (settings: Partial<Settings>) => void;
  showSettings: () => void;
  hideSettings: () => void;
  
  // Stats actions
  incrementPomodoroSessions: () => void;
  updateDailyStats: (updates: Partial<DailyStats>) => void;
}

type AppAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'REORDER_TODOS'; payload: { todos: Todo[] } }
  | { type: 'SHOW_TIMER'; payload: { todoId?: string } }
  | { type: 'HIDE_TIMER' }
  | { type: 'UPDATE_SETTINGS'; payload: { settings: Partial<Settings> } }
  | { type: 'SHOW_SETTINGS' }
  | { type: 'HIDE_SETTINGS' }
  | { type: 'INCREMENT_POMODORO_SESSIONS' }
  | { type: 'UPDATE_DAILY_STATS'; payload: { updates: Partial<DailyStats> } }
  | { type: 'LOAD_INITIAL_DATA'; payload: { todos: Todo[]; settings: Settings; dailyStats: DailyStats } };

const initialState: AppState = {
  todos: [],
  timerState: {
    isRunning: false,
    isPaused: false,
    currentTime: 0,
    mode: 'work',
  },
  settings: DEFAULT_SETTINGS,
  dailyStats: {
    date: new Date().toDateString(),
    completedTodos: 0,
    totalTodos: 0,
    pomodoroSessions: 0,
    totalFocusTime: 0,
  },
  showTimerModal: false,
  showSettingsModal: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_INITIAL_DATA':
      return {
        ...state,
        todos: action.payload.todos,
        settings: action.payload.settings,
        dailyStats: action.payload.dailyStats,
      };

    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        createdAt: new Date(),
        pomodoroSessions: 0,
      };
      const newTodos = [...state.todos, newTodo];
      const newDailyStats = {
        ...state.dailyStats,
        totalTodos: newTodos.length,
      };
      return {
        ...state,
        todos: newTodos,
        dailyStats: newDailyStats,
      };
    }

    case 'UPDATE_TODO': {
      const newTodos = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updates }
          : todo
      );
      return { ...state, todos: newTodos };
    }

    case 'DELETE_TODO': {
      const newTodos = state.todos.filter(todo => todo.id !== action.payload.id);
      const completedTodos = newTodos.filter(todo => todo.completed).length;
      const newDailyStats = {
        ...state.dailyStats,
        totalTodos: newTodos.length,
        completedTodos,
      };
      return {
        ...state,
        todos: newTodos,
        dailyStats: newDailyStats,
      };
    }

    case 'TOGGLE_TODO': {
      const newTodos = state.todos.map(todo => {
        if (todo.id === action.payload.id) {
          const updated = {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date() : undefined,
          };
          return updated;
        }
        return todo;
      });
      const completedTodos = newTodos.filter(todo => todo.completed).length;
      const newDailyStats = {
        ...state.dailyStats,
        completedTodos,
      };
      return {
        ...state,
        todos: newTodos,
        dailyStats: newDailyStats,
      };
    }

    case 'REORDER_TODOS':
      return { ...state, todos: action.payload.todos };

    case 'SHOW_TIMER':
      return {
        ...state,
        showTimerModal: true,
        timerState: {
          ...state.timerState,
          currentTodoId: action.payload.todoId,
        },
      };

    case 'HIDE_TIMER':
      return { ...state, showTimerModal: false };

    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload.settings },
      };

    case 'SHOW_SETTINGS':
      return { ...state, showSettingsModal: true };

    case 'HIDE_SETTINGS':
      return { ...state, showSettingsModal: false };

    case 'INCREMENT_POMODORO_SESSIONS': {
      const newDailyStats = {
        ...state.dailyStats,
        pomodoroSessions: state.dailyStats.pomodoroSessions + 1,
        totalFocusTime: state.dailyStats.totalFocusTime + state.settings.workDuration,
      };
      return { ...state, dailyStats: newDailyStats };
    }

    case 'UPDATE_DAILY_STATS':
      return {
        ...state,
        dailyStats: { ...state.dailyStats, ...action.payload.updates },
      };

    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: { text } });
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };

  const reorderTodos = (todos: Todo[]) => {
    dispatch({ type: 'REORDER_TODOS', payload: { todos } });
  };

  const showTimer = (todoId?: string) => {
    dispatch({ type: 'SHOW_TIMER', payload: { todoId } });
  };

  const hideTimer = () => {
    dispatch({ type: 'HIDE_TIMER' });
  };

  const updateSettings = (settings: Partial<Settings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { settings } });
  };

  const showSettings = () => {
    dispatch({ type: 'SHOW_SETTINGS' });
  };

  const hideSettings = () => {
    dispatch({ type: 'HIDE_SETTINGS' });
  };

  const incrementPomodoroSessions = () => {
    dispatch({ type: 'INCREMENT_POMODORO_SESSIONS' });
  };

  const updateDailyStats = (updates: Partial<DailyStats>) => {
    dispatch({ type: 'UPDATE_DAILY_STATS', payload: { updates } });
  };

  // Load initial data on mount
  useEffect(() => {
    const todos = loadTodos();
    const settings = loadSettings();
    const dailyStats = loadDailyStats();
    
    dispatch({
      type: 'LOAD_INITIAL_DATA',
      payload: { todos, settings, dailyStats }
    });
    
    // Apply theme
    applyTheme(settings.theme);
  }, []);

  // Save data when state changes
  useEffect(() => {
    if (state.todos.length >= 0) { // Only save if data has been loaded
      saveTodos(state.todos);
    }
  }, [state.todos]);

  useEffect(() => {
    saveSettings(state.settings);
    applyTheme(state.settings.theme);
  }, [state.settings]);

  useEffect(() => {
    saveDailyStats(state.dailyStats);
  }, [state.dailyStats]);

  const contextValue: AppContextType = {
    ...state,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    reorderTodos,
    showTimer,
    hideTimer,
    updateSettings,
    showSettings,
    hideSettings,
    incrementPomodoroSessions,
    updateDailyStats,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
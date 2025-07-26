/**
 * Main application component
 */

import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Layout } from './components/Layout/Layout';
import { ProgressDashboard } from './components/Dashboard/ProgressDashboard';
import { TodoList } from './components/TodoList/TodoList';
import { TimerModal } from './components/Timer/TimerModal';
import { SettingsModal } from './components/Settings/SettingsModal';
import { requestNotificationPermission } from './utils/audio';
import './styles/animations.css';

function AppContent() {
  const { 
    showTimer, 
    showSettings, 
    hideTimer, 
    hideSettings, 
    todos, 
    timerState,
  } = useAppContext();

  const getNextUncompletedTodo = () => {
    const uncompletedTodos = todos.filter(todo => !todo.completed);
    if (uncompletedTodos.length === 0) return;
    
    // If there's a current todo and it's not completed, keep it
    if (timerState.currentTodoId) {
      const currentTodo = todos.find(todo => todo.id === timerState.currentTodoId);
      if (currentTodo && !currentTodo.completed) return;
    }
    
    // Otherwise, get the first uncompleted todo
    showTimer(uncompletedTodos[0].id);
  };

  const handleStartPauseTimer = () => {
    if (!timerState.currentTodoId && todos.some(todo => !todo.completed)) {
      getNextUncompletedTodo();
    }
  };

  const handleNextTask = () => {
    getNextUncompletedTodo();
  };

  const handleEscape = () => {
    hideTimer();
    hideSettings();
  };

  useKeyboardShortcuts({
    onStartPauseTimer: handleStartPauseTimer,
    onNextTask: handleNextTask,
    onOpenSettings: showSettings,
    onEscape: handleEscape,
  });

  // Request notification permission on app load
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <Layout>
      <ProgressDashboard />
      <TodoList />
      <TimerModal />
      <SettingsModal />
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
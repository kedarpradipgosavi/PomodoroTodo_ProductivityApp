/**
 * Application header component
 */

import React from 'react';
import { Settings, Timer, CheckCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { getTimeGreeting } from '../../utils/formatTime';

export function Header() {
  const { showSettings, dailyStats } = useAppContext();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">PomodoroTodo</h1>
              <p className="text-sm text-gray-500">{getTimeGreeting()}!</p>
            </div>
          </div>

          {/* Stats and actions */}
          <div className="flex items-center space-x-4">
            {/* Quick stats */}
            <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>{dailyStats.completedTodos}/{dailyStats.totalTodos} tasks</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">🍅</span>
                </div>
                <span>{dailyStats.pomodoroSessions} sessions</span>
              </div>
            </div>

            {/* Settings button */}
            <button
              onClick={showSettings}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus-ring"
              title="Settings (S)"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
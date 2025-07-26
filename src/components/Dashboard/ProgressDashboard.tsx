/**
 * Progress dashboard component showing daily statistics and progress
 */

import React from 'react';
import { CheckCircle, Clock, Target, Zap } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { StatsCard } from './StatsCard';

export function ProgressDashboard() {
  const { dailyStats, todos } = useAppContext();
  
  const completionRate = dailyStats.totalTodos > 0 
    ? Math.round((dailyStats.completedTodos / dailyStats.totalTodos) * 100)
    : 0;

  const activeTodos = todos.filter(todo => !todo.completed);
  const focusHours = Math.round(dailyStats.totalFocusTime / 60 * 10) / 10;

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Today's Progress</h2>
        <p className="text-gray-600">Keep up the great work! Here's how you're doing today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Tasks Completed"
          value={`${dailyStats.completedTodos}/${dailyStats.totalTodos}`}
          subtitle={`${completionRate}% completion rate`}
          icon={CheckCircle}
          color="green"
        />
        
        <StatsCard
          title="Pomodoro Sessions"
          value={dailyStats.pomodoroSessions}
          subtitle="Focus sessions today"
          icon={Target}
          color="red"
        />
        
        <StatsCard
          title="Focus Time"
          value={`${focusHours}h`}
          subtitle="Total focus time"
          icon={Clock}
          color="blue"
        />
        
        <StatsCard
          title="Active Tasks"
          value={activeTodos.length}
          subtitle="Tasks remaining"
          icon={Zap}
          color="purple"
        />
      </div>

      {/* Progress bar */}
      {dailyStats.totalTodos > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Daily Goal Progress</h3>
            <span className="text-sm font-medium text-gray-600">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 progress-fill"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {dailyStats.completedTodos} of {dailyStats.totalTodos} tasks completed
          </p>
        </div>
      )}
    </div>
  );
}
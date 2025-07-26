/**
 * Circular timer display with tomato/coffee cup styling
 */

import React from 'react';
import { formatTime } from '../../utils/formatTime';
import { TimerMode } from '../../types';

interface TimerDisplayProps {
  time: number;
  mode: TimerMode;
  progress: number;
  isRunning: boolean;
}

export function TimerDisplay({ time, mode, progress, isRunning }: TimerDisplayProps) {
  const radius = 120;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - progress * circumference;

  const isWorkMode = mode === 'work';
  const displayEmoji = isWorkMode ? '🍅' : '☕';
  const primaryColor = isWorkMode ? '#EF4444' : '#10B981';
  const lightColor = isWorkMode ? '#FEE2E2' : '#D1FAE5';

  return (
    <div className="relative inline-block">
      {/* Tomato/Coffee Cup Shape Background */}
      <div 
        className={`w-60 h-60 rounded-full flex items-center justify-center relative shadow-2xl ${
          isWorkMode ? 'bg-gradient-to-br from-red-400 to-red-600' : 'bg-gradient-to-br from-green-400 to-green-600'
        }`}
        style={{
          boxShadow: `
            inset 0 -8px 16px rgba(0, 0, 0, 0.2),
            inset 0 8px 16px rgba(255, 255, 255, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.3)
          `
        }}
      >
        {/* Inner Circle */}
        <div 
          className="w-48 h-48 rounded-full flex flex-col items-center justify-center relative bg-white"
          style={{
            boxShadow: `
              inset 0 4px 8px rgba(0, 0, 0, 0.1),
              0 2px 8px rgba(0, 0, 0, 0.1)
            `
          }}
        >
          {/* Progress Ring */}
          <svg
            height={radius * 2}
            width={radius * 2}
            className="absolute inset-0 transform -rotate-90"
          >
            {/* Background Circle */}
            <circle
              stroke="#E5E7EB"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress Circle */}
            <circle
              stroke={primaryColor}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Content */}
          <div className="text-center z-10">
            <div className={`text-4xl mb-2 ${isRunning ? 'pulse' : ''}`}>
              {displayEmoji}
            </div>
            <div className="text-3xl font-bold text-gray-900 font-mono">
              {formatTime(time)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {isWorkMode ? 'Focus Time' : 'Break Time'}
            </div>
          </div>

          {/* Shine Effect */}
          <div 
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)`
            }}
          />
        </div>

        {/* Tomato Leaves (only for work mode) */}
        {isWorkMode && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-6 bg-green-500 rounded-full transform rotate-12 shadow-lg"></div>
            <div className="w-6 h-4 bg-green-400 rounded-full transform -rotate-12 -mt-2 ml-4 shadow-lg"></div>
          </div>
        )}

        {/* Coffee Steam (only for break mode) */}
        {!isWorkMode && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-1">
            <div className="w-1 h-8 bg-white opacity-60 rounded-full animate-pulse"></div>
            <div className="w-1 h-6 bg-white opacity-40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-1 h-8 bg-white opacity-60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        )}
      </div>

      {/* Pulsing Glow Effect */}
      {isRunning && (
        <div 
          className={`absolute inset-0 rounded-full ${
            isWorkMode ? 'bg-red-400' : 'bg-green-400'
          } opacity-20 animate-ping`}
          style={{ zIndex: -1 }}
        />
      )}
    </div>
  );
}
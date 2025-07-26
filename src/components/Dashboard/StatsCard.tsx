/**
 * Stats card component for displaying daily statistics
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'red' | 'green' | 'blue' | 'purple';
  trend?: {
    value: number;
    label: string;
  };
}

const colorClasses = {
  red: {
    icon: 'bg-red-500',
    text: 'text-red-600',
    bg: 'bg-red-50',
  },
  green: {
    icon: 'bg-green-500',
    text: 'text-green-600',
    bg: 'bg-green-50',
  },
  blue: {
    icon: 'bg-blue-500',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  purple: {
    icon: 'bg-purple-500',
    text: 'text-purple-600',
    bg: 'bg-purple-50',
  },
};

export function StatsCard({ title, value, subtitle, icon: Icon, color, trend }: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover-lift">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-sm font-medium ${colors.text}`}>
                {trend.value > 0 ? '+' : ''}{trend.value}
              </span>
              <span className="text-sm text-gray-500 ml-1">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors.bg}`}>
          <Icon className={`w-6 h-6 text-white ${colors.icon} p-1 rounded`} />
        </div>
      </div>
    </div>
  );
}
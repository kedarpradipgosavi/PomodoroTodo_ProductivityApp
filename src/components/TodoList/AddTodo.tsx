/**
 * Add todo input component
 */

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export function AddTodo() {
  const [text, setText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { addTodo } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
      setIsExpanded(false);
    }
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!text.trim()) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`bg-white rounded-xl shadow-sm border-2 transition-all duration-200 ${
          isExpanded 
            ? 'border-red-300 shadow-lg' 
            : 'border-gray-200 hover:border-gray-300'
        }`}>
          <div className="flex items-center p-4">
            <Plus className={`w-5 h-5 mr-3 transition-colors ${
              isExpanded ? 'text-red-500' : 'text-gray-400'
            }`} />
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Add a new task..."
              className="flex-1 text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none"
            />
          </div>
          
          {isExpanded && (
            <div className="border-t border-gray-200 p-4 bg-gray-50 rounded-b-xl fade-in">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Press Enter to add task, or click the tomato icon to start a focus session
                </p>
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-ring"
                >
                  Add Task
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
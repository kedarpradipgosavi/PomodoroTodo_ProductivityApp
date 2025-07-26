/**
 * Individual todo item component with drag and drop support
 */

import React, { useState } from 'react';
import { Check, Edit2, Trash2, GripVertical } from 'lucide-react';
import { Todo } from '../../types';
import { useAppContext } from '../../context/AppContext';

interface TodoItemProps {
  todo: Todo;
  isDragging?: boolean;
  isDropTarget?: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
}

export function TodoItem({
  todo,
  isDragging,
  isDropTarget,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { updateTodo, deleteTodo, toggleTodo, showTimer } = useAppContext();

  const handleEdit = () => {
    if (isEditing && editText.trim() && editText !== todo.text) {
      updateTodo(todo.id, { text: editText.trim() });
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleTomatoClick = () => {
    showTimer(todo.id);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`group bg-white rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md ${
        isDragging 
          ? 'opacity-50 scale-95' 
          : isDropTarget 
            ? 'border-red-300 bg-red-50' 
            : 'border-gray-200 hover:border-gray-300'
      } ${todo.completed ? 'opacity-75' : ''}`}
    >
      <div className="flex items-center p-4">
        {/* Drag handle */}
        <div className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>

        {/* Checkbox */}
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`mr-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all hover-lift ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-400'
          } focus-ring`}
        >
          {todo.completed && <Check className="w-3 h-3 text-white" />}
        </button>

        {/* Task text */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleEdit}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none focus:outline-none text-gray-900"
              autoFocus
            />
          ) : (
            <div className="flex items-center">
              <span
                className={`text-gray-900 ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </span>
              {todo.pomodoroSessions > 0 && (
                <div className="ml-2 flex items-center space-x-1">
                  {Array.from({ length: Math.min(todo.pomodoroSessions, 5) }).map((_, i) => (
                    <span key={i} className="text-xs">🍅</span>
                  ))}
                  {todo.pomodoroSessions > 5 && (
                    <span className="text-xs text-gray-500">+{todo.pomodoroSessions - 5}</span>
                  )}
                </div>
              )}
            </div>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Created {todo.createdAt.toLocaleDateString()}
            {todo.completedAt && (
              <> • Completed {todo.completedAt.toLocaleDateString()}</>
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Tomato timer button */}
          {!todo.completed && (
            <button
              onClick={handleTomatoClick}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors focus-ring"
              title="Start Pomodoro Timer"
            >
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">🍅</span>
              </div>
            </button>
          )}

          {/* Edit button */}
          <button
            onClick={handleEdit}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus-ring"
            title="Edit Task"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {/* Delete button */}
          <button
            onClick={() => deleteTodo(todo.id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus-ring"
            title="Delete Task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
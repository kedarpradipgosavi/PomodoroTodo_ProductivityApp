/**
 * Main todo list component with drag and drop functionality
 */

import React from 'react';
import { CheckCircle, ListTodo } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';

export function TodoList() {
  const { todos, reorderTodos } = useAppContext();
  
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const {
    draggedItem,
    dropTargetId,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop({
    items: activeTodos,
    onReorder: reorderTodos,
  });

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <AddTodo />
        <div className="mt-8">
          <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Add your first task above to get started with the Pomodoro technique. 
            Click the tomato icon on any task to begin a focus session!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AddTodo />

      {/* Active tasks */}
      {activeTodos.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <ListTodo className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Active Tasks ({activeTodos.length})
            </h3>
          </div>
          <div className="space-y-3">
            {activeTodos.map((todo) => (
              <div key={todo.id} className="fade-in">
                <TodoItem
                  todo={todo}
                  isDragging={draggedItem?.id === todo.id}
                  isDropTarget={dropTargetId === todo.id}
                  onDragStart={() => handleDragStart(todo)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleDragOver(e, todo.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, todo.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed tasks */}
      {completedTodos.length > 0 && (
        <div>
          <div className="flex items-center mb-4">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Completed Tasks ({completedTodos.length})
            </h3>
          </div>
          <div className="space-y-3">
            {completedTodos.map((todo) => (
              <div key={todo.id} className="fade-in">
                <TodoItem
                  todo={todo}
                  onDragStart={() => {}}
                  onDragEnd={() => {}}
                  onDragOver={() => {}}
                  onDragLeave={() => {}}
                  onDrop={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
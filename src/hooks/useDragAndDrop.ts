/**
 * Custom hook for drag and drop functionality
 */

import { useState, useCallback } from 'react';

interface UseDragAndDropProps<T> {
  items: T[];
  onReorder: (items: T[]) => void;
}

export function useDragAndDrop<T extends { id: string }>({
  items,
  onReorder,
}: UseDragAndDropProps<T>) {
  const [draggedItem, setDraggedItem] = useState<T | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const handleDragStart = useCallback((item: T) => {
    setDraggedItem(item);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent, targetId: string) => {
    event.preventDefault();
    setDropTargetId(targetId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDropTargetId(null);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent, targetId: string) => {
    event.preventDefault();
    
    if (!draggedItem || draggedItem.id === targetId) {
      setDraggedItem(null);
      setDropTargetId(null);
      return;
    }

    const draggedIndex = items.findIndex(item => item.id === draggedItem.id);
    const targetIndex = items.findIndex(item => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      setDropTargetId(null);
      return;
    }

    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    onReorder(newItems);
    setDraggedItem(null);
    setDropTargetId(null);
  }, [draggedItem, items, onReorder]);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDropTargetId(null);
  }, []);

  return {
    draggedItem,
    dropTargetId,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
}
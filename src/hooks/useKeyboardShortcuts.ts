/**
 * Custom hook for handling keyboard shortcuts
 */

import { useEffect } from 'react';
import { KEYBOARD_SHORTCUTS } from '../utils/constants';

interface UseKeyboardShortcutsProps {
  onStartPauseTimer: () => void;
  onNextTask: () => void;
  onOpenSettings: () => void;
  onEscape: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onStartPauseTimer,
  onNextTask,
  onOpenSettings,
  onEscape,
  enabled = true,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      switch (key) {
        case KEYBOARD_SHORTCUTS.START_PAUSE_TIMER:
          event.preventDefault();
          onStartPauseTimer();
          break;
        case KEYBOARD_SHORTCUTS.NEXT_TASK:
          event.preventDefault();
          onNextTask();
          break;
        case KEYBOARD_SHORTCUTS.OPEN_SETTINGS:
          event.preventDefault();
          onOpenSettings();
          break;
        case KEYBOARD_SHORTCUTS.ESCAPE.toLowerCase():
          onEscape();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onStartPauseTimer, onNextTask, onOpenSettings, onEscape, enabled]);
}
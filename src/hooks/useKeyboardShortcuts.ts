/**
 * Keyboard Shortcuts Hook
 * 
 * Handles all keyboard shortcuts for the note editor.
 * Ensures shortcuts work globally and are properly debounced.
 */

import { useEffect, useRef } from 'react';
import { useNotesStore } from '@/stores/useNotesStore';
import { useUIStore } from '@/stores/useUIStore';

export const useKeyboardShortcuts = () => {
  const { createNote, navigateToPrevious, navigateToNext, hasMultipleNotes, getCurrentNoteIndex, getNotesForToday } = useNotesStore();
  const { showCarouselDotIndicator } = useUIStore();
  const lastKeyPressTime = useRef<number>(0);
  const DEBOUNCE_TIME = 100; // 100ms debounce

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastKeyPressTime.current < DEBOUNCE_TIME) {
        return; // Debounce
      }
      lastKeyPressTime.current = now;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdKey = isMac ? event.metaKey : event.ctrlKey;

      if (!cmdKey) return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          if (hasMultipleNotes()) {
            // Navigate to next note
            const currentIndex = getCurrentNoteIndex();
            const totalNotes = getNotesForToday().length;
            navigateToNext();
            showCarouselDotIndicator(currentIndex + 1, totalNotes);
          } else {
            // Create new note
            createNote();
          }
          break;
        case 'ArrowLeft':
          event.preventDefault();
          if (hasMultipleNotes()) {
            // Navigate to previous note
            const currentIndex = getCurrentNoteIndex();
            const totalNotes = getNotesForToday().length;
            navigateToPrevious();
            showCarouselDotIndicator(currentIndex - 1, totalNotes);
          }
          break;
        case 'k':
          event.preventDefault();
          // Toggle main menu (will be implemented in MainMenu component)
          break;
        default:
          break;
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [createNote, navigateToPrevious, navigateToNext, hasMultipleNotes, getCurrentNoteIndex, getNotesForToday, showCarouselDotIndicator]);

  return {
    // Expose methods for manual triggering if needed
    createNote,
    navigateToPrevious,
    navigateToNext,
  };
};

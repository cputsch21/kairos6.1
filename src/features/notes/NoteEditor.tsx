"use client";

/**
 * Note Editor Component
 * 
 * Main entry point for the note editor functionality.
 * Centered, distraction-free layout with tons of white space.
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotesStore } from '@/stores/useNotesStore';
import { useUIStore } from '@/stores/useUIStore';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { getColorModeClasses } from '@/shared/types';
import { TipTapEditor } from './TipTapEditor';
import { DateDisplay } from './DateDisplay';
import { TagBar } from './TagBar';
import { CarouselDot } from './CarouselDot';
import { MainMenu } from './MainMenu';

export const NoteEditor: React.FC = () => {
  const {
    notes,
    currentNoteId,
    createNote,
    updateNote,
    getCurrentNote,
    getNotesForToday,
  } = useNotesStore();

  const { colorMode, isTagBarOpen, toggleTagBar, setTagBarOpen } = useUIStore();
  const colors = getColorModeClasses(colorMode);

  // Initialize keyboard shortcuts
  useKeyboardShortcuts();

  // Create initial note if none exist
  useEffect(() => {
    if (notes.length === 0) {
      createNote();
    }
  }, [notes.length, createNote]);

  const currentNote = getCurrentNote();
  const todayNotes = getNotesForToday();

  // Handle note content updates
  const handleContentUpdate = (content: string) => {
    if (currentNoteId) {
      updateNote(currentNoteId, content);
    }
  };

  // Handle tag deletion
  const handleTagDelete = (tagToDelete: string) => {
    if (currentNote) {
      const updatedTags = currentNote.tags.filter(tag => tag !== tagToDelete);
      // Update note with new tags (this would need to be added to the store)
      console.log('Delete tag:', tagToDelete);
    }
  };

  if (!currentNote) {
    return (
      <div className={`min-h-screen ${colors.bg} flex items-center justify-center`}>
        <div className={`text-lg ${colors.textSecondary} font-sans`}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${colors.bg} relative`}>
      {/* Date Display */}
      <DateDisplay date={currentNote.date} />

      {/* Tag Bar */}
      <TagBar
        isOpen={isTagBarOpen}
        onToggle={toggleTagBar}
        tags={currentNote.tags}
        onTagDelete={handleTagDelete}
      />

      {/* Carousel Dot */}
      <CarouselDot />

      {/* Main Menu */}
      <MainMenu />

      {/* Editor Area */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl px-6 pt-24 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNote.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[60vh]"
            >
              <TipTapEditor
                content={currentNote.content}
                onUpdate={handleContentUpdate}
                placeholder="Start typing..."
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Empty State */}
      {todayNotes.length === 0 && (
        <div className={`min-h-screen ${colors.bg} flex items-center justify-center`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md mx-auto px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-8"
            >
              <div className="w-20 h-20 mx-auto bg-primary-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-3xl font-bold ${colors.text} mb-4 font-sans`}
            >
              Start your day
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`text-lg ${colors.textSecondary} mb-8 leading-relaxed font-sans`}
            >
              Capture your thoughts, ideas, and reflections for today. 
              Create your first note to begin your daily chapter.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createNote}
              className="bg-primary-400 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:bg-primary-500 transition-all duration-200 hover:shadow-xl font-sans"
            >
              Create Your First Note
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`text-sm ${colors.textSecondary} mt-4 font-sans`}
            >
              Or press ⌘+→ to create a new note
            </motion.p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

"use client";

/**
 * Main Menu Component
 * 
 * Right sidebar with Notes History and Settings tabs.
 * Follows Figma design with proper spacing and styling.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MainMenuProps, SettingsProps } from '@/shared/types';
import { useUIStore } from '@/stores/useUIStore';
import { useNotesStore } from '@/stores/useNotesStore';
import { getColorModeClasses } from '@/shared/types';
import { formatDate } from '@/shared/types';

export const MainMenu: React.FC = () => {
  const { 
    isMainMenuOpen, 
    closeMainMenu, 
    mainMenuActiveTab, 
    setMainMenuTab,
    colorMode,
    setColorMode
  } = useUIStore();
  const { notes, currentNoteId, deleteNote } = useNotesStore();
  const colors = getColorModeClasses(colorMode);

  const currentNote = notes.find(note => note.id === currentNoteId);

  return (
    <AnimatePresence>
      {isMainMenuOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed top-0 right-0 h-full w-80 ${colors.surface} ${colors.border} border-l shadow-xl z-50`}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-4 ${colors.border} border-b`}>
            <h2 className={`text-lg font-semibold ${colors.text} font-sans`}>Main Menu</h2>
            <button
              onClick={closeMainMenu}
              className={`p-1 rounded-full hover:${colors.border} transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setMainMenuTab('notes')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                mainMenuActiveTab === 'notes'
                  ? `${colors.text} border-b-2 border-primary-400`
                  : `${colors.textSecondary} hover:${colors.text}`
              }`}
            >
              Notes History
            </button>
            <button
              onClick={() => setMainMenuTab('settings')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                mainMenuActiveTab === 'settings'
                  ? `${colors.text} border-b-2 border-primary-400`
                  : `${colors.textSecondary} hover:${colors.text}`
              }`}
            >
              Settings
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {mainMenuActiveTab === 'notes' ? (
              <NotesHistoryTab />
            ) : (
              <SettingsTab colorMode={colorMode} onColorModeChange={setColorMode} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NotesHistoryTab: React.FC = () => {
  const { notes, currentNoteId, deleteNote } = useNotesStore();
  const { colorMode } = useUIStore();
  const colors = getColorModeClasses(colorMode);

  return (
    <div className="p-4">
      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search notes..."
          className={`w-full px-3 py-2 rounded-lg ${colors.border} border ${colors.text} ${colors.surface} text-sm focus:outline-none focus:ring-2 focus:ring-primary-400`}
        />
      </div>

      {/* Notes List */}
      <div className="space-y-2">
        {notes.length === 0 ? (
          <div className={`text-sm ${colors.textSecondary} text-center py-8`}>
            No notes yet
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-lg ${colors.border} border cursor-pointer hover:${colors.surface} transition-colors ${
                note.id === currentNoteId ? 'bg-primary-50 border-primary-400' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-medium ${colors.text} truncate`}>
                    {note.title}
                  </h3>
                  <p className={`text-xs ${colors.textSecondary} mt-1`}>
                    Created {formatDate(note.createdAt)} | Saved {formatDate(note.updatedAt)}
                  </p>
                </div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className={`ml-2 p-1 rounded-full hover:bg-red-100 text-red-500 transition-colors`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const SettingsTab: React.FC<SettingsProps> = ({ colorMode, onColorModeChange }) => {
  const { colorMode: currentColorMode } = useUIStore();
  const colors = getColorModeClasses(currentColorMode);

  return (
    <div className="p-4">
      <div className="space-y-6">
        {/* Profile */}
        <div>
          <h3 className={`text-sm font-medium ${colors.text} mb-2`}>Profile</h3>
          <div className={`text-xs ${colors.textSecondary}`}>User profile settings</div>
        </div>

        {/* Color Mode */}
        <div>
          <h3 className={`text-sm font-medium ${colors.text} mb-2`}>Mode (Light, Dark, Arc)</h3>
          <div className="space-y-2">
            {(['light', 'dark', 'arc'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onColorModeChange(mode)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  colorMode === mode
                    ? `bg-primary-400 text-white`
                    : `${colors.surface} ${colors.text} hover:${colors.border} border`
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar Settings */}
        <div>
          <h3 className={`text-sm font-medium ${colors.text} mb-2`}>Calendar Settings</h3>
          <div className={`text-xs ${colors.textSecondary}`}>Google Calendar integration</div>
        </div>

        {/* Location Settings */}
        <div>
          <h3 className={`text-sm font-medium ${colors.text} mb-2`}>Location Settings</h3>
          <div className={`text-xs ${colors.textSecondary}`}>Sunrise/sunset times</div>
        </div>

        {/* Kai Personalization Context */}
        <div>
          <h3 className={`text-sm font-medium ${colors.text} mb-2`}>Kai Personalization Context</h3>
          <div className={`text-xs ${colors.textSecondary}`}>AI assistant preferences</div>
        </div>
      </div>
    </div>
  );
};

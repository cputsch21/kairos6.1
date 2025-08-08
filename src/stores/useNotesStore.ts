/**
 * Notes Store - Zustand store for managing note state
 */

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Note, NoteStore, getTodayString, generateNoteTitle } from '@/shared/types';

interface NotesStore extends NoteStore {
  // Actions
  createNote: () => void;
  updateNote: (id: string, content: string) => void;
  updateNoteTags: (id: string, tags: string[]) => void;
  setCurrentNote: (id: string) => void;
  navigateToPrevious: () => void;
  navigateToNext: () => void;
  getCurrentNote: () => Note | null;
  getNotesForToday: () => Note[];
  getCurrentNoteIndex: () => number;
  hasMultipleNotes: () => boolean;
  deleteNote: (id: string) => void;
}

export const useNotesStore = create<NotesStore>((set, get) => ({
  // State
  notes: [],
  currentNoteId: null,
  isLoading: false,
  error: null,

  // Actions
  createNote: () => {
    const today = getTodayString();
    const newNote: Note = {
      id: uuidv4(),
      content: '',
      date: today,
      title: 'Untitled Note',
      tags: ['work', 'personal', 'projects'], // Sample tags for testing
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set((state) => ({
      notes: [...state.notes, newNote],
      currentNoteId: newNote.id,
      error: null,
    }));
  },

  updateNote: (id: string, content: string) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              content,
              title: generateNoteTitle(content),
              updatedAt: new Date().toISOString(),
            }
          : note
      ),
    }));
  },

  updateNoteTags: (id: string, tags: string[]) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? {
              ...note,
              tags,
              updatedAt: new Date().toISOString(),
            }
          : note
      ),
    }));
  },

  setCurrentNote: (id: string) => {
    set({ currentNoteId: id });
  },

  navigateToPrevious: () => {
    const state = get();
    const currentIndex = state.getCurrentNoteIndex();
    
    if (currentIndex > 0) {
      const todayNotes = state.getNotesForToday();
      const previousNote = todayNotes[currentIndex - 1];
      set({ currentNoteId: previousNote.id });
    }
  },

  navigateToNext: () => {
    const state = get();
    const currentIndex = state.getCurrentNoteIndex();
    const todayNotes = state.getNotesForToday();
    
    if (currentIndex < todayNotes.length - 1) {
      const nextNote = todayNotes[currentIndex + 1];
      set({ currentNoteId: nextNote.id });
    }
  },

  getCurrentNote: () => {
    const state = get();
    return state.notes.find((note) => note.id === state.currentNoteId) || null;
  },

  getNotesForToday: () => {
    const state = get();
    const today = getTodayString();
    return state.notes.filter((note) => note.date === today);
  },

  getCurrentNoteIndex: () => {
    const state = get();
    const todayNotes = state.getNotesForToday();
    return todayNotes.findIndex((note) => note.id === state.currentNoteId);
  },

  hasMultipleNotes: () => {
    const state = get();
    return state.getNotesForToday().length > 1;
  },

  deleteNote: (id: string) => {
    set((state) => {
      const updatedNotes = state.notes.filter((note) => note.id !== id);
      const todayNotes = updatedNotes.filter((note) => note.date === getTodayString());
      
      return {
        notes: updatedNotes,
        currentNoteId: todayNotes.length > 0 ? todayNotes[0].id : null,
      };
    });
  },
}));

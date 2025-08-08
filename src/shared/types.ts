/**
 * Shared types for Kairos application
 */

export interface Note {
  id: string;
  content: string;
  date: string; // ISO date string (YYYY-MM-DD)
  title: string; // Computed from first line or first 20 chars
  tags: string[];
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export type ColorMode = 'light' | 'dark' | 'arc';

export interface NoteStore {
  notes: Note[];
  currentNoteId: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export interface TagBarProps {
  isOpen: boolean;
  onToggle: () => void;
  tags: string[];
  onTagDelete: (tag: string) => void;
}

export interface MainMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'notes' | 'settings';
  onTabChange: (tab: 'notes' | 'settings') => void;
}

export interface SettingsProps {
  colorMode: ColorMode;
  onColorModeChange: (mode: ColorMode) => void;
}

// Date utilities
export const formatDate = (date: string): string => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${month}.${day}.${year}`;
};

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const generateNoteTitle = (content: string): string => {
  const firstLine = content.split('\n')[0].trim();
  if (firstLine.length > 0) {
    return firstLine.length > 20 ? firstLine.substring(0, 20) + '...' : firstLine;
  }
  return 'Untitled Note';
};

// Color mode utilities
export const getColorModeClasses = (mode: ColorMode) => {
  switch (mode) {
    case 'dark':
      return {
        bg: 'bg-dark-bg',
        surface: 'bg-dark-surface',
        text: 'text-dark-text',
        textSecondary: 'text-dark-textSecondary',
        border: 'border-dark-border',
      };
    case 'arc':
      return {
        bg: 'bg-arc-bg',
        surface: 'bg-arc-surface',
        text: 'text-arc-text',
        textSecondary: 'text-arc-textSecondary',
        border: 'border-arc-border',
      };
    default: // light
      return {
        bg: 'bg-light-bg',
        surface: 'bg-light-surface',
        text: 'text-light-text',
        textSecondary: 'text-light-textSecondary',
        border: 'border-light-border',
      };
  }
};

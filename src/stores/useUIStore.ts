/**
 * UI Store - Zustand store for managing UI state
 */

import { create } from 'zustand';
import { ColorMode } from '@/shared/types';

interface UIStore {
  // State
  colorMode: ColorMode;
  isMainMenuOpen: boolean;
  mainMenuActiveTab: 'notes' | 'settings';
  isTagBarOpen: boolean;
  isDatePickerOpen: boolean;
  showCarouselDot: boolean;
  carouselDotPosition: number;
  carouselDotTotal: number;

  // Actions
  setColorMode: (mode: ColorMode) => void;
  toggleMainMenu: () => void;
  closeMainMenu: () => void;
  setMainMenuTab: (tab: 'notes' | 'settings') => void;
  toggleTagBar: () => void;
  setTagBarOpen: (open: boolean) => void;
  toggleDatePicker: () => void;
  setDatePickerOpen: (open: boolean) => void;
  showCarouselDotIndicator: (position: number, total: number) => void;
  hideCarouselDotIndicator: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  // State
  colorMode: 'light',
  isMainMenuOpen: false,
  mainMenuActiveTab: 'notes',
  isTagBarOpen: false,
  isDatePickerOpen: false,
  showCarouselDot: false,
  carouselDotPosition: 0,
  carouselDotTotal: 0,

  // Actions
  setColorMode: (mode: ColorMode) => {
    set({ colorMode: mode });
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('kairos-color-mode', mode);
    }
  },

  toggleMainMenu: () => {
    set((state) => ({ isMainMenuOpen: !state.isMainMenuOpen }));
  },

  closeMainMenu: () => {
    set({ isMainMenuOpen: false });
  },

  setMainMenuTab: (tab: 'notes' | 'settings') => {
    set({ mainMenuActiveTab: tab });
  },

  toggleTagBar: () => {
    set((state) => ({ isTagBarOpen: !state.isTagBarOpen }));
  },

  setTagBarOpen: (open: boolean) => {
    set({ isTagBarOpen: open });
  },

  toggleDatePicker: () => {
    set((state) => ({ isDatePickerOpen: !state.isDatePickerOpen }));
  },

  setDatePickerOpen: (open: boolean) => {
    set({ isDatePickerOpen: open });
  },

  showCarouselDotIndicator: (position: number, total: number) => {
    set({
      showCarouselDot: true,
      carouselDotPosition: position,
      carouselDotTotal: total,
    });

    // Auto-hide after 1 second
    setTimeout(() => {
      set({ showCarouselDot: false });
    }, 1000);
  },

  hideCarouselDotIndicator: () => {
    set({ showCarouselDot: false });
  },
}));

// Initialize color mode from localStorage
if (typeof window !== 'undefined') {
  const savedColorMode = localStorage.getItem('kairos-color-mode') as ColorMode;
  if (savedColorMode && ['light', 'dark', 'arc'].includes(savedColorMode)) {
    useUIStore.getState().setColorMode(savedColorMode);
  }
}

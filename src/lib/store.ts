import { create } from 'zustand';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface AppState {
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  isProUser: boolean;
  credits: number;
  upgradeToPro: () => void;
  useCredit: () => boolean;
}

export const useAppStore = create<AppState>((set, get) => ({
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  
  toasts: [],
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { ...toast, id: Math.random().toString(36).substring(2, 9) }]
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  })),

  // Monetization State
  isProUser: true,
  credits: 9999, // Free users start with 5 AI credits
  upgradeToPro: () => set({ isProUser: true, credits: 9999 }),
  useCredit: () => {
    const state = get();
    if (state.isProUser) return true;
    if (state.credits > 0) {
      set({ credits: state.credits - 1 });
      return true;
    }
    return false;
  }
}));

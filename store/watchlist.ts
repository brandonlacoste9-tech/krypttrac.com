import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WatchlistStore {
  watchlist: string[];
  addToWatchlist: (coinId: string) => void;
  removeFromWatchlist: (coinId: string) => void;
  isInWatchlist: (coinId: string) => boolean;
}

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set, get) => ({
      watchlist: ['bitcoin', 'ethereum', 'solana'],
      addToWatchlist: (coinId) =>
        set((state) => ({
          watchlist: state.watchlist.includes(coinId)
            ? state.watchlist
            : [...state.watchlist, coinId],
        })),
      removeFromWatchlist: (coinId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((id) => id !== coinId),
        })),
      isInWatchlist: (coinId) => get().watchlist.includes(coinId),
    }),
    {
      name: 'watchlist-storage',
    }
  )
);

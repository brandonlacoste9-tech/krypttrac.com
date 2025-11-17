import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Position {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  amount: number;
  purchasePrice: number;
  purchaseDate: string;
}

interface PortfolioStore {
  positions: Position[];
  addPosition: (position: Omit<Position, 'id'>) => void;
  updatePosition: (id: string, position: Partial<Position>) => void;
  deletePosition: (id: string) => void;
  getTotalInvested: () => number;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      positions: [],
      addPosition: (position) =>
        set((state) => ({
          positions: [
            ...state.positions,
            { ...position, id: Date.now().toString() },
          ],
        })),
      updatePosition: (id, updatedPosition) =>
        set((state) => ({
          positions: state.positions.map((pos) =>
            pos.id === id ? { ...pos, ...updatedPosition } : pos
          ),
        })),
      deletePosition: (id) =>
        set((state) => ({
          positions: state.positions.filter((pos) => pos.id !== id),
        })),
      getTotalInvested: () => {
        return get().positions.reduce(
          (total, pos) => total + pos.amount * pos.purchasePrice,
          0
        );
      },
    }),
    {
      name: 'portfolio-storage',
    }
  )
);

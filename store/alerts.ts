import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Alert {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  type: 'above' | 'below';
  targetPrice: number;
  createdAt: string;
  triggered: boolean;
}

interface AlertsStore {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'createdAt' | 'triggered'>) => void;
  deleteAlert: (id: string) => void;
  triggerAlert: (id: string) => void;
  checkAlerts: (coinId: string, currentPrice: number) => void;
}

export const useAlertsStore = create<AlertsStore>()(
  persist(
    (set, get) => ({
      alerts: [],
      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              ...alert,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              triggered: false,
            },
          ],
        })),
      deleteAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        })),
      triggerAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, triggered: true } : alert
          ),
        })),
      checkAlerts: (coinId, currentPrice) => {
        const alerts = get().alerts.filter(
          (alert) => alert.coinId === coinId && !alert.triggered
        );
        alerts.forEach((alert) => {
          if (
            (alert.type === 'above' && currentPrice >= alert.targetPrice) ||
            (alert.type === 'below' && currentPrice <= alert.targetPrice)
          ) {
            get().triggerAlert(alert.id);
          }
        });
      },
    }),
    {
      name: 'alerts-storage',
    }
  )
);

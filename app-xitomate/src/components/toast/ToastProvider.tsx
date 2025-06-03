'use client';

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Toast from './Toast';

type ToastType = 'success' | 'error';
type ToastItem = { id: number; type: ToastType; message: string };

const ToastContext = createContext<(type: ToastType, message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts(t => [...t, { id, type, message }]);
    setTimeout(() => setToasts(t => t.filter(toast => toast.id !== id)), 4200);
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-1/2 right-6 -translate-y-1/2 z-50 space-y-3 max-w-xs w-full">
        {toasts.map(t => (
          <Toast key={t.id} type={t.type} message={t.message} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
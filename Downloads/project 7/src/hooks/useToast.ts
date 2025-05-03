import { useState, useCallback } from 'react';

interface ToastState {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  id: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback((message: string, type: ToastState['type'] = 'info') => {
    const id = Date.now();
    setToasts(current => [...current, { message, type, id }]);
    return id;
  }, []);

  const hideToast = useCallback((id: number) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  }, []);

  return { toasts, showToast, hideToast };
};
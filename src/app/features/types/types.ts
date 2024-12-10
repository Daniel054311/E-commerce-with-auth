export type ToastType = 'success' | 'error' | 'info'  | 'admin';

export interface Toast {
  message: string;
  type: ToastType;
  duration?: number;
}
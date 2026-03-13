import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  toasts = this.toastsSignal.asReadonly();
  private nextId = 0;

  show(message: string, type: ToastType = 'info'): void {
    const id = this.nextId++;
    const toast: Toast = { id, message, type };
    this.toastsSignal.update(toasts => [...toasts, toast]);

    setTimeout(() => {
      this.remove(id);
    }, 5000); // remove after 5 seconds
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  remove(id: number): void {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast" [ngClass]="['toast-' + toast.type]">
          <span class="icon">
            @if (toast.type === 'success') { ✔️ }
            @else if (toast.type === 'error') { ❌ }
            @else if (toast.type === 'warning') { ⚠️ }
            @else { ℹ️ }
          </span>
          <span class="message">{{ toast.message }}</span>
          <button class="close-btn" (click)="toastService.remove(toast.id)">×</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
    }
    .toast {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
      color: #fff;
      font-family: inherit;
      animation: slideIn 0.3s ease-out;
      min-width: 280px;
    }
    .toast-success { background-color: #2e7d32; }
    .toast-error { background-color: #d32f2f; }
    .toast-info { background-color: #0288d1; }
    .toast-warning { background-color: #ed6c02; }
    .icon { margin-right: 12px; font-size: 1.2em; flex-shrink: 0; }
    .message { flex: 1; font-size: 0.9rem; font-weight: 500; }
    .close-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.25rem;
      line-height: 1;
      cursor: pointer;
      margin-left: 12px;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .close-btn:hover { opacity: 1; }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideDown {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 768px) {
      .toast-container {
        top: 1rem;
        right: 1rem;
        left: 1rem;
        max-width: none;
      }
      .toast {
        min-width: 0;
        width: 100%;
        animation: slideDown 0.3s ease-out;
        padding: 10px 14px;
      }
      .message {
        font-size: 0.85rem;
      }
    }
  `]
})
export class ToastComponent {
  public toastService = inject(ToastService);
}

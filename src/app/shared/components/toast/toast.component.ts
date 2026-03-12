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
    }
    .toast {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      color: #fff;
      font-family: inherit;
      animation: slideIn 0.3s ease-out;
      min-width: 250px;
    }
    .toast-success {
      background-color: #2e7d32;
    }
    .toast-error {
      background-color: #d32f2f;
    }
    .toast-info {
      background-color: #0288d1;
    }
    .toast-warning {
      background-color: #ed6c02;
    }
    .icon {
      margin-right: 12px;
      font-size: 1.2em;
    }
    .message {
      flex: 1;
      font-size: 0.9em;
    }
    .close-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.2em;
      cursor: pointer;
      margin-left: 12px;
      opacity: 0.8;
    }
    .close-btn:hover {
      opacity: 1;
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  public toastService = inject(ToastService);
}

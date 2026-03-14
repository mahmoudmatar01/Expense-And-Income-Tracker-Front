import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="modal-backdrop" *ngIf="isOpen" (click)="close.emit()">
      <div class="modal-container" [class]="'modal-' + size" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ title }}</h2>
          <button class="close-btn" (click)="close.emit()">
            <span class="material-icons">close</span>
          </button>
        </div>
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(10, 37, 64, 0.5);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 1rem;
      animation: fadeIn 0.2s ease;
    }
    .modal-container {
      background: var(--color-surface);
      border-radius: var(--border-radius-lg);
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      max-height: 90vh;
      width: 100%;
      overflow-y: auto;
      animation: slideUp 0.25s ease;
    }
    .modal-sm { max-width: 420px; }
    .modal-md { max-width: 580px; }
    .modal-lg { max-width: 740px; }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 1.5rem 0;
      gap: 0.75rem;
    }
    .modal-header h2 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-secondary);
      flex: 1;
      min-width: 0;
    }
    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--color-text-muted);
      transition: background 0.15s;
      flex-shrink: 0;
    }
    .close-btn:hover {
      background: var(--color-background);
    }
    .modal-body { padding: 1.5rem; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    /* ── Mobile ── */
    @media (max-width: 768px) {
      .modal-backdrop {
        align-items: flex-end;
        padding: 0;
      }
      .modal-sm,
      .modal-md,
      .modal-lg {
        max-width: 100%;
        border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
        max-height: 92vh;
      }
      .modal-header {
        padding: 1.25rem 1.25rem 0;
      }
      .modal-body {
        padding: 1.25rem;
      }
    }
    /* ── Small mobile ── */
    @media (max-width: 480px) {
      .modal-header {
        padding: 1rem 1rem 0;
      }
      .modal-header h2 {
        font-size: 1rem;
      }
      .modal-body {
        padding: 1rem;
      }
    }
  `]
})
export class ModalComponent {
    @Input() isOpen = false;
    @Input() title = '';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Output() close = new EventEmitter<void>();
}

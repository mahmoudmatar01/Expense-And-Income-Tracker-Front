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
      animation: fadeIn 0.2s ease;
    }
    .modal-container {
      background: var(--color-surface);
      border-radius: var(--border-radius-lg);
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.25s ease;
    }
    .modal-sm { width: 400px; }
    .modal-md { width: 560px; }
    .modal-lg { width: 720px; }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem 1.5rem 0;
    }
    .modal-header h2 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-secondary);
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
    }
    .close-btn:hover {
      background: var(--color-background);
    }
    .modal-body { padding: 1.5rem; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class ModalComponent {
    @Input() isOpen = false;
    @Input() title = '';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Output() close = new EventEmitter<void>();
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-page-header',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="page-header">
      <div>
        <h1>{{ title }}</h1>
        <p class="subtitle" *ngIf="subtitle">{{ subtitle }}</p>
      </div>
      <div class="header-actions">
        <ng-content></ng-content>
      </div>
    </div>
  `,
    styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 2rem;
      flex-wrap: wrap; /* Allow items to wrap */
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-secondary);
    }
    .subtitle {
      color: var(--color-text-muted);
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .header-actions {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    /* Responsive adjustments for small screens */
    @media (max-width: 768px) {
      .page-header {
        flex-direction: column; /* Stack vertically */
        align-items: flex-start; /* Align items to the start when stacked */
        margin-bottom: 1.5rem;
      }
      h1 {
        font-size: 1.25rem; /* Reduce heading size */
      }
      .header-actions {
        margin-top: 1rem; /* Add space between title and actions */
        width: 100%; /* Take full width if needed */
        justify-content: flex-start; /* Align actions to the start */
      }
    }
  `]
})
export class PageHeaderComponent {
    @Input() title = '';
    @Input() subtitle = '';
}

import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    standalone: true,
    template: `
    <div class="empty-state">
      <span class="material-icons empty-icon">{{ icon }}</span>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <ng-content></ng-content>
    </div>
  `,
    styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      text-align: center;
    }
    .empty-icon {
      font-size: 48px;
      color: var(--color-border);
      margin-bottom: 1rem;
    }
    h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-secondary);
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      max-width: 360px;
      margin: 0 auto;
    }
    @media (max-width: 768px) {
      .empty-state {
        padding: 3rem 1.5rem;
      }
      .empty-icon {
        font-size: 40px;
      }
      h3 {
        font-size: 1rem;
      }
    }
    @media (max-width: 480px) {
      .empty-state {
        padding: 2rem 1rem;
      }
      .empty-icon {
        font-size: 32px;
      }
      p {
        font-size: 0.8125rem;
      }
    }
  `]
})
export class EmptyStateComponent {
    @Input() icon = 'inbox';
    @Input() title = 'Nothing here yet';
    @Input() message = '';
}

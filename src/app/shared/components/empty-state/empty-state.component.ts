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
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-secondary);
      margin-bottom: 0.5rem;
    }
    p {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      max-width: 360px;
    }
  `]
})
export class EmptyStateComponent {
    @Input() icon = 'inbox';
    @Input() title = 'Nothing here yet';
    @Input() message = '';
}

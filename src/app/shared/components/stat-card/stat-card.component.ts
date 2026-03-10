import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stat-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="stat-card" [class.gradient]="gradient">
      <div class="stat-icon" *ngIf="icon" [style.color]="iconColor" [style.background-color]="iconBg">
        <span class="material-icons">{{ icon }}</span>
      </div>
      <div class="stat-content">
        <span class="stat-label">{{ label }}</span>
        <span class="stat-value" [style.color]="valueColor">{{ value }}</span>
        <span class="stat-change" *ngIf="change" [class.positive]="isPositive" [class.negative]="!isPositive">
          <span class="material-icons change-icon">{{ isPositive ? 'trending_up' : 'trending_down' }}</span>
          {{ change }}
        </span>
      </div>
    </div>
  `,
    styles: [`
    .stat-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-lg);
      padding: 1.5rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
      box-shadow: var(--box-shadow);
    }
    .stat-card:hover {
      box-shadow: var(--box-shadow-hover);
      transform: translateY(-2px);
    }
    .stat-card.gradient {
      background: linear-gradient(135deg, var(--color-primary) 0%, #8b85ff 100%);
      border: none;
    }
    .stat-card.gradient .stat-label,
    .stat-card.gradient .stat-value {
      color: #fff !important;
    }
    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .stat-icon .material-icons {
      font-size: 24px;
    }
    .stat-content {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .stat-label {
      font-size: 0.8125rem;
      font-weight: 500;
      color: var(--color-text-muted);
      margin-bottom: 0.25rem;
    }
    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-secondary);
      line-height: 1.2;
    }
    .stat-change {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.75rem;
      font-weight: 600;
      margin-top: 0.5rem;
    }
    .stat-change.positive { color: var(--color-success); }
    .stat-change.negative { color: var(--color-danger); }
    .change-icon { font-size: 16px; }
  `]
})
export class StatCardComponent {
    @Input() label = '';
    @Input() value = '';
    @Input() icon = '';
    @Input() iconColor = 'var(--color-primary)';
    @Input() iconBg = 'rgba(99, 91, 255, 0.1)';
    @Input() valueColor = '';
    @Input() change = '';
    @Input() gradient = false;

    get isPositive(): boolean {
        return this.change.startsWith('+') || this.change.toLowerCase().includes('up');
    }
}

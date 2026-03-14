import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmptyStateComponent } from '../empty-state/empty-state.component';

export interface TableColumn {
    key: string;
    label: string;
    type?: 'text' | 'badge' | 'amount' | 'status' | 'date';
    badgeColors?: Record<string, string>;
}

@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [CommonModule, FormsModule, EmptyStateComponent],
    template: `
    <div class="table-wrapper">
      <div class="table-toolbar" *ngIf="searchable || filterOptions.length">
        <div class="search-box" *ngIf="searchable">
          <span class="material-icons search-icon">search</span>
          <input 
            type="text" 
            [placeholder]="searchPlaceholder" 
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearch()"
            class="search-input"
          />
        </div>
        <div class="filter-group" *ngIf="filterOptions.length">
          <select class="filter-select" [(ngModel)]="activeFilter" (ngModelChange)="onFilter()">
            <option value="">{{ filterLabel }}</option>
            <option *ngFor="let opt of filterOptions" [value]="opt">{{ opt }}</option>
          </select>
        </div>
      </div>
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th *ngFor="let col of columns">{{ col.label }}</th>
              <th *ngIf="showActions" class="actions-col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of displayedData; let i = index">
              <td *ngFor="let col of columns"
                  [class.owner-cell]="col.key === 'owner'"
                  [title]="col.key === 'owner' ? row[col.key] : null">
                <ng-container [ngSwitch]="col.type">
                  <span *ngSwitchCase="'badge'" class="badge" [style.background]="getBadgeBg(row[col.key], col)" [style.color]="getBadgeColor(row[col.key], col)">
                    {{ row[col.key] }}
                  </span>
                  <span *ngSwitchCase="'status'" class="status-dot" [class.active]="row[col.key] === 'Active'" [class.suspended]="row[col.key] === 'Suspended' || row[col.key] === 'Inactive'">
                    {{ row[col.key] }}
                  </span>
                  <span *ngSwitchCase="'amount'" class="amount" [class.income]="row['type'] === 'Income' || row['type'] === 'Credit'" [class.expense]="row['type'] === 'Expense' || row['type'] === 'Debit'">
                    {{ row[col.key] }}
                  </span>
                  <span *ngSwitchDefault>{{ row[col.key] }}</span>
                </ng-container>
              </td>
              <td *ngIf="showActions" class="actions-col">
                <ng-container *ngTemplateOutlet="actionsTemplate; context: {$implicit: row, index: i}"></ng-container>
              </td>
            </tr>
            <tr *ngIf="isLoading">
              <td [attr.colspan]="columns.length + (showActions ? 1 : 0)" class="center-content">
                <div class="loader"></div>
                <p>Loading data...</p>
              </td>
            </tr>
            <tr *ngIf="!isLoading && displayedData.length === 0">
              <td [attr.colspan]="columns.length + (showActions ? 1 : 0)" class="center-content" style="padding:0">
                <app-empty-state [icon]="emptyIcon" [title]="emptyTitle" [message]="emptyMessage"></app-empty-state>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer" *ngIf="data.length > pageSize">
        <span class="page-info">Showing {{ startIndex + 1 }}-{{ endIndex }} of {{ filteredData.length }}</span>
        <div class="pagination">
          <button class="page-btn" (click)="prevPage()" [disabled]="currentPage === 1">
            <span class="material-icons">chevron_left</span>
          </button>
          <button class="page-btn" (click)="nextPage()" [disabled]="currentPage >= totalPages">
            <span class="material-icons">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .table-wrapper {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      box-shadow: var(--box-shadow);
    }
    .table-toolbar {
      display: flex;
      gap: 0.75rem;
      padding: 1rem 1.5rem;
      border-bottom: 1px solid var(--color-border);
      align-items: center;
      flex-wrap: wrap;
    }
    .search-box {
      display: flex;
      align-items: center;
      background: var(--color-background);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      padding: 0 0.75rem;
      flex: 1;
      min-width: 160px;
      max-width: 320px;
    }
    .search-icon { color: var(--color-text-muted); font-size: 20px; }
    .search-input {
      border: none;
      background: transparent;
      padding: 0.5rem;
      font-size: 0.875rem;
      width: 100%;
      outline: none;
      font-family: inherit;
    }
    .filter-select {
      padding: 0.5rem 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius);
      font-size: 0.875rem;
      background: var(--color-surface);
      font-family: inherit;
      color: var(--color-text);
      cursor: pointer;
    }
    .table-responsive { 
      overflow-x: auto; 
      -webkit-overflow-scrolling: touch;
    }
    .data-table { 
      width: 100%; 
      border-collapse: collapse; 
      min-width: 600px;
    }
    .data-table th, .data-table td {
      padding: 0.875rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
      white-space: nowrap;
      max-width: 220px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .data-table th {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(246, 249, 252, 0.5);
    }
    .data-table tbody tr { transition: background 0.15s ease; }
    .data-table tbody tr:hover { background: rgba(99, 91, 255, 0.02); }
    .data-table tbody tr:last-child td { border-bottom: none; }
    .badge {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .status-dot {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      font-weight: 500;
    }
    .status-dot::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--color-text-muted);
    }
    .status-dot.active::before { background: var(--color-success); }
    .status-dot.active { color: var(--color-success); }
    .status-dot.suspended::before { background: var(--color-danger); }
    .status-dot.suspended { color: var(--color-danger); }
    .amount { font-weight: 600; }
    .amount.income { color: var(--color-success); }
    .amount.expense { color: var(--color-danger); }
    .actions-col { text-align: right; }
    .center-content {
      text-align: center;
      padding: 3rem !important;
      color: var(--color-text-muted);
    }
    .loader {
      border: 3px solid rgba(0, 0, 0, 0.1);
      border-top: 3px solid var(--color-primary, #635bff);
      border-radius: 50%;
      width: 24px;
      height: 24px;
      animation: spin 1s linear infinite;
      margin: 0 auto 0.5rem auto;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .table-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1.5rem;
      border-top: 1px solid var(--color-border);
    }
    .page-info { font-size: 0.8125rem; color: var(--color-text-muted); }
    .pagination { display: flex; gap: 0.5rem; }
    .page-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: var(--border-radius);
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      cursor: pointer;
      transition: all 0.15s;
    }
    .page-btn:hover:not(:disabled) { border-color: var(--color-primary); color: var(--color-primary); }
    .page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .page-btn .material-icons { font-size: 18px; }
    /* ── Owner email column ── */
    .owner-cell {
      max-width: 180px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /* ── Responsive ── */
    @media (max-width: 1024px) {
      .table-toolbar { padding: 0.875rem 1rem; }
      .data-table th, .data-table td { padding: 0.75rem 1rem; }
    }
    @media (max-width: 768px) {
      .table-toolbar { padding: 0.75rem; gap: 0.5rem; }
      .search-box { max-width: 100%; }
      .filter-select { width: 100%; }
      .data-table th, .data-table td { padding: 0.625rem 0.75rem; font-size: 0.8125rem; }
      .owner-cell { max-width: 120px; }
      .table-footer { flex-wrap: wrap; gap: 0.5rem; padding: 0.75rem 1rem; }
      .page-info { width: 100%; text-align: center; }
      .pagination { width: 100%; justify-content: center; }
    }
    @media (max-width: 480px) {
      .data-table th, .data-table td { padding: 0.5rem; font-size: 0.75rem; }
      .owner-cell { max-width: 90px; }
    }
  `]
})
export class DataTableComponent {
    @Input() columns: TableColumn[] = [];
    @Input() data: any[] = [];
    @Input() searchable = false;
    @Input() searchPlaceholder = 'Search...';
    @Input() filterOptions: string[] = [];
    @Input() filterLabel = 'All';
    @Input() filterKey = '';
    @Input() showActions = false;
    @Input() pageSize = 8;
    @Input() isLoading = false;
    @Input() emptyIcon = 'inbox';
    @Input() emptyTitle = 'No data found';
    @Input() emptyMessage = 'There is nothing to display here right now.';
    @ContentChild('rowActions') actionsTemplate!: TemplateRef<any>;

    @Output() searchChange = new EventEmitter<string>();
    @Output() filterChange = new EventEmitter<string>();

    searchTerm = '';
    activeFilter = '';
    currentPage = 1;

    get filteredData(): any[] {
        let result = this.data;
        if (this.searchTerm) {
            const term = this.searchTerm.toLowerCase();
            result = result.filter(row =>
                Object.values(row).some(val => String(val).toLowerCase().includes(term))
            );
        }
        if (this.activeFilter && this.filterKey) {
            result = result.filter(row => row[this.filterKey] === this.activeFilter);
        }
        return result;
    }

    get totalPages(): number {
        return Math.ceil(this.filteredData.length / this.pageSize);
    }

    get startIndex(): number {
        return (this.currentPage - 1) * this.pageSize;
    }

    get endIndex(): number {
        return Math.min(this.startIndex + this.pageSize, this.filteredData.length);
    }

    get displayedData(): any[] {
        return this.filteredData.slice(this.startIndex, this.endIndex);
    }

    onSearch() {
        this.currentPage = 1;
        this.searchChange.emit(this.searchTerm);
    }

    onFilter() {
        this.currentPage = 1;
        this.filterChange.emit(this.activeFilter);
    }

    prevPage() {
        if (this.currentPage > 1) this.currentPage--;
    }

    nextPage() {
        if (this.currentPage < this.totalPages) this.currentPage++;
    }

    getBadgeBg(value: string, col: TableColumn): string {
        if (col.badgeColors && col.badgeColors[value]) return col.badgeColors[value] + '20';
        return 'rgba(99, 91, 255, 0.1)';
    }

    getBadgeColor(value: string, col: TableColumn): string {
        if (col.badgeColors && col.badgeColors[value]) return col.badgeColors[value];
        return 'var(--color-primary)';
    }
}

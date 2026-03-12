import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CategoryService } from '../../../core/services/category.service';
import { BudgetService } from '../../../core/services/budget.service';

@Component({
    selector: 'app-parent-budgets',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, ModalComponent],
    templateUrl: './budgets.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentBudgetsComponent implements OnInit {
    private categoryService = inject(CategoryService);
    private budgetService = inject(BudgetService);
    private cdr = inject(ChangeDetectorRef);

    Math = Math;

    isLoading = true;
    errorMessage = '';
    showModal = false;

    budgets: any[] = [];
    allCategories: any[] = [];

    get totalBudget() { return this.budgets.reduce((s, b) => s + b.limit, 0); }
    get totalSpent() { return this.budgets.reduce((s, b) => s + b.spent, 0); }
    get totalRemaining() { return this.totalBudget - this.totalSpent; }

    newBudget = { categoryId: null as number | null, limit: 0 };

    ngOnInit() {
        this.loadBudgets();
    }

    loadBudgets() {
        this.isLoading = true;
        this.categoryService.getCategoriesDetails().subscribe({
            next: (res) => {
                if (res.success) {
                    this.allCategories = res.data;
                    this.budgets = res.data
                        .filter(c => c.budgetLimit > 0)
                        .map(c => ({
                            categoryId: c.categoryId,
                            category: c.categoryName,
                            limit: c.budgetLimit,
                            spent: c.usedAmount || 0,
                            icon: 'category',
                            color: '#635BFF'
                        }));
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Failed to load budgets.';
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    addBudget() {
        if (this.newBudget.categoryId && this.newBudget.limit > 0) {
            this.budgetService.createBudget(this.newBudget.categoryId, this.newBudget.limit).subscribe({
                next: () => {
                    this.loadBudgets();
                    this.showModal = false;
                    this.newBudget = { categoryId: null, limit: 0 };
                    this.cdr.detectChanges();
                },
                error: () => {
                    alert('Failed to set budget.');
                    this.cdr.detectChanges();
                }
            });
        }
    }

    getStatus(budget: any): string {
        const pct = budget.spent / budget.limit;
        if (pct >= 0.95) return 'danger';
        if (pct >= 0.75) return 'warning';
        return 'safe';
    }

    getStatusColor(budget: any): string {
        const s = this.getStatus(budget);
        if (s === 'danger') return '#E74C3C';
        if (s === 'warning') return '#F39C12';
        return budget.color;
    }
}

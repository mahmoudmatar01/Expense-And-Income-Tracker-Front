import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-parent-budgets',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, ModalComponent],
    templateUrl: './budgets.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentBudgetsComponent {
    Math = Math;
    showModal = false;

    budgets = [
        { category: 'Groceries', limit: 500, spent: 300, icon: 'shopping_cart', color: '#635BFF' },
        { category: 'Utilities', limit: 200, spent: 185, icon: 'power', color: '#3498DB' },
        { category: 'Entertainment', limit: 150, spent: 100, icon: 'movie', color: '#E74C3C' },
        { category: 'Transport', limit: 200, spent: 80, icon: 'directions_car', color: '#F39C12' },
        { category: 'Shopping', limit: 300, spent: 290, icon: 'shopping_bag', color: '#9B59B6' },
        { category: 'Food', limit: 400, spent: 250, icon: 'restaurant', color: '#2ECC71' },
    ];

    get totalBudget() { return this.budgets.reduce((s, b) => s + b.limit, 0); }
    get totalSpent() { return this.budgets.reduce((s, b) => s + b.spent, 0); }
    get totalRemaining() { return this.totalBudget - this.totalSpent; }

    newBudget = { category: '', limit: 0 };

    addBudget() {
        this.budgets.push({
            category: this.newBudget.category,
            limit: this.newBudget.limit,
            spent: 0,
            icon: 'category',
            color: '#635BFF'
        });
        this.showModal = false;
        this.newBudget = { category: '', limit: 0 };
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

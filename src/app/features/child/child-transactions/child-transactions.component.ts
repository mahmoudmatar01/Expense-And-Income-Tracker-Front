import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-child-transactions',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent, ModalComponent],
    templateUrl: './child-transactions.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ChildTransactionsComponent {
    showModal = false;

    columns: TableColumn[] = [
        { key: 'date', label: 'Date' },
        { key: 'description', label: 'Description' },
        { key: 'category', label: 'Category', type: 'badge' },
        { key: 'type', label: 'Type', type: 'badge', badgeColors: { Allowance: '#2ECC71', Expense: '#E74C3C' } },
        { key: 'amount', label: 'Amount', type: 'amount' },
    ];

    transactions = [
        { date: 'Mar 4, 2026', description: 'School Lunch', category: 'Food', type: 'Expense', amount: '-$5.50' },
        { date: 'Mar 3, 2026', description: 'Monthly Allowance', category: 'Allowance', type: 'Allowance', amount: '+$100.00' },
        { date: 'Mar 2, 2026', description: 'Movie Ticket', category: 'Entertainment', type: 'Expense', amount: '-$15.00' },
        { date: 'Mar 1, 2026', description: 'Bus Pass', category: 'Transport', type: 'Expense', amount: '-$3.00' },
        { date: 'Feb 28, 2026', description: 'Stickers', category: 'Shopping', type: 'Expense', amount: '-$8.00' },
        { date: 'Feb 25, 2026', description: 'Candy', category: 'Food', type: 'Expense', amount: '-$2.50' },
    ];

    newExpense = { amount: '', category: 'Food', wallet: 'My Wallet', description: '', date: '' };

    addExpense() {
        this.transactions.unshift({
            date: this.newExpense.date || 'Mar 5, 2026',
            description: this.newExpense.description,
            category: this.newExpense.category,
            type: 'Expense',
            amount: '-$' + this.newExpense.amount
        });
        this.showModal = false;
        this.newExpense = { amount: '', category: 'Food', wallet: 'My Wallet', description: '', date: '' };
    }
}

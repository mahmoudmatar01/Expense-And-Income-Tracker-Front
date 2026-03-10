import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-parent-transactions',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent, ModalComponent],
    templateUrl: './transactions.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentTransactionsComponent {
    showModal = false;

    columns: TableColumn[] = [
        { key: 'date', label: 'Date' },
        { key: 'description', label: 'Description' },
        { key: 'category', label: 'Category', type: 'badge' },
        { key: 'wallet', label: 'Wallet' },
        { key: 'type', label: 'Type', type: 'badge', badgeColors: { Income: '#2ECC71', Expense: '#E74C3C' } },
        { key: 'amount', label: 'Amount', type: 'amount' },
    ];

    transactions = [
        { date: 'Mar 4, 2026', description: 'Weekly groceries', category: 'Groceries', wallet: 'Main Wallet', type: 'Expense', amount: '-$150.00' },
        { date: 'Mar 3, 2026', description: 'Monthly salary', category: 'Salary', wallet: 'Main Wallet', type: 'Income', amount: '+$3,000.00' },
        { date: 'Mar 2, 2026', description: 'Electric bill', category: 'Utilities', wallet: 'Main Wallet', type: 'Expense', amount: '-$75.50' },
        { date: 'Mar 1, 2026', description: 'Cinema tickets', category: 'Entertainment', wallet: 'Savings', type: 'Expense', amount: '-$45.00' },
        { date: 'Feb 28, 2026', description: 'Freelance project', category: 'Freelance', wallet: 'Main Wallet', type: 'Income', amount: '+$500.00' },
        { date: 'Feb 27, 2026', description: 'Gas station', category: 'Transport', wallet: 'Main Wallet', type: 'Expense', amount: '-$60.00' },
        { date: 'Feb 26, 2026', description: 'Restaurant dinner', category: 'Food', wallet: 'Main Wallet', type: 'Expense', amount: '-$85.00' },
        { date: 'Feb 25, 2026', description: 'Online shopping', category: 'Shopping', wallet: 'Savings', type: 'Expense', amount: '-$120.00' },
        { date: 'Feb 24, 2026', description: 'Bonus', category: 'Salary', wallet: 'Main Wallet', type: 'Income', amount: '+$750.00' },
        { date: 'Feb 23, 2026', description: 'Gym membership', category: 'Health', wallet: 'Main Wallet', type: 'Expense', amount: '-$50.00' },
    ];

    newTxn = { type: 'Expense', amount: '', category: '', wallet: 'Main Wallet', description: '', date: '' };

    addTransaction() {
        const prefix = this.newTxn.type === 'Income' ? '+$' : '-$';
        this.transactions.unshift({
            date: this.newTxn.date || 'Mar 5, 2026',
            description: this.newTxn.description,
            category: this.newTxn.category,
            wallet: this.newTxn.wallet,
            type: this.newTxn.type,
            amount: prefix + this.newTxn.amount
        });
        this.showModal = false;
        this.newTxn = { type: 'Expense', amount: '', category: '', wallet: 'Main Wallet', description: '', date: '' };
    }
}

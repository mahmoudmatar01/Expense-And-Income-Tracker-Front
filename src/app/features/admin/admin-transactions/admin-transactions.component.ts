import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
    selector: 'app-admin-transactions',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent],
    templateUrl: './admin-transactions.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class AdminTransactionsComponent {
    columns: TableColumn[] = [
        { key: 'id', label: 'ID' },
        { key: 'user', label: 'User' },
        { key: 'type', label: 'Type', type: 'badge', badgeColors: { Income: '#2ECC71', Expense: '#E74C3C', Transfer: '#3498DB' } },
        { key: 'amount', label: 'Amount', type: 'amount' },
        { key: 'category', label: 'Category' },
        { key: 'date', label: 'Date' },
        { key: 'flagged', label: 'Status', type: 'status' },
    ];

    transactions = [
        { id: 'TXN-001', user: 'Sarah Johnson', type: 'Expense', amount: '-$150.00', category: 'Groceries', date: 'Mar 4, 2026', flagged: 'Active' },
        { id: 'TXN-002', user: 'Mike Chen', type: 'Income', amount: '+$3,000.00', category: 'Salary', date: 'Mar 3, 2026', flagged: 'Active' },
        { id: 'TXN-003', user: 'Emma Wilson', type: 'Expense', amount: '-$5.50', category: 'Food', date: 'Mar 3, 2026', flagged: 'Active' },
        { id: 'TXN-004', user: 'Alex Brown', type: 'Transfer', amount: '-$500.00', category: 'Transfer', date: 'Mar 2, 2026', flagged: 'Suspended' },
        { id: 'TXN-005', user: 'Lisa Davis', type: 'Expense', amount: '-$1,200.00', category: 'Rent', date: 'Mar 1, 2026', flagged: 'Active' },
        { id: 'TXN-006', user: 'Tom Harris', type: 'Income', amount: '+$4,500.00', category: 'Salary', date: 'Mar 1, 2026', flagged: 'Active' },
        { id: 'TXN-007', user: 'Jake Miller', type: 'Expense', amount: '-$2,500.00', category: 'Unknown', date: 'Feb 28, 2026', flagged: 'Suspended' },
        { id: 'TXN-008', user: 'David Kim', type: 'Expense', amount: '-$89.99', category: 'Subscriptions', date: 'Feb 28, 2026', flagged: 'Active' },
    ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
    selector: 'app-suspended-accounts',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent, DataTableComponent],
    templateUrl: './suspended-accounts.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class SuspendedAccountsComponent {
    columns: TableColumn[] = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role', type: 'badge', badgeColors: { Parent: '#635BFF', Child: '#F39C12' } },
        { key: 'suspendedDate', label: 'Suspended Date' },
        { key: 'reason', label: 'Reason' },
    ];

    suspendedUsers = [
        { name: 'Alex Brown', email: 'alex@example.com', role: 'Child', suspendedDate: 'Feb 20, 2026', reason: 'Policy violation' },
        { name: 'Sophie Turner', email: 'sophie@example.com', role: 'Child', suspendedDate: 'Mar 1, 2026', reason: 'Suspicious activity' },
        { name: 'James White', email: 'james@example.com', role: 'Parent', suspendedDate: 'Feb 28, 2026', reason: 'Multiple failed payments' },
    ];

    reactivate(user: any) {
        this.suspendedUsers = this.suspendedUsers.filter(u => u.email !== user.email);
    }
}

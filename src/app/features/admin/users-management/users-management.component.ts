import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-users-management',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent, ModalComponent],
    templateUrl: './users-management.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class UsersManagementComponent {
    showUserModal = false;
    selectedUser: any = null;

    columns: TableColumn[] = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role', type: 'badge', badgeColors: { Parent: '#635BFF', Child: '#F39C12', Admin: '#0A2540' } },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'transactions', label: 'Transactions' },
        { key: 'joined', label: 'Joined' },
    ];

    users = [
        { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Parent', status: 'Active', transactions: 156, joined: 'Jan 15, 2026' },
        { name: 'Mike Chen', email: 'mike@example.com', role: 'Parent', status: 'Active', transactions: 89, joined: 'Feb 2, 2026' },
        { name: 'Emma Wilson', email: 'emma@example.com', role: 'Child', status: 'Active', transactions: 34, joined: 'Feb 10, 2026' },
        { name: 'Alex Brown', email: 'alex@example.com', role: 'Child', status: 'Suspended', transactions: 12, joined: 'Feb 15, 2026' },
        { name: 'Lisa Davis', email: 'lisa@example.com', role: 'Parent', status: 'Active', transactions: 210, joined: 'Dec 5, 2025' },
        { name: 'Tom Harris', email: 'tom@example.com', role: 'Parent', status: 'Active', transactions: 67, joined: 'Mar 1, 2026' },
        { name: 'Jake Miller', email: 'jake@example.com', role: 'Child', status: 'Active', transactions: 23, joined: 'Jan 20, 2026' },
        { name: 'Sophie Turner', email: 'sophie@example.com', role: 'Child', status: 'Suspended', transactions: 8, joined: 'Feb 28, 2026' },
        { name: 'David Kim', email: 'david@example.com', role: 'Parent', status: 'Active', transactions: 145, joined: 'Nov 10, 2025' },
        { name: 'Mia Garcia', email: 'mia@example.com', role: 'Child', status: 'Active', transactions: 41, joined: 'Jan 8, 2026' },
    ];

    viewUser(user: any) {
        this.selectedUser = user;
        this.showUserModal = true;
    }

    suspendUser(user: any) {
        user.status = 'Suspended';
    }

    activateUser(user: any) {
        user.status = 'Active';
    }

    deleteUser(user: any) {
        this.users = this.users.filter(u => u.email !== user.email);
    }
}

import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-users-management',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent, ModalComponent],
    templateUrl: './users-management.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class UsersManagementComponent implements OnInit {
    private adminService = inject(AdminService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';
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

    users: any[] = [];
    currentPage = 0;
    totalPages = 1;

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.isLoading = true;
        this.errorMessage = '';
        this.adminService.getUsers(this.currentPage, 10).subscribe({
            next: (res) => {
                const pageData = res.data || res;
                this.users = ((pageData as any).content || []).map((u: any) => ({
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    role: u.user_role === 'ROLE_PARENT' ? 'Parent' : u.user_role === 'ROLE_CHILD' ? 'Child' : 'Admin',
                    status: u.user_status === 'ACTIVE' ? 'Active' : 'Suspended',
                    transactions: u.numOfTransaction || 0,
                    joined: new Date(u.date_joined).toLocaleDateString()
                }));
                this.totalPages = (pageData as any).totalPages || 1;
                this.currentPage = (pageData as any).number ?? this.currentPage;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.errorMessage = 'Failed to load users.';
                this.toastService.error('Failed to load users.');
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.loadUsers();
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.loadUsers();
        }
    }

    viewUser(user: any) {
        this.selectedUser = user;
        this.showUserModal = true;
    }

    suspendUser(user: any) {
        this.adminService.changeUserStatus(user.id).subscribe({
            next: () => {
                this.loadUsers();
                this.toastService.success('User status changed successfully.');
                this.cdr.detectChanges();
            },
            error: () => {
                this.toastService.error('Failed to change user status.');
                this.cdr.detectChanges();
            }
        });
    }

    activateUser(user: any) {
        this.adminService.changeUserStatus(user.id).subscribe({
            next: () => {
                this.loadUsers();
                this.toastService.success('User status changed successfully.');
                this.cdr.detectChanges();
            },
            error: () => {
                this.toastService.error('Failed to change user status.');
                this.cdr.detectChanges();
            }
        });
    }

    deleteUser(user: any) {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            this.adminService.deleteUser(user.id).subscribe({
                next: () => {
                    this.loadUsers();
                    this.showUserModal = false;
                    this.cdr.detectChanges();
                },
                error: () => {
                    alert('Failed to delete user.');
                    this.cdr.detectChanges();
                }
            });
        }
    }
}

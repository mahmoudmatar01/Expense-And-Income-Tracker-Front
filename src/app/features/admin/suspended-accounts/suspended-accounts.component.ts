import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-suspended-accounts',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent, DataTableComponent],
    templateUrl: './suspended-accounts.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class SuspendedAccountsComponent implements OnInit {
    private adminService = inject(AdminService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';

    columns: TableColumn[] = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role', type: 'badge', badgeColors: { Parent: '#635BFF', Child: '#F39C12' } },
        { key: 'joined', label: 'Joined' },
    ];

    suspendedUsers: any[] = [];
    currentPage = 0;
    totalPages = 1;

    ngOnInit() {
        this.loadSuspendedUsers();
    }

    loadSuspendedUsers() {
        this.isLoading = true;
        this.adminService.getSuspendedUsers(this.currentPage, 8).subscribe({
            next: (res) => {
                const pageData = res.data || res;
                this.suspendedUsers = ((pageData as any).content || []).map((u: any) => ({
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    role: u.user_role === 'ROLE_PARENT' ? 'Parent' : u.user_role === 'ROLE_CHILD' ? 'Child' : 'Admin',
                    joined: new Date(u.date_joined).toLocaleDateString()
                }));
                this.totalPages = (pageData as any).totalPages || 1;
                this.currentPage = (pageData as any).number ?? this.currentPage;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Failed to load suspended users.';
                this.isLoading = false;
                this.toastService.error('Failed to load suspended users.');
                this.cdr.detectChanges();
            }
        });
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.loadSuspendedUsers();
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.loadSuspendedUsers();
        }
    }

    reactivate(user: any) {
        this.adminService.changeUserStatus(user.id).subscribe({
            next: () => {
                this.loadSuspendedUsers();
                this.toastService.success('User reactivated successfully.');
                this.cdr.detectChanges();
            },
            error: () => {
                this.toastService.error('Failed to reactivate user.');
                this.cdr.detectChanges();
            }
        });
    }
}

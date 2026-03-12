import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { AdminService } from '../../../core/services/admin.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-admin-transactions',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent],
    templateUrl: './admin-transactions.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class AdminTransactionsComponent implements OnInit {
    private adminService = inject(AdminService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';

    columns: TableColumn[] = [
        { key: 'id', label: 'ID' },
        { key: 'user', label: 'User' },
        { key: 'type', label: 'Type', type: 'badge', badgeColors: { INCOME: '#2ECC71', EXPENSE: '#E74C3C' } },
        { key: 'amount', label: 'Amount', type: 'amount' },
        { key: 'category', label: 'Category' },
        { key: 'date', label: 'Date' },
        { key: 'flagged', label: 'User Status', type: 'status' },
    ];

    transactions: any[] = [];
    currentPage = 0;
    totalPages = 1;

    ngOnInit() {
        this.loadTransactions();
    }

    loadTransactions() {
        this.isLoading = true;
        this.adminService.getAdminTransactions(this.currentPage, 10).subscribe({
            next: (res) => {
                const pageData = res.data || res;
                this.transactions = ((pageData as any).content || []).map((t: any) => ({
                    id: t.transactionId,
                    user: t.userName,
                    type: t.transactionType,
                    amount: (t.transactionType === 'INCOME' ? '+$' : '-$') + t.amount,
                    category: t.category || 'N/A',
                    date: new Date(t.date).toLocaleDateString(),
                    flagged: t.userStatus === 'ACTIVE' ? 'Active' : 'Suspended',
                    description: t.description || 'No description'
                }));
                this.totalPages = (pageData as any).totalPages || 1;
                this.currentPage = (pageData as any).number ?? this.currentPage;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Failed to load transactions.';
                this.toastService.error('Failed to load transactions.');
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.loadTransactions();
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.loadTransactions();
        }
    }
}

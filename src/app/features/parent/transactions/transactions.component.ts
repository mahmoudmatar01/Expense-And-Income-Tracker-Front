import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { TransactionService } from '../../../core/services/transaction.service';
import { WalletService } from '../../../core/services/wallet.service';
import { CategoryService } from '../../../core/services/category.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-parent-transactions',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent, ModalComponent],
    templateUrl: './transactions.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentTransactionsComponent implements OnInit {
    private transactionService = inject(TransactionService);
    private walletService = inject(WalletService);
    private categoryService = inject(CategoryService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';
    showModal = false;

    columns: TableColumn[] = [
        { key: 'owner', label: 'Owner' },
        { key: 'date', label: 'Date' },
        { key: 'category', label: 'Category', type: 'badge' },
        { key: 'wallet', label: 'Wallet' },
        { key: 'type', label: 'Type', type: 'badge', badgeColors: { INCOME: '#2ECC71', EXPENSE: '#E74C3C' } },
        { key: 'amount', label: 'Amount', type: 'amount' },
        { key: 'description', label: 'Description' },
    ];

    transactions: any[] = [];
    wallets: any[] = [];
    categories: any[] = [];

    // Pagination
    currentPage = 0;
    totalPages = 1;

    newTxn = { type: 'EXPENSE', amount: null as number | null, categoryId: null as number | null, walletId: null as number | null, description: '' };

    ngOnInit() {
        this.loadTransactions();
        this.loadWallets();
        this.loadCategories();
    }

    loadTransactions() {
        this.isLoading = true;
        this.transactionService.getParentTransactions(this.currentPage, 8).subscribe({
            next: (res) => {
                const pageData = res.data || res;
                this.transactions = ((pageData as any).content || []).map((t: any) => {
                    const prefix = t.type === 'INCOME' ? '+$' : '-$';
                    return {
                        ...t,
                        date: new Date(t.date || t.createdAt).toLocaleDateString(),
                        amount: prefix + t.amount,
                        wallet: t.wallet || t.walletName,
                        category: t.category || t.categoryName || 'None',
                        description: t.description || 'No description'
                    };
                });
                this.totalPages = (pageData as any).totalPages || 1;
                this.currentPage = (pageData as any).number ?? this.currentPage;
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
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

    loadWallets() {
        this.walletService.getParentWallets().subscribe({
            next: (res) => {
                if (res.success) this.wallets = res.data;
                this.cdr.detectChanges();
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    loadCategories() {
        this.categoryService.getCategories().subscribe({
            next: (res) => {
                if (res.success) this.categories = res.data;
                this.cdr.detectChanges();
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    addTransaction() {
        if (!this.newTxn.walletId || !this.newTxn.amount) return;
        if (this.newTxn.type === 'EXPENSE' && !this.newTxn.categoryId) return;

        const payload = {
            walletId: this.newTxn.walletId,
            categoryId: this.newTxn.categoryId,
            amount: this.newTxn.amount,
            type: this.newTxn.type,
            description: this.newTxn.description
        };

        this.transactionService.createTransaction(payload).subscribe({
            next: () => {
                this.toastService.success('Transaction created successfully.');
                this.currentPage = 0;
                this.loadTransactions();
                this.showModal = false;
                this.newTxn = { type: 'EXPENSE', amount: null, categoryId: null, walletId: null, description: '' };
                this.cdr.detectChanges();
            },
            error: () => {
                this.toastService.error('Failed to create transaction. Please try again.');
                this.cdr.detectChanges();
            }
        });
    }
}

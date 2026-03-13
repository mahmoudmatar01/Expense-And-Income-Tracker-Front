import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { TransactionService } from '../../../core/services/transaction.service';
import { CategoryService } from '../../../core/services/category.service';
import { WalletService } from '../../../core/services/wallet.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-child-transactions',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PageHeaderComponent,
        DataTableComponent,
        ModalComponent
    ],
    templateUrl: './child-transactions.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ChildTransactionsComponent implements OnInit {

    private transactionService = inject(TransactionService);
    private categoryService = inject(CategoryService);
    private walletService = inject(WalletService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);
    private fb = inject(FormBuilder);

    isLoading = true;
    showModal = false;
    txnForm!: FormGroup;

    columns: TableColumn[] = [
        { key: 'date', label: 'Date' },
        { key: 'description', label: 'Description' },
        { key: 'category', label: 'Category', type: 'badge' },
        { key: 'wallet', label: 'Wallet' },
        { key: 'type', label: 'Type', type: 'badge', badgeColors: { INCOME: '#2ECC71', EXPENSE: '#E74C3C' } },
        { key: 'amount', label: 'Amount', type: 'amount' },
    ];

    transactions: any[] = [];
    categories: any[] = [];
    wallets: any[] = [];

    currentPage = 0;
    totalPages = 1;

    ngOnInit() {
        this.initForm();
        this.loadTransactions();
        this.loadCategories();
        this.loadWallets();
    }

    initForm() {
        this.txnForm = this.fb.group({
            type: ['EXPENSE', Validators.required],
            amount: [null, [Validators.required, Validators.min(0.01)]],
            walletId: [null, Validators.required],
            categoryId: [null, Validators.required],
            description: ['']
        });
    }

    openModal() {
        this.txnForm.reset({
            type: 'EXPENSE',
            amount: null,
            walletId: null,
            categoryId: null,
            description: ''
        });

        this.showModal = true;
    }

    loadTransactions() {
        this.isLoading = true;
        this.transactionService.getChildTransactions(this.currentPage, 8).subscribe({
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

    loadCategories() {
        this.categoryService.getCategories().subscribe({
            next: (res) => {
                if (res.success) {
                    this.categories = res.data;
                }
                this.cdr.detectChanges();
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    loadWallets() {
        this.walletService.getChildWallet().subscribe({
            next: (res) => {
                if (res.success) {
                    this.wallets = res.data;
                }
                this.cdr.detectChanges();
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    submitTransaction() {
        if (this.txnForm.invalid) {
            this.txnForm.markAllAsTouched();
            return;
        }
        const payload = this.txnForm.value;
        this.transactionService.createTransaction(payload).subscribe({
            next: () => {
                this.currentPage = 0;
                this.loadTransactions();
                this.showModal = false;
                this.txnForm.reset({
                    type: 'EXPENSE'
                });

                this.toastService.success('Transaction recorded successfully!');
                this.cdr.detectChanges();
            },

            error: () => {
                this.toastService.error('Failed to save transaction.');
                this.cdr.detectChanges();
            }
        });
    }
}
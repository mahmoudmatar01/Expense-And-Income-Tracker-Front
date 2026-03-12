import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { WalletService } from '../../../core/services/wallet.service';
import { ChildAccountService } from '../../../core/services/child-account.service';
import { ToastService } from '../../../core/services/toast.service';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
    selector: 'app-parent-wallets',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, ModalComponent, EmptyStateComponent],
    templateUrl: './wallets.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentWalletsComponent implements OnInit {
    private walletService = inject(WalletService);
    private childService = inject(ChildAccountService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';
    showModal = false;
    editingWallet: any = null;

    wallets: any[] = [];
    children: any[] = [];

    newWallet = { name: '', currency: 'USD', balance: 0, assignedChildId: null as number | null };

    ngOnInit() {
        this.loadWallets();
        this.loadChildren();
    }

    loadWallets() {
        this.isLoading = true;
        this.walletService.getParentWallets().subscribe({
            next: (res) => {
                if (res.success) {
                    this.wallets = res.data.map(w => ({
                        ...w,
                        color: '#635BFF',
                        icon: w.children && w.children.length > 0 ? 'child_care' : 'account_balance_wallet',
                        assigned: w.children && w.children.length > 0 ? w.children.map(c => c.name).join(', ') : null,
                        lastActivity: w.updatedAt ? new Date(w.updatedAt).toLocaleDateString() : 'New'
                    }));
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Failed to load wallets.';
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    loadChildren() {
        this.childService.getParentChildren().subscribe({
            next: (res) => {
                this.children = (res.success && res.data) ? res.data : [];
                this.cdr.detectChanges();
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    openAdd() {
        this.editingWallet = null;
        this.newWallet = { name: '', currency: 'USD', balance: 0, assignedChildId: null };
        this.showModal = true;
    }

    openEdit(wallet: any) {
        this.editingWallet = wallet;
        this.newWallet = {
            name: wallet.name,
            currency: wallet.currency,
            balance: wallet.balance,
            assignedChildId: wallet.children && wallet.children.length > 0 ? wallet.children[0].id : null
        };
        this.showModal = true;
    }

    saveWallet() {
        if (!this.newWallet.name) return;

        const payload: any = {
            name: this.newWallet.name,
            currency: this.newWallet.currency,
            balance: this.newWallet.balance,
            childrenIds: this.newWallet.assignedChildId ? [this.newWallet.assignedChildId] : []
        };

        const obs$ = this.editingWallet
            ? this.walletService.updateWallet(this.editingWallet.id, payload)
            : this.walletService.createWallet(payload);

        obs$.subscribe({
            next: () => {
                this.toastService.success(this.editingWallet ? 'Wallet updated successfully.' : 'Wallet created successfully.');
                this.loadWallets();
                this.showModal = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.toastService.error('Failed to save wallet. Please try again.');
                this.cdr.detectChanges();
            }
        });
    }

    deleteWallet(wallet: any) {
        if (confirm(`Are you sure you want to delete ${wallet.name}?`)) {
            this.walletService.deleteWallet(wallet.id).subscribe({
                next: () => {
                    this.toastService.success('Wallet deleted successfully.');
                    this.loadWallets();
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    const msg = err.error?.message || 'Failed to delete wallet.';
                    this.toastService.error(msg);
                    this.cdr.detectChanges();
                }
            });
        }
    }
}

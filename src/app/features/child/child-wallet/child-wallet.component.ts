import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { WalletService } from '../../../core/services/wallet.service';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
    selector: 'app-child-wallet',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent, StatCardComponent],
    templateUrl: './child-wallet.component.html',
    styleUrls: ['./child-wallet.component.css', '../../../shared/styles/pages.css']
})
export class ChildWalletComponent implements OnInit {
    private walletService = inject(WalletService);
    private transactionService = inject(TransactionService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';

    balance = 0.00;
    currency = 'USD';
    transactions: any[] = [];

    ngOnInit() {
        this.loadWallet();
        this.loadTransactions();
    }

    loadWallet() {
        this.walletService.getChildWallet().subscribe({
            next: (res) => {
                if (res.success && res.data && res.data.length > 0) {
                    this.balance = res.data.reduce((sum, w) => sum + w.balance, 0);
                    this.currency = res.data[0].currency;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Failed to load wallet.';
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    loadTransactions() {
        this.transactionService.getChildTransactions(0, 10).subscribe({
            next: (res) => {
                const pageData = res.data || res;
                this.transactions = ((pageData as any).content || []).map((t: any) => ({
                    date: new Date(t.date || t.createdAt).toLocaleDateString(),
                    description: t.description || t.category || t.categoryName,
                    type: t.type,
                    amount: t.type === 'INCOME' ? t.amount : -t.amount,
                    icon: t.type === 'INCOME' ? 'monetization_on' : 'shopping_cart'
                }));
                this.cdr.detectChanges();
            },
            error: () => { 
                this.cdr.detectChanges();
            }
        });
    }
}

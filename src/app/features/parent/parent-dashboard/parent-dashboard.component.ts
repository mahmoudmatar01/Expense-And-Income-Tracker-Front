import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartConfiguration } from 'chart.js';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { WalletService } from '../../../core/services/wallet.service';
import { CategoryService } from '../../../core/services/category.service';
import { ChildAccountService } from '../../../core/services/child-account.service';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
    selector: 'app-parent-dashboard',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PageHeaderComponent, StatCardComponent],
    templateUrl: './parent-dashboard.component.html',
    styleUrls: ['./parent-dashboard.component.css', '../../../shared/styles/pages.css']
})
export class ParentDashboardComponent implements OnInit {
    private walletService = inject(WalletService);
    private categoryService = inject(CategoryService);
    private childService = inject(ChildAccountService);
    private transactionService = inject(TransactionService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';

    totalBalance = 0;
    budgetRemaining = 0;
    monthlyExpenses = 0;

    recentTransactions: any[] = [];
    childrenSpending: any[] = [];

    public pieOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
    };

    public pieChartData: ChartData<'doughnut'> | null = null;

    ngOnInit() {
        this.loadWallets();
        this.loadCategories();
        this.loadChildren();
        this.loadTransactions();
    }

    loadWallets() {
        this.walletService.getParentWallets().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    this.totalBalance = res.data.reduce((sum, w) => sum + w.balance, 0);
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Failed to load wallet data.';
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    loadCategories() {
        this.categoryService.getCategoriesDetails().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    let totalLimit = 0;
                    let totalSpent = 0;

                    const labels: string[] = [];
                    const data: number[] = [];

                    res.data.forEach(c => {
                        totalLimit += (c.budgetLimit || 0);
                        totalSpent += (c.usedAmount || 0);

                        if (c.usedAmount > 0) {
                            labels.push(c.categoryName);
                            data.push(c.usedAmount);
                        }
                    });

                    this.monthlyExpenses = totalSpent;
                    this.budgetRemaining = totalLimit - totalSpent;

                    if (data.length > 0) {
                        this.pieChartData = {
                            labels,
                            datasets: [{
                                data,
                                backgroundColor: ['#635BFF', '#2ECC71', '#E74C3C', '#F39C12', '#3498DB', '#9B59B6', '#E91E63']
                            }]
                        };
                    }
                    this.cdr.detectChanges();
                }
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    loadChildren() {
        this.childService.getParentChildren().subscribe({
            next: (res) => {
                const childrenData = res.success && res.data ? res.data : [];
                this.childrenSpending = childrenData.map(c => ({
                    name: c.name,
                    spent: c.totalSpentThisMonth || 0,
                    limit: c.spendingLimit || 0,
                    avatar: c.name.charAt(0).toUpperCase()
                }));
                this.cdr.detectChanges();
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    loadTransactions() {
        this.transactionService.getParentTransactions(0, 5).subscribe({
            next: (res) => {
                const pageData = res.data || res;
                this.recentTransactions = ((pageData as any).content || []).map((t: any) => ({
                    date: new Date(t.date || t.createdAt).toLocaleDateString(),
                    category: t.category || t.categoryName || 'None',
                    wallet: t.wallet || t.walletName,
                    type: t.type,
                    amount: (t.type === 'INCOME' ? '+$' : '-$') + t.amount,
                    description: t.description || 'No description'
                }));
                this.cdr.detectChanges();
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }
}

import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartConfiguration } from 'chart.js';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { ChildInsightsService } from '../../../core/services/child-insights.service';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
    selector: 'app-child-dashboard',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PageHeaderComponent, StatCardComponent],
    templateUrl: './child-dashboard.component.html',
    styleUrls: ['./child-dashboard.component.css', '../../../shared/styles/pages.css']
})
export class ChildDashboardComponent implements OnInit {
    private insightsService = inject(ChildInsightsService);
    private transactionService = inject(TransactionService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';

    overview = { walletBalance: 0, spendingLimit: 0, totalSpent: 0, remainingLimit: 0 };
    transactions: any[] = [];

    public pieOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
    };

    public categorySpending: ChartData<'doughnut'> | null = null;

    ngOnInit() {
        this.loadOverview();
        this.loadRecentTransactions();
        this.loadCategorySpending();
    }

    loadOverview() {
        this.insightsService.getDashboardOverview().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    this.overview = res.data;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Failed to load dashboard data.';
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    loadRecentTransactions() {
        this.transactionService.getChildTransactions(0, 5).subscribe({
            next: (res) => {
                const pageData = res.data || res;
                this.transactions = ((pageData as any).content || []).map((t: any) => ({
                    date: new Date(t.date || t.createdAt).toLocaleDateString(),
                    description: t.description || t.category || t.categoryName,
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

    loadCategorySpending() {
        this.insightsService.getSpendingByCategory().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    const labels = res.data.map(d => d.category);
                    const data = res.data.map(d => d.amount);
                    this.categorySpending = {
                        labels,
                        datasets: [{ data, backgroundColor: ['#635BFF', '#E74C3C', '#F39C12', '#2ECC71', '#9B59B6', '#3498DB'] }]
                    };
                    this.cdr.detectChanges();
                }
            },
            error: () => { 
                this.cdr.detectChanges();
            }
        });
    }
}

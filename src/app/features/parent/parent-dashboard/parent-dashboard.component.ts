import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartConfiguration } from 'chart.js';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
    selector: 'app-parent-dashboard',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PageHeaderComponent, StatCardComponent],
    templateUrl: './parent-dashboard.component.html',
    styleUrls: ['./parent-dashboard.component.css', '../../../shared/styles/pages.css']
})
export class ParentDashboardComponent {
    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } }, x: { grid: { display: false } } }
    };

    public pieOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
    };

    public pieChartData: ChartData<'doughnut'> = {
        labels: ['Groceries', 'Utilities', 'Entertainment', 'Transport', 'Shopping'],
        datasets: [{
            data: [300, 150, 100, 80, 120],
            backgroundColor: ['#635BFF', '#2ECC71', '#E74C3C', '#F39C12', '#3498DB']
        }]
    };

    public spendingChart: ChartData<'bar'> = {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [
            { data: [1200, 1450, 1100, 1680, 1320, 980], label: 'Spending', backgroundColor: '#E74C3C', borderRadius: 6 },
            { data: [3000, 3200, 2800, 3500, 3100, 3000], label: 'Income', backgroundColor: '#2ECC71', borderRadius: 6 }
        ]
    };

    public balanceChart: ChartData<'line'> = {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [
            { data: [3200, 4950, 6650, 8470, 10250, 12270], label: 'Balance', borderColor: '#635BFF', tension: 0.4, fill: true, backgroundColor: 'rgba(99,91,255,0.08)' }
        ]
    };

    recentTransactions = [
        { date: 'Mar 4, 2026', category: 'Groceries', wallet: 'Main Wallet', type: 'Expense', amount: '-$150.00' },
        { date: 'Mar 3, 2026', category: 'Salary', wallet: 'Main Wallet', type: 'Income', amount: '+$3,000.00' },
        { date: 'Mar 2, 2026', category: 'Utilities', wallet: 'Main Wallet', type: 'Expense', amount: '-$75.50' },
        { date: 'Mar 1, 2026', category: 'Entertainment', wallet: 'Savings', type: 'Expense', amount: '-$45.00' },
        { date: 'Feb 28, 2026', category: 'Freelance', wallet: 'Main Wallet', type: 'Income', amount: '+$500.00' },
    ];

    childrenSpending = [
        { name: 'Emma', spent: 45.50, limit: 100, avatar: 'E' },
        { name: 'Jake', spent: 23.00, limit: 75, avatar: 'J' },
        { name: 'Mia', spent: 67.80, limit: 100, avatar: 'M' },
    ];
}

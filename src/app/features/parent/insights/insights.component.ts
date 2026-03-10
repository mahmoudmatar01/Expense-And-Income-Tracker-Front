import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartConfiguration } from 'chart.js';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
    selector: 'app-parent-insights',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PageHeaderComponent, StatCardComponent],
    templateUrl: './insights.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentInsightsComponent {
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

    public categorySpending: ChartData<'doughnut'> = {
        labels: ['Groceries', 'Utilities', 'Entertainment', 'Transport', 'Shopping', 'Food'],
        datasets: [{ data: [300, 150, 100, 80, 120, 250], backgroundColor: ['#635BFF', '#3498DB', '#E74C3C', '#F39C12', '#9B59B6', '#2ECC71'] }]
    };

    public incomeVsExpenses: ChartData<'bar'> = {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [
            { data: [3000, 3200, 2800, 3500, 3100, 3000], label: 'Income', backgroundColor: '#2ECC71', borderRadius: 6 },
            { data: [1200, 1450, 1100, 1680, 1320, 980], label: 'Expenses', backgroundColor: '#E74C3C', borderRadius: 6 }
        ]
    };

    public monthlyTrends: ChartData<'line'> = {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [
            { data: [1200, 1450, 1100, 1680, 1320, 980], label: 'Monthly Spending', borderColor: '#E74C3C', tension: 0.4, fill: true, backgroundColor: 'rgba(231,76,60,0.08)' }
        ]
    };

    public childSpending: ChartData<'bar'> = {
        labels: ['Emma', 'Jake', 'Mia'],
        datasets: [
            { data: [45.50, 23.00, 67.80], label: 'Spent', backgroundColor: '#F39C12', borderRadius: 6 },
            { data: [100, 75, 100], label: 'Limit', backgroundColor: '#E0E0E0', borderRadius: 6 }
        ]
    };
}

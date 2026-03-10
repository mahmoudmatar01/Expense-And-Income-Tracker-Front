import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartConfiguration } from 'chart.js';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
    selector: 'app-child-dashboard',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PageHeaderComponent, StatCardComponent],
    templateUrl: './child-dashboard.component.html',
    styleUrls: ['./child-dashboard.component.css', '../../../shared/styles/pages.css']
})
export class ChildDashboardComponent {
    public pieOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
    };

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } }, x: { grid: { display: false } } }
    };

    public categorySpending: ChartData<'doughnut'> = {
        labels: ['Food', 'Entertainment', 'Shopping', 'Transport'],
        datasets: [{ data: [15, 20, 8, 3], backgroundColor: ['#635BFF', '#E74C3C', '#F39C12', '#2ECC71'] }]
    };

    public weeklySpending: ChartData<'bar'> = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{ data: [5, 12, 3, 8, 15, 20, 2], label: 'Daily Spending ($)', backgroundColor: '#635BFF', borderRadius: 6 }]
    };

    transactions = [
        { date: 'Mar 4, 2026', description: 'School Lunch', category: 'Food', amount: -5.50, icon: 'restaurant' },
        { date: 'Mar 3, 2026', description: 'Monthly Allowance', category: 'Allowance', amount: 100.00, icon: 'monetization_on' },
        { date: 'Mar 2, 2026', description: 'Movie Ticket', category: 'Entertainment', amount: -15.00, icon: 'movie' },
        { date: 'Mar 1, 2026', description: 'Bus Pass', category: 'Transport', amount: -3.00, icon: 'directions_bus' },
        { date: 'Feb 28, 2026', description: 'Stickers', category: 'Shopping', amount: -8.00, icon: 'shopping_bag' },
    ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartConfiguration } from 'chart.js';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
    selector: 'app-system-insights',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PageHeaderComponent, StatCardComponent],
    templateUrl: './system-insights.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class SystemInsightsComponent {
    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } }, x: { grid: { display: false } } }
    };

    public platformGrowth: ChartData<'line'> = {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [
            { data: [200, 350, 480, 650, 780, 920, 1050, 1150, 1245], label: 'Total Users', borderColor: '#635BFF', tension: 0.4, fill: true, backgroundColor: 'rgba(99,91,255,0.08)' }
        ]
    };

    public transactionVolume: ChartData<'bar'> = {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [
            { data: [12000, 18000, 25000, 32000, 28000, 45000, 52000, 48000, 61000], label: 'Transaction Volume ($)', backgroundColor: '#2ECC71', borderRadius: 6 }
        ]
    };

    public engagementData: ChartData<'line'> = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            { data: [85, 92, 88, 95, 91, 65, 58], label: 'Daily Active Users (%)', borderColor: '#F39C12', tension: 0.4, fill: true, backgroundColor: 'rgba(243,156,18,0.08)' }
        ]
    };

    public categoryData: ChartData<'doughnut'> = {
        labels: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Other'],
        datasets: [{ data: [30, 15, 20, 12, 18, 5], backgroundColor: ['#635BFF', '#2ECC71', '#E74C3C', '#3498DB', '#F39C12', '#95A5A6'] }]
    };

    public pieOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
    };
}

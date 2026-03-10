import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartConfiguration } from 'chart.js';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
    selector: 'app-child-insights',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PageHeaderComponent, StatCardComponent],
    templateUrl: './child-insights.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ChildInsightsComponent {
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

    public categoryData: ChartData<'doughnut'> = {
        labels: ['Food', 'Entertainment', 'Shopping', 'Transport'],
        datasets: [{ data: [8, 20, 8, 3], backgroundColor: ['#635BFF', '#E74C3C', '#F39C12', '#2ECC71'] }]
    };

    public weeklyData: ChartData<'bar'> = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{ data: [12, 18, 8, 15], label: 'Weekly Spending ($)', backgroundColor: '#635BFF', borderRadius: 6 }]
    };

    public trendData: ChartData<'line'> = {
        labels: ['Dec', 'Jan', 'Feb', 'Mar'],
        datasets: [{ data: [38, 42, 35, 31.5], label: 'Monthly Spending', borderColor: '#E74C3C', tension: 0.4, fill: true, backgroundColor: 'rgba(231,76,60,0.08)' }]
    };
}

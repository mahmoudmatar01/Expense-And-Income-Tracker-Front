import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType, ChartConfiguration } from 'chart.js';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PageHeaderComponent, StatCardComponent],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css', '../../../shared/styles/pages.css']
})
export class AdminDashboardComponent {
    alerts = [
        { message: '3 suspicious transactions detected in the last 24 hours', time: '2 hours ago' },
        { message: 'User john@example.com attempted 5 failed logins', time: '5 hours ago' },
    ];

    recentUsers = [
        { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'Parent', date: 'Mar 4, 2026' },
        { name: 'Mike Chen', email: 'mike@example.com', role: 'Parent', date: 'Mar 3, 2026' },
        { name: 'Emma Wilson', email: 'emma@example.com', role: 'Child', date: 'Mar 3, 2026' },
        { name: 'Alex Brown', email: 'alex@example.com', role: 'Child', date: 'Mar 2, 2026' },
    ];

    public chartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'bottom' } },
        scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } }, x: { grid: { display: false } } }
    };

    public barChartData: ChartData<'bar'> = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            { data: [65, 59, 80, 81, 56, 55, 70, 87, 92, 105, 98, 120], label: 'User Registrations', backgroundColor: '#635BFF', borderRadius: 6 }
        ]
    };

    public lineChartData: ChartData<'line'> = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            { data: [5000, 10000, 7500, 15000, 12000, 20000, 18000, 25000, 22000, 28000, 30000, 35000], label: 'Transaction Volume ($)', borderColor: '#2ECC71', backgroundColor: 'rgba(46, 204, 113, 0.1)', tension: 0.4, fill: true }
        ]
    };

    public doughnutChartData: ChartData<'doughnut'> = {
        labels: ['Parents', 'Children'],
        datasets: [{ data: [845, 400], backgroundColor: ['#635BFF', '#2ECC71'] }]
    };

    public doughnutOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
    };
}

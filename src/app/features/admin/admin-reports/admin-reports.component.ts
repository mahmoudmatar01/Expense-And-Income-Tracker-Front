import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-admin-reports',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent],
    templateUrl: './admin-reports.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class AdminReportsComponent {
    reports = [
        { name: 'Monthly User Report', description: 'Summary of all user registrations and activities', date: 'Mar 1, 2026', type: 'Users', icon: 'people' },
        { name: 'Transaction Summary', description: 'All transactions processed in the period', date: 'Mar 1, 2026', type: 'Financial', icon: 'receipt_long' },
        { name: 'Suspicious Activity Report', description: 'Flagged transactions and user alerts', date: 'Feb 28, 2026', type: 'Security', icon: 'security' },
        { name: 'Platform Growth Report', description: 'User growth and engagement metrics', date: 'Feb 28, 2026', type: 'Analytics', icon: 'trending_up' },
        { name: 'Budget Compliance Report', description: 'Budget adherence across all users', date: 'Feb 25, 2026', type: 'Financial', icon: 'pie_chart' },
        { name: 'System Performance Report', description: 'Server uptime and response times', date: 'Feb 20, 2026', type: 'System', icon: 'speed' },
    ];
}

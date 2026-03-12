import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartConfiguration } from 'chart.js';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { AdminService } from '../../../core/services/admin.service';
import { AdminDashboardOverview } from '../../../core/interfaces/admin';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, BaseChartDirective, PageHeaderComponent, StatCardComponent],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css', '../../../shared/styles/pages.css']
})
export class AdminDashboardComponent implements OnInit {
    private adminService = inject(AdminService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';

    overview: AdminDashboardOverview = { totalUsers: 0, activeParents: 0, activeChildren: 0, totalTransactionAmount: 0 };
    recentUsers: any[] = [];

    // Charts Configuration
    public chartOptions: ChartConfiguration['options'] = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: true, position: 'bottom' } },
        scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' } }, x: { grid: { display: false } } }
    };
    public doughnutOptions: ChartConfiguration['options'] = {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
    };

    public barChartData: ChartData<'bar'> | null = null;
    public lineChartData: ChartData<'line'> | null = null;
    public doughnutChartData: ChartData<'doughnut'> | null = null;

    ngOnInit() {
        this.loadOverview();
        this.loadUserDistribution();
        this.loadRecentUsers();
        this.loadTransactionVolume();
        this.loadUserRegistrations();
    }

    loadOverview() {
        this.adminService.getDashboardOverview().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    this.overview = res.data;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.errorMessage = 'Failed to load dashboard data.';
                this.toastService.error('Failed to load dashboard data.');
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    loadUserDistribution() {
        this.adminService.getUserDistribution().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    this.doughnutChartData = {
                        labels: ['Parents', 'Children'],
                        datasets: [{ data: [res.data.parentCount, res.data.childCount], backgroundColor: ['#635BFF', '#2ECC71'] }]
                    };
                    this.cdr.detectChanges();
                }
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    loadRecentUsers() {
        this.adminService.getRecentUsers(0, 5).subscribe({
            next: (res) => {
                const pageData = res.data || res;
                this.recentUsers = ((pageData as any).content || []).map((u: any) => ({
                    ...u,
                    date: new Date(u.dateRegistered).toLocaleDateString(),
                    role: u.role === 'ROLE_PARENT' ? 'Parent' : 'Child'
                }));
                this.cdr.detectChanges();
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    loadTransactionVolume() {
        this.adminService.getTransactionVolume().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    const labels = res.data.map(d => `${d.year}-${String(d.month).padStart(2, '0')}`);
                    const data = res.data.map(d => d.averageTransactionAmount);

                    this.lineChartData = {
                        labels,
                        datasets: [
                            { data, label: 'Average Transaction ($)', borderColor: '#2ECC71', backgroundColor: 'rgba(46, 204, 113, 0.1)', tension: 0.4, fill: true }
                        ]
                    };
                    this.cdr.detectChanges();
                }
            },
            error: () => {
                this.cdr.detectChanges();
            }
        });
    }

    loadUserRegistrations() {
        this.adminService.getUserRegistrations().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    const labels = res.data.map(d => `${d.year}-${String(d.month).padStart(2, '0')}`);
                    const data = res.data.map(d => d.registrations);

                    this.barChartData = {
                        labels,
                        datasets: [
                            { data, label: 'User Registrations', backgroundColor: '#635BFF', borderRadius: 6 }
                        ]
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

import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, UserRole, User } from '../../core/services/auth.service';

interface MenuItem {
    label: string;
    icon: string;
    route: string;
    roles: UserRole[];
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    authService = inject(AuthService);
    router = inject(Router);

    @Input() isOpen = false;
    @Output() closed = new EventEmitter<void>();

    menuItems: MenuItem[] = [
        // Admin Navigation
        { label: 'Dashboard Overview', icon: 'dashboard', route: '/admin/dashboard', roles: [UserRole.Admin] },
        { label: 'Users Management', icon: 'people', route: '/admin/users', roles: [UserRole.Admin] },
        { label: 'Suspended Accounts', icon: 'block', route: '/admin/suspended', roles: [UserRole.Admin] },
        { label: 'Transactions Monitoring', icon: 'receipt_long', route: '/admin/transactions', roles: [UserRole.Admin] },
        { label: 'System Insights', icon: 'insights', route: '/admin/insights', roles: [UserRole.Admin] },
        { label: 'Reports', icon: 'assessment', route: '/admin/reports', roles: [UserRole.Admin] },
        { label: 'Settings', icon: 'settings', route: '/admin/settings', roles: [UserRole.Admin] },

        // Parent Navigation
        { label: 'Dashboard', icon: 'dashboard', route: '/parent/dashboard', roles: [UserRole.Parent] },
        { label: 'Wallets', icon: 'account_balance_wallet', route: '/parent/wallets', roles: [UserRole.Parent] },
        { label: 'Transactions', icon: 'receipt_long', route: '/parent/transactions', roles: [UserRole.Parent] },
        { label: 'Categories', icon: 'category', route: '/parent/categories', roles: [UserRole.Parent] },
        { label: 'Budgets', icon: 'pie_chart', route: '/parent/budgets', roles: [UserRole.Parent] },
        { label: 'Children Users', icon: 'family_restroom', route: '/parent/children', roles: [UserRole.Parent] },
        { label: 'Insights', icon: 'bar_chart', route: '/parent/insights', roles: [UserRole.Parent] },
        { label: 'Settings', icon: 'settings', route: '/parent/settings', roles: [UserRole.Parent] },

        // Child Navigation
        { label: 'Dashboard', icon: 'dashboard', route: '/child/dashboard', roles: [UserRole.Child] },
        { label: 'Wallet', icon: 'account_balance_wallet', route: '/child/wallet', roles: [UserRole.Child] },
        { label: 'Transactions', icon: 'receipt_long', route: '/child/transactions', roles: [UserRole.Child] },
        { label: 'Insights', icon: 'bar_chart', route: '/child/insights', roles: [UserRole.Child] },
        { label: 'Profile', icon: 'account_circle', route: '/child/profile', roles: [UserRole.Child] },
    ];

    get allowedMenu() {
        const userRole = this.authService.currentUserValue?.role;
        return this.menuItems.filter(item => userRole && item.roles.includes(userRole));
    }

    /** On mobile, close the sidebar when a nav link is clicked */
    onNavClick(): void {
        this.closed.emit();
    }
}

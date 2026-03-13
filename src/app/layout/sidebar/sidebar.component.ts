import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, UserRole } from '../../core/services/auth.service';
import type { User } from '../../core/services/auth.service';

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
    private authService = inject(AuthService);
    private router = inject(Router);

    @Input() isOpen = false;
    @Output() closed = new EventEmitter<void>();

    menuItems: MenuItem[] = [
        // Admin Navigation
        { label: 'Dashboard Overview', icon: 'dashboard', route: '/admin/dashboard', roles: [UserRole.Admin] },
        { label: 'Users Management', icon: 'people', route: '/admin/users', roles: [UserRole.Admin] },
        { label: 'Suspended Accounts', icon: 'block', route: '/admin/suspended', roles: [UserRole.Admin] },
        { label: 'Transactions Monitoring', icon: 'receipt_long', route: '/admin/transactions', roles: [UserRole.Admin] },

        // Parent Navigation
        { label: 'Dashboard', icon: 'dashboard', route: '/parent/dashboard', roles: [UserRole.Parent] },
        { label: 'Wallets', icon: 'account_balance_wallet', route: '/parent/wallets', roles: [UserRole.Parent] },
        { label: 'Transactions', icon: 'receipt_long', route: '/parent/transactions', roles: [UserRole.Parent] },
        { label: 'Categories', icon: 'category', route: '/parent/categories', roles: [UserRole.Parent] },
        { label: 'Budgets', icon: 'pie_chart', route: '/parent/budgets', roles: [UserRole.Parent] },
        { label: 'Children Users', icon: 'family_restroom', route: '/parent/children', roles: [UserRole.Parent] },

        { label: 'Profile', icon: 'person', route: '/parent/profile', roles: [UserRole.Parent] },

        // Child Navigation
        { label: 'Dashboard', icon: 'dashboard', route: '/child/dashboard', roles: [UserRole.Child] },
        { label: 'Wallet', icon: 'account_balance_wallet', route: '/child/wallet', roles: [UserRole.Child] },
        { label: 'Transactions', icon: 'receipt_long', route: '/child/transactions', roles: [UserRole.Child] },
    ];

    get allowedMenu() {
        const userRole = this.authService.currentUserValue?.role;
        return this.menuItems.filter(item => userRole && item.roles.includes(userRole));
    }

    onNavClick(): void {
        this.closed.emit();
    }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { adminGuard } from './core/guards/admin.guard';
import { parentGuard } from './core/guards/parent.guard';
import { childGuard } from './core/guards/child.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
    },

    // ─── ADMIN ───────────────────────────────────────────────────
    {
        path: 'admin',
        component: DashboardLayoutComponent,
        canActivate: [adminGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
            },
            {
                path: 'users',
                loadComponent: () => import('./features/admin/users-management/users-management.component').then(m => m.UsersManagementComponent)
            },
            {
                path: 'suspended',
                loadComponent: () => import('./features/admin/suspended-accounts/suspended-accounts.component').then(m => m.SuspendedAccountsComponent)
            },
            {
                path: 'transactions',
                loadComponent: () => import('./features/admin/admin-transactions/admin-transactions.component').then(m => m.AdminTransactionsComponent)
            },
            {
                path: 'insights',
                loadComponent: () => import('./features/admin/system-insights/system-insights.component').then(m => m.SystemInsightsComponent)
            },
            {
                path: 'reports',
                loadComponent: () => import('./features/admin/admin-reports/admin-reports.component').then(m => m.AdminReportsComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/admin/admin-settings/admin-settings.component').then(m => m.AdminSettingsComponent)
            },
        ]
    },

    // ─── PARENT ──────────────────────────────────────────────────
    {
        path: 'parent',
        component: DashboardLayoutComponent,
        canActivate: [parentGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/parent/parent-dashboard/parent-dashboard.component').then(m => m.ParentDashboardComponent)
            },
            {
                path: 'wallets',
                loadComponent: () => import('./features/parent/wallets/wallets.component').then(m => m.ParentWalletsComponent)
            },
            {
                path: 'transactions',
                loadComponent: () => import('./features/parent/transactions/transactions.component').then(m => m.ParentTransactionsComponent)
            },
            {
                path: 'categories',
                loadComponent: () => import('./features/parent/categories/categories.component').then(m => m.ParentCategoriesComponent)
            },
            {
                path: 'budgets',
                loadComponent: () => import('./features/parent/budgets/budgets.component').then(m => m.ParentBudgetsComponent)
            },
            {
                path: 'children',
                loadComponent: () => import('./features/parent/children/children.component').then(m => m.ParentChildrenComponent)
            },
            {
                path: 'insights',
                loadComponent: () => import('./features/parent/insights/insights.component').then(m => m.ParentInsightsComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/parent/settings/settings.component').then(m => m.ParentSettingsComponent)
            },
        ]
    },

    // ─── CHILD ───────────────────────────────────────────────────
    {
        path: 'child',
        component: DashboardLayoutComponent,
        canActivate: [childGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadComponent: () => import('./features/child/child-dashboard/child-dashboard.component').then(m => m.ChildDashboardComponent)
            },
            {
                path: 'wallet',
                loadComponent: () => import('./features/child/child-wallet/child-wallet.component').then(m => m.ChildWalletComponent)
            },
            {
                path: 'transactions',
                loadComponent: () => import('./features/child/child-transactions/child-transactions.component').then(m => m.ChildTransactionsComponent)
            },
            {
                path: 'insights',
                loadComponent: () => import('./features/child/child-insights/child-insights.component').then(m => m.ChildInsightsComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./features/child/child-profile/child-profile.component').then(m => m.ChildProfileComponent)
            },
        ]
    },

    { path: '**', redirectTo: '/login' }
];

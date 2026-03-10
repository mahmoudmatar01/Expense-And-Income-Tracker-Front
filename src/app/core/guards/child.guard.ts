import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService, UserRole } from '../services/auth.service';

export const childGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    if (authService.hasRole(UserRole.Child)) {
        return true;
    }

    return router.parseUrl('/login');
};

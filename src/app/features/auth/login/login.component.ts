import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, UserRole } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private authService = inject(AuthService);
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);

    email = '';
    password = '';
    isLoading = false;
    errorMessage = '';

    login(): void {
        if (!this.email || !this.password) return;

        this.isLoading = true;
        this.errorMessage = '';

        this.authService.login(this.email, this.password).subscribe({
            next: (res) => {
                this.isLoading = false;
                const user = this.authService.currentUserValue;

                if (user?.role === UserRole.Admin) {
                    this.router.navigate(['/admin/dashboard']);
                } else if (user?.role === UserRole.Parent) {
                    this.router.navigate(['/parent/dashboard']);
                } else {
                    this.router.navigate(['/child/dashboard']);
                }
            },
            error: (err) => {
                this.isLoading = false;
                if (err.status === 401 || err.status === 403 || (err.error && err.error.message?.includes('Bad credentials'))) {
                    this.errorMessage = 'Incorrect email or password. Please try again.';
                } else {
                    this.errorMessage = err?.error?.message || 'Something went wrong. Please try again later.';
                }
                this.cdr.detectChanges();
            }
        });
    }
}

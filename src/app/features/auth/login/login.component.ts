import { Component, inject } from '@angular/core';
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
    authService = inject(AuthService);
    router = inject(Router);

    email = '';
    password = '';
    selectedRole: UserRole = UserRole.Parent;
    UserRole = UserRole;

    login() {
        if (this.email && this.password) {
            const user = this.authService.login(this.email, this.selectedRole);
            if (user.role === UserRole.Admin) {
                this.router.navigate(['/admin/dashboard']);
            } else if (user.role === UserRole.Parent) {
                this.router.navigate(['/parent/dashboard']);
            } else {
                this.router.navigate(['/child/dashboard']);
            }
        }
    }
}

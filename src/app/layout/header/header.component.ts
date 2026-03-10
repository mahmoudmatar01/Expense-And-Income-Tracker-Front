import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    authService = inject(AuthService);
    router = inject(Router);

    @Output() menuToggle = new EventEmitter<void>();

    get currUser() {
        return this.authService.currentUserValue;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}

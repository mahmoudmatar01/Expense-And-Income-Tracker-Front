import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService, RegisterPayload } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    isLoading = false;
    errorMessage = '';
    successMessage = '';
    showPassword = false;
    showConfirmPassword = false;

    registerForm: FormGroup = this.fb.group(
        {
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
            agreeTerms: [false, [Validators.requiredTrue]],
        },
        { validators: this.passwordMatchValidator }
    );

    /** Cross-field validator: password and confirmPassword must match */
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirm = control.get('confirmPassword')?.value;
        if (password && confirm && password !== confirm) {
            control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }
        return null;
    }

    /** Quick accessors for template validation */
    get f() {
        return this.registerForm.controls;
    }

    /** Toggle password visibility */
    togglePassword(field: 'password' | 'confirm'): void {
        if (field === 'password') this.showPassword = !this.showPassword;
        else this.showConfirmPassword = !this.showConfirmPassword;
    }

    /** Password strength indicator */
    get passwordStrength(): { label: string; color: string; width: string } {
        const pw = this.registerForm.get('password')?.value || '';
        if (!pw) return { label: '', color: '', width: '0%' };

        let score = 0;
        if (pw.length >= 8) score++;
        if (pw.length >= 12) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;

        if (score <= 1) return { label: 'Weak', color: '#E74C3C', width: '20%' };
        if (score === 2) return { label: 'Fair', color: '#F39C12', width: '40%' };
        if (score === 3) return { label: 'Good', color: '#F39C12', width: '60%' };
        if (score === 4) return { label: 'Strong', color: '#2ECC71', width: '80%' };
        return { label: 'Very Strong', color: '#2ECC71', width: '100%' };
    }

    onSubmit(): void {
        // Mark all fields as touched to show validation errors
        this.registerForm.markAllAsTouched();

        if (this.registerForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const payload: RegisterPayload = {
            name: this.registerForm.value.name.trim(),
            email: this.registerForm.value.email.trim().toLowerCase(),
            password: this.registerForm.value.password,
            role: 'PARENT',
        };

        this.authService.register(payload).subscribe({
            next: () => {
                this.isLoading = false;
                this.successMessage =
                    'Account created successfully! Redirecting to login...';
                setTimeout(() => this.router.navigate(['/login']), 2000);
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage =
                    err?.error?.message ||
                    'Registration failed. Please try again.';
            },
        });
    }
}

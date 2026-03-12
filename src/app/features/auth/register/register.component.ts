import { Component, inject, ChangeDetectorRef } from '@angular/core';
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
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/interfaces/RegisterRequest';

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
    private cdr = inject(ChangeDetectorRef);

    isLoading = false;
    errorMessage = '';
    successMessage = '';

    showPassword = false;
    showConfirmPassword = false;

    registerForm: FormGroup = this.fb.group(
        {
            fullName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
            agreeTerms: [false, [Validators.requiredTrue]],
        },
        { validators: this.passwordMatchValidator }
    );

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirm = control.get('confirmPassword')?.value;

        if (password && confirm && password !== confirm) {
            control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }
        return null;
    }

    get f() {
        return this.registerForm.controls;
    }

    togglePassword(field: 'password' | 'confirm'): void {
        if (field === 'password') this.showPassword = !this.showPassword;
        else this.showConfirmPassword = !this.showConfirmPassword;
    }

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
        this.registerForm.markAllAsTouched();

        if (this.registerForm.invalid) return;

        this.isLoading = true;
        this.errorMessage = '';
        this.successMessage = '';

        const payload: RegisterRequest = {
            fullName: this.registerForm.value.fullName.trim(),
            email: this.registerForm.value.email.trim().toLowerCase(),
            password: this.registerForm.value.password,
            confirmPassword: this.registerForm.value.confirmPassword
        };

        this.authService.register(payload).subscribe({
            next: () => {
                this.isLoading = false;
                this.successMessage =
                    'Account created successfully! Redirecting to login...';
                setTimeout(() => this.router.navigate(['/login']), 1500);
            },
            error: (err) => {
                this.isLoading = false;
                if (err.status === 400 || err.status === 422) {
                    this.errorMessage = 'Registration failed. Please check your information and try again.';
                } else {
                    this.errorMessage = err?.error?.message || 'Something went wrong. Please try again later.';
                }
                this.cdr.detectChanges();
            },
        });
    }
}

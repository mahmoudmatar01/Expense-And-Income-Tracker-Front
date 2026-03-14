import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ProfileService } from '../../../core/services/profile.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-parent-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css', '../../../shared/styles/pages.css']
})
export class ParentProfileComponent implements OnInit {
    private profileService = inject(ProfileService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    isSaving = false;

    profile = { id: 0, name: '', email: '', role: '', status: '' };
    editForm = { name: '', email: '', currentPassword: '', newPassword: '' };

    ngOnInit() {
        this.loadProfile();
    }

    loadProfile() {
        this.isLoading = true;
        this.profileService.getProfile().subscribe({
            next: (res) => {
                if (res.success && res.data) {
                    this.profile = res.data;
                    this.editForm.name = res.data.name;
                    this.editForm.email = res.data.email;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.toastService.error('Failed to load profile.');
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    getRoleBadge(): string {
        if (this.profile.role === 'ROLE_PARENT') return 'Parent';
        if (this.profile.role === 'ROLE_CHILD') return 'Child';
        if (this.profile.role === 'ROLE_ADMIN') return 'Admin';
        return this.profile.role;
    }

    get isDirty(): boolean {
        return (
            this.editForm.name !== this.profile.name ||
            (this.editForm.currentPassword.length > 0 && this.editForm.newPassword.length > 0)
        );
    }

    saveProfile() {
        this.isSaving = true;

        const payload: any = {};
        if (this.editForm.name && this.editForm.name !== this.profile.name) {
            payload.name = this.editForm.name;
        }
        if (this.editForm.currentPassword && this.editForm.newPassword) {
            payload.currentPassword = this.editForm.currentPassword;
            payload.newPassword = this.editForm.newPassword;
        }

        this.profileService.updateProfile(payload).subscribe({
            next: (res) => {
                this.isSaving = false;
                this.toastService.success('Profile updated successfully!');
                this.editForm.currentPassword = '';
                this.editForm.newPassword = '';
                if (res.success && res.data) {
                    this.profile = res.data;
                }
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.isSaving = false;
                this.toastService.error(err?.error?.message || 'Failed to update profile.');
                this.cdr.detectChanges();
            }
        });
    }
}

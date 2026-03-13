import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ChildAccountService } from '../../../core/services/child-account.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
    selector: 'app-parent-children',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent, ModalComponent],
    templateUrl: './children.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentChildrenComponent implements OnInit {
    private childService = inject(ChildAccountService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';
    showModal = false;
    selectedChild: any = null;

    columns: TableColumn[] = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'spendingLimit', label: 'Spending Limit ($)' },
        { key: 'totalSpentThisMonth', label: 'Total Spent ($)' },
    ];

    children: any[] = [];
    currentPage = 0;
    pageSize = 8;
    totalPages = 1;

    newChild = { name: '', email: '', password: '', spendingLimit: 0 };

    ngOnInit() {
        this.loadChildren();
    }

    loadChildren() {
        this.isLoading = true;
        this.childService.getParentChildren(this.currentPage, this.pageSize).subscribe({
            next: (res) => {
                const childrenData = res.success && res.data ? res.data : [];
                this.children = childrenData.map(c => ({
                    ...c,
                    status: c.status === 'ACTIVE' ? 'Active' : 'Suspended',
                }));
                if (childrenData.length === this.pageSize) {
                    this.totalPages = Math.max(this.totalPages, this.currentPage + 2);
                } else {
                    this.totalPages = this.currentPage + 1;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.toastService.error('Failed to load child accounts.');
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.loadChildren();
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.loadChildren();
        }
    }

    openAdd() {
        this.selectedChild = null;
        this.newChild = { name: '', email: '', password: '', spendingLimit: 0 };
        this.showModal = true;
    }

    saveChild() {
        if (!this.newChild.name || !this.newChild.email || !this.newChild.password) {
            return;
        }

        const payload = {
            name: this.newChild.name,
            email: this.newChild.email,
            password: this.newChild.password,
            spendingLimit: this.newChild.spendingLimit
        };

        this.childService.createChild(payload).subscribe({
            next: () => {
                this.toastService.success('Child account created successfully.');
                this.loadChildren();
                this.showModal = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                const msg = err.error?.message || 'Failed to create child account.';
                this.toastService.error(msg);
                this.cdr.detectChanges();
            }
        });
    }

    deactivateChild(child: any) {
        this.childService.updateChildStatus(child.id).subscribe({
            next: () => {
                this.toastService.success('Child status updated successfully.');
                this.loadChildren();
                this.cdr.detectChanges();
            },
            error: () => {
                this.toastService.error('Failed to change child status.');
                this.cdr.detectChanges();
            }
        });
    }
}

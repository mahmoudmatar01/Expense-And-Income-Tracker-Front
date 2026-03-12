import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ChildAccountService } from '../../../core/services/child-account.service';

@Component({
    selector: 'app-parent-children',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent, ModalComponent],
    templateUrl: './children.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentChildrenComponent implements OnInit {
    private childService = inject(ChildAccountService);
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

    newChild = { name: '', email: '', password: '', spendingLimit: 0 };

    ngOnInit() {
        this.loadChildren();
    }

    loadChildren() {
        this.isLoading = true;
        this.childService.getParentChildren().subscribe({
            next: (res) => {
                const childrenData = res.success && res.data ? res.data : [];
                this.children = childrenData.map(c => ({
                    ...c,
                    status: c.status === 'ACTIVE' ? 'Active' : 'Inactive'
                }));
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.errorMessage = 'Failed to load children.';
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
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
                this.loadChildren();
                this.showModal = false;
                this.cdr.detectChanges();
            },
            error: () => {
                alert('Failed to create child account.');
                this.cdr.detectChanges();
            }
        });
    }

    deactivateChild(child: any) {
        this.childService.updateChildStatus(child.id).subscribe({
            next: () => {
                this.loadChildren();
                this.cdr.detectChanges();
            },
            error: () => {
                alert('Failed to change child status.');
                this.cdr.detectChanges();
            }
        });
    }
}

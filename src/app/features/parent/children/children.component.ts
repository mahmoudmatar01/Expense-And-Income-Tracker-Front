import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-parent-children',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, DataTableComponent, ModalComponent],
    templateUrl: './children.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentChildrenComponent {
    showModal = false;
    selectedChild: any = null;

    columns: TableColumn[] = [
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'allowance', label: 'Allowance' },
        { key: 'spendingLimit', label: 'Spending Limit' },
        { key: 'totalSpent', label: 'Total Spent' },
    ];

    children = [
        { name: 'Emma Wilson', email: 'emma@example.com', status: 'Active', allowance: '$100/mo', spendingLimit: '$100', totalSpent: '$45.50' },
        { name: 'Jake Wilson', email: 'jake@example.com', status: 'Active', allowance: '$75/mo', spendingLimit: '$75', totalSpent: '$23.00' },
        { name: 'Mia Wilson', email: 'mia@example.com', status: 'Active', allowance: '$100/mo', spendingLimit: '$100', totalSpent: '$67.80' },
    ];

    newChild = { name: '', email: '', allowance: 0, spendingLimit: 0 };

    openAdd() {
        this.selectedChild = null;
        this.newChild = { name: '', email: '', allowance: 0, spendingLimit: 0 };
        this.showModal = true;
    }

    saveChild() {
        if (!this.selectedChild) {
            this.children.push({
                name: this.newChild.name,
                email: this.newChild.email,
                status: 'Active',
                allowance: '$' + this.newChild.allowance + '/mo',
                spendingLimit: '$' + this.newChild.spendingLimit,
                totalSpent: '$0.00'
            });
        }
        this.showModal = false;
    }

    deactivateChild(child: any) {
        child.status = child.status === 'Active' ? 'Inactive' : 'Active';
    }
}

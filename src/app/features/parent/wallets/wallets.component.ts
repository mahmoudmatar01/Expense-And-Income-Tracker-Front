import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-parent-wallets',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, ModalComponent],
    templateUrl: './wallets.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentWalletsComponent {
    showModal = false;
    editingWallet: any = null;

    wallets = [
        { name: 'Main Wallet', balance: 8450.00, currency: 'USD', lastActivity: 'Mar 4, 2026', icon: 'account_balance_wallet', color: '#635BFF', assigned: null },
        { name: 'Savings', balance: 3200.00, currency: 'USD', lastActivity: 'Mar 1, 2026', icon: 'savings', color: '#2ECC71', assigned: null },
        { name: "Emma's Wallet", balance: 150.00, currency: 'USD', lastActivity: 'Mar 3, 2026', icon: 'child_care', color: '#F39C12', assigned: 'Emma' },
        { name: "Jake's Wallet", balance: 75.00, currency: 'USD', lastActivity: 'Feb 28, 2026', icon: 'child_care', color: '#E74C3C', assigned: 'Jake' },
    ];

    newWallet = { name: '', currency: 'USD', assignedChild: '' };

    openAdd() {
        this.editingWallet = null;
        this.newWallet = { name: '', currency: 'USD', assignedChild: '' };
        this.showModal = true;
    }

    openEdit(wallet: any) {
        this.editingWallet = wallet;
        this.newWallet = { name: wallet.name, currency: wallet.currency, assignedChild: wallet.assigned || '' };
        this.showModal = true;
    }

    saveWallet() {
        if (this.editingWallet) {
            this.editingWallet.name = this.newWallet.name;
            this.editingWallet.currency = this.newWallet.currency;
            this.editingWallet.assigned = this.newWallet.assignedChild || null;
        } else {
            this.wallets.push({
                name: this.newWallet.name,
                balance: 0,
                currency: this.newWallet.currency,
                lastActivity: 'Just now',
                icon: this.newWallet.assignedChild ? 'child_care' : 'account_balance_wallet',
                color: '#635BFF',
                assigned: this.newWallet.assignedChild || null,
            });
        }
        this.showModal = false;
    }

    deleteWallet(wallet: any) {
        this.wallets = this.wallets.filter(w => w !== wallet);
    }
}

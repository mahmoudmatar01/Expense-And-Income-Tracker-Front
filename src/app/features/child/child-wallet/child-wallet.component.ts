import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

@Component({
    selector: 'app-child-wallet',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent, StatCardComponent],
    templateUrl: './child-wallet.component.html',
    styleUrls: ['./child-wallet.component.css', '../../../shared/styles/pages.css']
})
export class ChildWalletComponent {
    balance = 150.00;
    allowanceReceived = 100.00;

    transactions = [
        { date: 'Mar 4, 2026', description: 'School Lunch', type: 'Expense', amount: -5.50, icon: 'restaurant' },
        { date: 'Mar 3, 2026', description: 'Monthly Allowance', type: 'Allowance', amount: 100.00, icon: 'monetization_on' },
        { date: 'Mar 2, 2026', description: 'Movie Ticket', type: 'Expense', amount: -15.00, icon: 'movie' },
        { date: 'Mar 1, 2026', description: 'Bus Pass', type: 'Expense', amount: -3.00, icon: 'directions_bus' },
        { date: 'Feb 28, 2026', description: 'Stickers', type: 'Expense', amount: -8.00, icon: 'shopping_bag' },
        { date: 'Feb 25, 2026', description: 'Candy', type: 'Expense', amount: -2.50, icon: 'shopping_cart' },
        { date: 'Feb 20, 2026', description: 'Monthly Allowance', type: 'Allowance', amount: 75.00, icon: 'monetization_on' },
    ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-admin-settings',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent],
    templateUrl: './admin-settings.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class AdminSettingsComponent {
    platformName = 'Expense Tracker';
    maxChildrenPerParent = 5;
    defaultCurrency = 'USD';
    enableNotifications = true;
    twoFactorRequired = false;
    sessionTimeout = 30;
    maxLoginAttempts = 5;

    save() {
        alert('Settings saved successfully!');
    }
}

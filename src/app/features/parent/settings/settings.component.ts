import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-parent-settings',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent],
    templateUrl: './settings.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentSettingsComponent {
    profile = { name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 555-0123' };
    notifications = { email: true, push: true, budgetAlerts: true, childActivity: true };

    save() {
        alert('Settings saved!');
    }
}

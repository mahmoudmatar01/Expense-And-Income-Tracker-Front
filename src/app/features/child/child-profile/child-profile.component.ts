import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
    selector: 'app-child-profile',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent],
    templateUrl: './child-profile.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ChildProfileComponent {
    profile = {
        name: 'Emma Wilson',
        email: 'emma@example.com',
        parentName: 'Sarah Johnson',
        joinedDate: 'Feb 10, 2026',
        grade: '5th Grade'
    };

    save() {
        alert('Profile updated!');
    }
}

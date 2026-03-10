import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
    selector: 'app-parent-categories',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, ModalComponent],
    templateUrl: './categories.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentCategoriesComponent {
    showModal = false;
    editingCat: any = null;

    categories = [
        { name: 'Groceries', icon: 'shopping_cart', color: '#635BFF', budget: 500, spent: 300 },
        { name: 'Utilities', icon: 'power', color: '#3498DB', budget: 200, spent: 150 },
        { name: 'Entertainment', icon: 'movie', color: '#E74C3C', budget: 150, spent: 100 },
        { name: 'Transport', icon: 'directions_car', color: '#F39C12', budget: 200, spent: 80 },
        { name: 'Shopping', icon: 'shopping_bag', color: '#9B59B6', budget: 300, spent: 120 },
        { name: 'Food', icon: 'restaurant', color: '#2ECC71', budget: 400, spent: 250 },
        { name: 'Health', icon: 'favorite', color: '#E91E63', budget: 100, spent: 50 },
        { name: 'Education', icon: 'school', color: '#00BCD4', budget: 250, spent: 80 },
    ];

    newCat = { name: '', icon: 'category', budget: 0 };

    openAdd() {
        this.editingCat = null;
        this.newCat = { name: '', icon: 'category', budget: 0 };
        this.showModal = true;
    }

    openEdit(cat: any) {
        this.editingCat = cat;
        this.newCat = { name: cat.name, icon: cat.icon, budget: cat.budget };
        this.showModal = true;
    }

    save() {
        if (this.editingCat) {
            this.editingCat.name = this.newCat.name;
            this.editingCat.budget = this.newCat.budget;
        } else {
            this.categories.push({ name: this.newCat.name, icon: this.newCat.icon, color: '#635BFF', budget: this.newCat.budget, spent: 0 });
        }
        this.showModal = false;
    }

    deleteCat(cat: any) {
        this.categories = this.categories.filter(c => c !== cat);
    }
}

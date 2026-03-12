import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CategoryService } from '../../../core/services/category.service';
import { BudgetService } from '../../../core/services/budget.service';
import { ToastService } from '../../../core/services/toast.service';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
    selector: 'app-parent-categories',
    standalone: true,
    imports: [CommonModule, FormsModule, PageHeaderComponent, ModalComponent, EmptyStateComponent],
    templateUrl: './categories.component.html',
    styleUrls: ['../../../shared/styles/pages.css']
})
export class ParentCategoriesComponent implements OnInit {
    private categoryService = inject(CategoryService);
    private budgetService = inject(BudgetService);
    private toastService = inject(ToastService);
    private cdr = inject(ChangeDetectorRef);

    isLoading = true;
    errorMessage = '';
    showModal = false;
    editingCat: any = null;

    categories: any[] = [];

    newCat = { name: '', icon: 'category', budget: 0 };

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this.isLoading = true;
        this.categoryService.getCategoriesDetails().subscribe({
            next: (res) => {
                if (res.success) {
                    this.categories = res.data.map(c => ({
                        id: c.categoryId,
                        name: c.categoryName,
                        budget: c.budgetLimit || 0,
                        spent: c.usedAmount || 0,
                        icon: 'category',
                        color: '#635BFF'
                    }));
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.toastService.error('Failed to load categories.');
                this.isLoading = false;
                this.cdr.detectChanges();
            }
        });
    }

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
        if (!this.newCat.name) return;

        if (this.editingCat) {
            this.categoryService.updateCategory(this.editingCat.id, this.newCat.name, this.newCat.budget).subscribe({
                next: () => {
                    this.toastService.success('Category updated successfully.');
                    this.loadCategories();
                    this.showModal = false;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.toastService.error('Failed to update category.');
                    this.cdr.detectChanges();
                }
            });
        } else {
            this.categoryService.createCategory(this.newCat.name).subscribe({
                next: (res) => {
                    this.toastService.success('Category created successfully.');
                    if (res.success && this.newCat.budget > 0) {
                        this.budgetService.createBudget(res.data.id, this.newCat.budget).subscribe({
                            next: () => {
                                this.loadCategories();
                                this.cdr.detectChanges();
                            },
                            error: () => {
                                this.loadCategories();
                                this.cdr.detectChanges();
                            }
                        });
                    } else {
                        this.loadCategories();
                        this.cdr.detectChanges();
                    }
                    this.showModal = false;
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.toastService.error(err?.error?.message || 'Failed to create category.');
                    this.cdr.detectChanges();
                }
            });
        }
    }

    deleteCat(cat: any) {
        if (confirm(`Delete category ${cat.name}?`)) {
            this.categoryService.deleteCategory(cat.id).subscribe({
                next: () => {
                    this.toastService.success('Category deleted successfully.');
                    this.loadCategories();
                    this.cdr.detectChanges();
                },
                error: (err) => {
                    this.toastService.error(err?.error?.message || 'Failed to delete category.');
                    this.cdr.detectChanges();
                }
            });
        }
    }
}

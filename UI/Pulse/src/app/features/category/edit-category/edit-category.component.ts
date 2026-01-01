import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;


    constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router) {
  }

 ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // get the data from the API with category id
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next: (response) => {
              this.category = response;
            }
          });

        }
      }
    });
  }

  onFormSubmit(): void {
    const updateCategoryRequest: Category = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };

    // pass this object to service
    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }


   ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }

   onDelete(): void {
    if (this.id) {
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { MarkdownModule } from 'ngx-markdown';
import { Category } from '../../category/models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule,MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit {

  model: AddBlogPost;
  isImageSelectorVisible : boolean = false;
   categories$?: Observable<Category[]>;


  constructor(private blogPostService: BlogPostService,
    private router: Router,  private categoryService: CategoryService) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }
  ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories();
  }


  onFormSubmit(): void {
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      }
    });
  }


  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }



}

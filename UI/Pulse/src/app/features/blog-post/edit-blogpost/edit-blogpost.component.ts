import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { CategoryService } from '../../category/services/category.service';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { ImageSelectorComponent } from '../../../shared/components/image-selector/image-selector.component';
import { ImageSelectorServiceService } from '../../../shared/services/image-selector-service.service';

@Component({
  selector: 'app-edit-blogpost',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule,MarkdownModule,ImageSelectorComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css'
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  
  

  id: string | null = null;
  model?: BlogPost;
  categories$? : Observable<Category[]>;
  selectedCategories?: string[];

  isImageSelectorVisible : boolean = false;


  routeSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  imageSelectSubscricption?: Subscription;


  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router:Router, private imageService: ImageSelectorServiceService) {

  }

  
   ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();


    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        // Get BlogPost From API
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
             this.selectedCategories = response.categories.map(x => x.id!);
            }
          });
          ;
        }

        this.imageSelectSubscricption = this.imageService.onSelectImage()
        .subscribe({
          next: (response) => {
            if (this.model) {
              this.model.featuredImageUrl = response.url;
              this.isImageSelectorVisible = false;
            }
          }
        })

      }
    });
  }


    onFormSubmit(): void {
    
    if (this.model && this.id) {
      var updateBlogPost: UpdateBlogPost = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }

  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector() : void {
    this.isImageSelectorVisible = false;
  }


    ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscricption?.unsubscribe();
  }


}

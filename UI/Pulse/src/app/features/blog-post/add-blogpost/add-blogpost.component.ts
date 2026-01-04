import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule,MarkdownModule],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent {

  model: AddBlogPost;
  isImageSelectorVisible : boolean = false;


  constructor(private blogPostService: BlogPostService,
    private router: Router) {
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date()
    }
  }


  onFormSubmit(): void {
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

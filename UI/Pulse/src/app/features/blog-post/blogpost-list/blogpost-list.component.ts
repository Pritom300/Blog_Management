import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
 imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})


export class BlogpostListComponent implements OnInit,  OnDestroy {

 
blogPosts$?: Observable<BlogPost[]>;
deleteBlogPostSubscription?: Subscription;
id: string | null = null;

  constructor(private blogPostService: BlogPostService, private route: ActivatedRoute, private router:Router) {

  }
  ngOnDestroy(): void {
     this.deleteBlogPostSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();
  }


   onDelete(id: string): void {
  if (!confirm('Are you sure you want to delete this blog post?')) {
    return;
  }

  this.blogPosts$ = this.blogPostService.getAllBlogPosts();

  this.blogPostService.deleteBlogPost(id).subscribe({
    next: () => {
      this.blogPosts$ = this.blogPostService.getAllBlogPosts();
    }
  });
}

}

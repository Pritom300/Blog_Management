import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Observable } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { ImageSelectorServiceService } from '../../services/image-selector-service.service';

@Component({
  selector: 'app-image-selector',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule,MarkdownModule],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {
  
  private file?: File;
  fileName: string = '';
  title: string = '';
  images$?: Observable<BlogImage[]>;


   @ViewChild('form', { static: false}) imageUploadForm?: NgForm;

   constructor(private imageService: ImageSelectorServiceService) {

  }
  ngOnInit(): void {
     this.getImages();
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }


  uploadImage(): void {
    if (this.file && this.fileName !== '' && this.title !== '') {
      // Image service to upload the image
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) => {
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      });
    }
  }


   selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
  }

  private getImages() {
    this.images$ = this.imageService.getAllImages();
  }

}

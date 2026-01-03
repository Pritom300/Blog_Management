import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  standalone: true,
 imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})


export class BlogpostListComponent implements OnInit {

 


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}

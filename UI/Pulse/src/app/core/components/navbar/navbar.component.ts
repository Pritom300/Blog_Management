import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { User } from '../../../features/blog-post/models/user.model';
import { AuthServiceService } from '../../../features/auth/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
   imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule,MarkdownModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {


  user?: User;

  constructor(private authService: AuthServiceService,
    private router: Router) {
  }


   ngOnInit(): void {
    this.authService.user()
    .subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();

  }


   onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}

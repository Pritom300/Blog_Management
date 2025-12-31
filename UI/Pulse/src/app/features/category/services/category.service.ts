import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model: Category): Observable<void> {
    return this.http.post<void>('https://localhost:7137/api/categories', model);
  }
}



//https://localhost:7137/api/categories
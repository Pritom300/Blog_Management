import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  addCategory(model: Category): Observable<void> {
    return this.http.post<void>('https://localhost:7137/api/categories', model);
  }


    getAllCategories(
    query?: string, sortBy?: string, sortDirection?: string,
    pageNumber?: number, pageSize?: number): Observable<Category[]> {
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query)
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy)
    }

    if (sortDirection) {
      params = params.set('sortDirection', sortDirection)
    }

    if (pageNumber) {
      params = params.set('pageNumber', pageNumber)
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize)
    }

    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories`, {
      params: params
    });
  }

  getCategoryCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiBaseUrl}/api/categories/count`);
  }
}






//https://localhost:7137/api/categories
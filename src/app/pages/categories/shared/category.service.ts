import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { CategoryModel } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath = 'api/categories';

  constructor(private http: HttpClient) { }

  getAll(): Observable<CategoryModel[]> {
    return this.http.get(this.apiPath)
      .pipe(catchError(this.handleError)
        , map(this.jsonDataToCategories));
  }

  getById(id: number): Observable<CategoryModel> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url)
      .pipe(catchError(this.handleError)
        , map(this.jsonDataToCategory));
  }

  create(category: CategoryModel): Observable<CategoryModel> {
    return this.http.post(this.apiPath, category)
      .pipe(catchError(this.handleError)
        , map(this.jsonDataToCategory));

  }

  update(category: CategoryModel): Observable<CategoryModel> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http.put(url, category)
      .pipe(catchError(this.handleError)
        , map(() => category));
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError)
        , map(() => null));
  }


  private handleError(error: any): Observable<any> {
    console.log('Erro na requisição =>', error);
    return throwError(error);
  }

  private jsonDataToCategories(jsonData: any[]): CategoryModel[] {
    const categories: CategoryModel[] = [];
    jsonData.forEach(element => categories.push(element as CategoryModel));
    return categories;
  }

  private jsonDataToCategory(jsonData: any): CategoryModel {
    return jsonData as CategoryModel;
  }
}


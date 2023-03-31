import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = `${environment.API_URL}/api/categories`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit && offset){
      params = params.set('limit', limit),
      params = params.set('offset', offset)
    }
    return this.httpClient.get<Category[]>(this.apiUrl, {params})
  }
}

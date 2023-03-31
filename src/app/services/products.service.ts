import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Product, SaveProductDTO, UpdateProductDTO } from '../models/product.model';
import { retry, catchError, throwError, map,zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { fnCheckTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = environment.API_URL + '/api/products';
  private apiUrlCategory = environment.API_URL + '/api/categories';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params =  params.set('limit', limit);
      params =  params.set('offset', offset);
    }
    return this.httpClient.get<Product[]>(`${this.apiUrl}`,{params, context: fnCheckTime()})
    .pipe(
      retry(3), // Numero de Intentor, a repetir la Petición
      map(products =>products.map(item => {
        return {
          ...item,
          taxes: .18 * item.price
        }
      }))
    );
  }

  getByCategory(id: string, limit?: number, offset?: number){
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params =  params.set('limit', limit);
      params =  params.set('offset', offset);
    }
    return this.httpClient.get<Product[]>(`${this.apiUrlCategory}/${id}/products`,{params, context: fnCheckTime()})
    .pipe(
      retry(3), // Numero de Intentor, a repetir la Petición
      map(products =>products.map(item => {
        return {
          ...item,
          taxes: .18 * item.price
        }
      }))
    );
  }

  getById(id: string){
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500){
          return throwError('Algo esta fallando en el servidor');
        }
        if (error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized){
          return throwError('No tienes el permiso');
        }
        return throwError('Ups');
      })
    )
  }

  postSave(product: SaveProductDTO){
    return this.httpClient.post<Product>(this.apiUrl,product);
  }

  putUpdate(id: string, product: UpdateProductDTO){
    return this.httpClient.put<Product>(`${this.apiUrl}/${id}`,product)
  }

  delDelete(id: string){
  return this.httpClient.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  byIdAndUpdate(id: string, product: UpdateProductDTO) {
    return zip(
      this.getById(id),
      this.putUpdate(id, product)
    );
  }

}

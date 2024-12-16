import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models/product.types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private readonly http: HttpClient) {}

  public getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.apiUrl}products`);
  }

  public getUserProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${this.apiUrl}products/user-products`
    );
  }

  public createProduct(data: ProductResponse): Observable<ProductResponse[]> {
    return this.http.post<ProductResponse[]>(`${this.apiUrl}products`, data);
  }

  public updateProduct(
    data: ProductResponse
  ): Observable<Partial<ProductResponse[]>> {
    return this.http.put<ProductResponse[]>(
      `${this.apiUrl}products/${data.id}`,
      data
    );
  }

  public deleteProduct(id: string): Observable<Partial<ProductResponse[]>> {
    return this.http.delete<ProductResponse[]>(`${this.apiUrl}products/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root' // Fornecido no nível raiz, mas também pode ser fornecido no ProductsModule
})
export class ProductService {
  private readonly productPath = 'products'; // Endpoint da API para produtos

  constructor(private apiService: ApiService) { }

  getProducts(): Observable<Product[]> {
    return this.apiService.get<Product[]>(this.productPath);
  }

  getProduct(id: number): Observable<Product> {
    return this.apiService.get<Product>(`${this.productPath}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.apiService.post<Product>(this.productPath, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.apiService.put<Product>(`${this.productPath}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.apiService.delete<any>(`${this.productPath}/${id}`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  serviceURL: string = 'http://localhost:3000/productsList/';

  constructor(private http: HttpClient) {}

  addProduct(data: any) {
    return this.http.post<any>(this.serviceURL, data);
  }

  getAllProduct() {
    return this.http.get<any>(this.serviceURL);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(this.serviceURL + id);
  }

  updateProduct(data: any, id: number) {
    return this.http.put(this.serviceURL + id, data);
  }
}

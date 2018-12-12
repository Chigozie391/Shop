import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Products } from 'src/app/_models/Products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Products[]>(this.baseUrl + 'products');
  }

  getProduct(id: number) {
    return this.http.get<Products>(this.baseUrl + 'products/' + id);
  }

  setFeatured(id: number) {
    return this.http.post(this.baseUrl + 'products/' + id, {});
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  achiveProduct(id: number) {
    return this.http.post(this.baseUrl + 'products/' + id + '/archive', {});
  }

  setMainPhoto(productId: number, photoId: number) {
    return this.http.post(
      this.baseUrl + 'products/' + productId + '/photos/' + photoId + '/setmain',
      {}
    );
  }

  deletePhoto(productId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'products/' + productId + '/photos/' + photoId);
  }
}

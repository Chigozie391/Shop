import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Products } from 'src/app/_models/Products';
import { ProductQuery } from 'src/app/_models/productQuery';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(productQuery: ProductQuery) {
    let params = new HttpParams();

    if (productQuery.sortBy != null) {
      params = params.append('sortBy', productQuery.sortBy);
    }

    if (productQuery.isSortAscending.length) {
      params = params.append('isSortAscending', productQuery.isSortAscending);
    }

    params = params.append('page', '' + productQuery.pageIndex);
    params = params.append('pageSize', '' + productQuery.pageSize);

    return this.http.get<Products[]>(this.baseUrl + 'products', { params: params });
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

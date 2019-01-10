import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Products } from 'src/app/_models/Products';
import { Query } from 'src/app/_models/Query';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addProduct(productObj) {
    return this.http.post(this.baseUrl + 'products', productObj);
  }
  updateProduct(id: number, productObj) {
    return this.http.put(this.baseUrl + 'products/' + id, productObj);
  }

  getProducts(productQuery: Query) {
    let params = this.queryParams(productQuery);

    return this.http.get<Products[]>(this.baseUrl + 'products', { params: params });
  }

  getArchivedProducts(productQuery: Query) {
    let params = this.queryParams(productQuery);

    return this.http.get<Products[]>(this.baseUrl + 'products/archive', { params: params });
  }

  private queryParams(productQuery: Query) {
    let params = new HttpParams();

    if (productQuery.sortBy != null) {
      params = params.append('sortBy', productQuery.sortBy);
    }

    if (productQuery.isSortAscending.length) {
      params = params.append('isSortAscending', productQuery.isSortAscending);
    }

    params = params.append('page', '' + productQuery.pageIndex);
    params = params.append('pageSize', '' + productQuery.pageSize);

    return params;
  }

  getProduct(id: number) {
    return this.http.get<Products>(this.baseUrl + 'products/' + id);
  }

  setFeatured(id: number) {
    return this.http.post(this.baseUrl + 'products/' + id + '/setfeatured', {});
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'products/' + id);
  }

  achiveProduct(id: number) {
    return this.http.post(this.baseUrl + 'products/' + id + '/archive', {});
  }

  restoreProduct(id: number) {
    return this.http.post(this.baseUrl + 'products/' + id + '/restore', {});
  }

  setMainPhoto(productId: number, photoId: number) {
    return this.http.post(this.baseUrl + 'products/' + productId + '/photos/' + photoId + '/setmain', {});
  }

  deletePhoto(productId: number, photoId: number) {
    return this.http.delete(this.baseUrl + 'products/' + productId + '/photos/' + photoId);
  }

  getProductForCart(id: number) {
    return this.http.get<Products>(this.baseUrl + 'products/getproductforcart/' + id).pipe(take(1));
  }
}

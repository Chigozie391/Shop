import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Products } from 'src/app/_models/Products';
import { IQuery } from 'src/app/_models/IQuery';
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

  getProducts(productQuery: IQuery) {
    let params = this.queryParams(productQuery);

    return this.http.get<Products[]>(this.baseUrl + 'products', { params: params });
  }

  getArchivedProducts(productQuery: IQuery) {
    let params = this.queryParams(productQuery);

    return this.http.get<Products[]>(this.baseUrl + 'products/archive', { params: params });
  }

  getProductsInCategory(childId: number, productQuery: IQuery) {
    let params = this.queryParams(productQuery);

    return this.http.get<Products>(this.baseUrl + 'products/categories/' + childId, { params: params });
  }

  private queryParams(productQuery: IQuery) {
    let params = new HttpParams();

    if (productQuery.sortBy != null) {
      params = params.append('sortBy', productQuery.sortBy);
    }

    if (productQuery.isSortAscending.length) {
      params = params.append('isSortAscending', productQuery.isSortAscending);
    }
    if (productQuery.lowItems) {
      params = params.append('lowItems', '' + productQuery.lowItems);
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

  updateSoldCount(productId: number, quantity: number) {
    return this.http.put(this.baseUrl + 'products/' + productId + '/' + quantity + '/updateSold/', {});
  }

  getProductForCart(id: number) {
    return this.http.get<Products>(this.baseUrl + 'products/getproductforcart/' + id).pipe(take(1));
  }

  getProductForMin(id: number) {
    return this.http.get<Products>(this.baseUrl + 'products/getproductforcart/' + id).pipe(take(1));
  }

  getRelatedProduct(childId: number, productId: number) {
    return this.http.get<Products[]>(this.baseUrl + 'products/related/' + childId + '/' + productId);
  }

  getPopularProduct() {
    return this.http.get<Products[]>(this.baseUrl + 'products/popular/');
  }
}

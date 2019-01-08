import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setDefaultAddress(id: number, addressObj) {
    return this.http.put(this.baseUrl + 'user/' + id, addressObj);
  }

  createOrder(userId: number, order) {
    return this.http.post(this.baseUrl + 'order/' + userId, order);
  }

  updateProductSizeAfterOrder(productId: number, sizeArr) {
    return this.http.put(this.baseUrl + 'user/' + productId + '/product', sizeArr);
  }
  getOrderForThankyou(userId: number, reference: string) {
    return this.http.get(this.baseUrl + 'order/' + userId + '/' + reference);
  }
}

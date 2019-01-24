import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IQuery } from 'src/app/_models/IQuery';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl;

  getOrders(orderQuery: IQuery) {
    let params = this.queryParams(orderQuery);

    return this.http.get(this.baseUrl + 'order', { params: params });
  }

  getAllUserOrders(userId: number, orderQuery: IQuery) {
    let params = this.queryParams(orderQuery);

    return this.http.get(this.baseUrl + 'order/' + userId + '/user/admin', { params: params });
  }

  getOrder(id: number) {
    return this.http.get(this.baseUrl + 'order/' + id);
  }

  completeOrder(id: number) {
    return this.http.put(this.baseUrl + 'order/' + id, {});
  }

  getOrderForThankyou(userId: number, reference: string) {
    return this.http.get(this.baseUrl + 'order/' + userId + '/' + reference);
  }

  sendNotification(id: number) {
    return this.http.post(
      this.baseUrl + 'order/sendnotification/' + id,
      {},
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    );
  }
  getUserOrders(userId: number, orderQuery: IQuery) {
    let params = this.queryParams(orderQuery);

    return this.http.get(this.baseUrl + 'order/' + userId + '/user', { params: params });
  }

  private queryParams(orderQuery: IQuery) {
    let params = new HttpParams();

    if (orderQuery.sortBy != null) {
      params = params.append('sortBy', orderQuery.sortBy);
    }

    if (orderQuery.isSortAscending.length) {
      params = params.append('isSortAscending', orderQuery.isSortAscending);
    }

    params = params.append('isShipped', '' + orderQuery.isShipped);
    params = params.append('page', '' + orderQuery.pageIndex);
    params = params.append('pageSize', '' + orderQuery.pageSize);

    return params;
  }
}

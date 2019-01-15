import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Query } from 'src/app/_models/Query';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl;

  getOrders(orderQuery: Query) {
    let params = this.queryParams(orderQuery);

    return this.http.get(this.baseUrl + 'order', { params: params });
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
  getUserOrders(userId: number, orderQuery: Query) {
    let params = this.queryParams(orderQuery);

    return this.http.get(this.baseUrl + 'order/' + userId + '/user', { params: params });
  }

  private queryParams(orderQuery: Query) {
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

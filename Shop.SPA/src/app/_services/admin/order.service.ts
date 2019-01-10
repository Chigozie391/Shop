import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Query } from 'src/app/_models/Query';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private Http: HttpClient) {}
  baseUrl = environment.apiUrl;

  getOrders(orderQuery: Query) {
    let params = this.queryParams(orderQuery);

    return this.Http.get(this.baseUrl + 'order', { params: params });
  }

  getOrder(id: number) {
    return this.Http.get(this.baseUrl + 'order/' + id);
  }

  completeOrder(id: number) {
    return this.Http.put(this.baseUrl + 'order/' + id, {});
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

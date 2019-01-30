import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IQuery } from '../_models/IQuery';
import { UserForList } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setAddress(id: number, addressObj) {
    return this.http.put(this.baseUrl + 'user/' + id + '/setaddress', addressObj);
  }
  updateUserInfo(id: number, infoObj) {
    return this.http.put(this.baseUrl + 'user/' + id, infoObj);
  }

  createOrder(userId: number, order) {
    return this.http.post<number>(this.baseUrl + 'order/' + userId, order);
  }

  updateSizeOnOrder(productId: number, sizeArr) {
    return this.http.put(this.baseUrl + 'user/' + productId + '/product', sizeArr);
  }

  getUsers(userQuery: IQuery) {
    let params = this.queryParams(userQuery);

    return this.http.get<UserForList[]>(this.baseUrl + 'user', { params: params });
  }

  getUser(Id: number) {
    return this.http.get(this.baseUrl + 'user/' + Id);
  }

  changePassword(userId: number, userPassword: any) {
    return this.http.put(this.baseUrl + 'user/' + userId + '/changepassword', userPassword);
  }

  private queryParams(userQuery: IQuery) {
    let params = new HttpParams();

    if (userQuery.sortBy != null) {
      params = params.append('sortBy', userQuery.sortBy);
    }

    if (userQuery.isSortAscending.length) {
      params = params.append('isSortAscending', userQuery.isSortAscending);
    }

    params = params.append('page', '' + userQuery.pageIndex);
    params = params.append('pageSize', '' + userQuery.pageSize);

    return params;
  }
}

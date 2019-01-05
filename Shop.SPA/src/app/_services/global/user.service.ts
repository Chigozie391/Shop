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
}

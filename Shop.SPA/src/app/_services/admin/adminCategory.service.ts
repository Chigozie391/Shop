import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategoryWithChildren() {
    return this.http.get(this.baseUrl + 'category');
  }

  addChildCategory(id, child) {
    return this.http.post(this.baseUrl + 'category/createchildcategory/' + id, child);
  }

  updateChildCategory(id, child) {
    return this.http.put(this.baseUrl + 'category/updatechildcategory/' + id, child);
  }

  deleteChildCategory(id) {
    return this.http.delete(this.baseUrl + 'category/deletechildcategory/' + id);
  }

  addCategory(parent) {
    return this.http.post(this.baseUrl + 'category', parent);
  }
  updateCategory(id, body) {
    return this.http.put(this.baseUrl + 'category/' + id, body);
  }

  deleteCategory(id) {
    return this.http.delete(this.baseUrl + 'category/' + id);
  }
}

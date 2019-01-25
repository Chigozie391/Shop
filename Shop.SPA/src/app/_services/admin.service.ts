import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getCounters() {
    return this.http.get(this.baseUrl + 'admin/counters');
  }

  public updateRole(email: string, roleObj: any) {
    return this.http.put(this.baseUrl + 'admin/updateroles/' + email, roleObj);
  }
  public getSlides() {
    return this.http.get(this.baseUrl + 'carousel');
  }

  public addSlide(slide) {
    return this.http.post(this.baseUrl + 'carousel', slide, { reportProgress: true });
  }
  public deleteSlide(id) {
    return this.http.delete(this.baseUrl + 'carousel/' + id);
  }
}

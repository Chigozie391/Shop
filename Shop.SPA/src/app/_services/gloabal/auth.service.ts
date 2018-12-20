import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/_models/User';
import { map } from 'rxjs/operators';
import { AuthUser } from 'src/app/_models/AuthUser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  decodedToken: string;
  userToken: string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(user: User) {
    this.http.post<AuthUser>(this.baseUrl + 'auth/login', user).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
        }
      })
    );
  }
  register(user: User) {
    this.http.post(this.baseUrl + 'auth/register', user);
  }
}

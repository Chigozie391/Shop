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
  decodedToken: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(user: User) {
    return this.http.post<AuthUser>(this.baseUrl + 'auth/login', user).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        }
      })
    );
  }
  register(user: User) {
    return this.http.post(this.baseUrl + 'auth/register', user);
  }

  loggedIn() {
    let token = this.jwtHelper.tokenGetter();
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  roleMatch(allowedRoles: string[]) {
    const userRole = this.decodedToken.role as Array<string>;
    let isMatch = false;
    allowedRoles.forEach(element => {
      if (userRole.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}

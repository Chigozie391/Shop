import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shop';

  constructor(private authService: AuthService, private jwtHelper: JwtHelperService) {}
  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (user) {
      this.authService.currentUser = JSON.parse(user);
    }
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}

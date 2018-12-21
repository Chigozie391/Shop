import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/gloabal/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

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
      //   this.authService
    }
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}

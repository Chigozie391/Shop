import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/gloabal/auth.service';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  isAdmin() {
    if (this.isLoggedIn()) {
      return this.authService.roleMatch(['Admin', 'Moderator']);
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertify.message('Logged out');
    this.router.navigate(['/']);
  }
}

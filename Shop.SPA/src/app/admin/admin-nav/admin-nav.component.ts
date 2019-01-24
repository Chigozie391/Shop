import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/_services/ui.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  currentUser: User;
  constructor(private uiService: UIService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  toggleSideNav() {
    this.uiService.toggleAdminSideNav.next(true);
  }

  changePassword() {
    this.router.navigate(['changepassword']);
  }

  myProfile() {
    this.router.navigate(['/admin/users', this.currentUser.id]);
  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.uiService.message('Logged out');
    this.router.navigate(['/']);
  }
}

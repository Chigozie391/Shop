import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/gloabal/auth.service';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/admin/category.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  hamclick = false;
  categories: any;
  totalItemInCart: number;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private cateService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cateService.getCategoryWithChildren().subscribe(x => {
      this.categories = x;
    });
    this.authService.totalItemInCart.subscribe(totalItem => (this.totalItemInCart = totalItem));
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  isAdmin() {
    if (this.isLoggedIn()) {
      return this.authService.roleMatch(['Admin', 'Moderator']);
    }
  }

  toggleHam() {
    if (this.hamclick) {
      return (this.hamclick = false);
    }
    return (this.hamclick = true);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertify.message('Logged out');
    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/admin/category.service';
import { AuthService } from 'src/app/_services/global/auth.service';
import { UIService } from 'src/app/_services/global/alertify.service';

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
    private uiService: UIService,
    private cateService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cateService.getCategoryWithChildren().subscribe(x => {
      this.categories = x;
    });
    this.uiService.totalItemInCart.subscribe(totalItem => (this.totalItemInCart = totalItem));
  }

  isLoggedIn() {
    return this.authService.loggedIn();
  }

  showLoginModal() {
    this.uiService.openLoginModel();
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
    this.uiService.message('Logged out');
    this.router.navigate(['/']);
  }
}

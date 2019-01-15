import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { UIService } from '../_services/ui.service';
import { DialogService } from '../_services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    private uiService: UIService
  ) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.loggedIn()) {
      const roles = next.data['roles'] as Array<string>;
      if (roles) {
        const match = this.authService.roleMatch(roles);

        if (match) {
          return true;
        } else {
          this.router.navigate(['/']);
          this.uiService.error("You don't have access to that page");
        }
      }
    } else {
      this.router.navigate(['/']);
      this.uiService.error('You need to login');
      this.dialogService.openLoginModel();
      return false;
    }
  }
}

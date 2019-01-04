import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/global/auth.service';
import { UIService } from '../_services/global/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private uiService: UIService) {}

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
      this.uiService.error("You don't have access to that page");
      return false;
    }
  }
}

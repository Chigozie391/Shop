import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UIService } from '../_services/ui.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class UserViewResolver implements Resolve<any> {
  constructor(private userService: UserService, private uiService: UIService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.userService.getUser(route.params['id']).pipe(
      catchError(() => {
        this.uiService.error('Problem retrieving data');
        this.router.navigate(['/admin/users']);
        return of(null);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UIService } from '../_services/global/ui.service';
import { UserService } from '../_services/global/user.service';
import { Order } from '../_models/Order';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ThankYouResolver implements Resolve<Order> {
  constructor(private userService: UserService, private uiService: UIService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    return this.userService.getOrderForThankyou(route.params['userid'], route.params['reference']).pipe(
      catchError(() => {
        this.uiService.error('Problem retrieving data');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UIService } from '../_services/global/ui.service';
import { Order } from '../_models/Order';
import { catchError } from 'rxjs/operators';
import { OrderService } from '../_services/admin/order.service';

@Injectable()
export class ThankYouResolver implements Resolve<Order> {
  constructor(private orderService: OrderService, private uiService: UIService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    return this.orderService.getOrderForThankyou(route.params['userid'], route.params['reference']).pipe(
      catchError(() => {
        this.uiService.error('Problem retrieving data');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}

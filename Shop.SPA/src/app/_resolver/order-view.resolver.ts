import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UIService } from '../_services/ui.service';
import { OrderViewAdmin } from '../_models/Order';
import { OrderService } from '../_services/order.service';

@Injectable()
export class OrderViewResolver implements Resolve<OrderViewAdmin> {
  constructor(private orderService: OrderService, private uiService: UIService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<OrderViewAdmin> {
    return this.orderService.getOrder(route.params['id']).pipe(
      catchError(() => {
        this.uiService.error('Problem retrieving data');
        this.router.navigate(['/admin/orders']);
        return of(null);
      })
    );
  }
}

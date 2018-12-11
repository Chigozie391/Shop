import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Products } from '../_models/Products';
import { ProductService } from '../_services/admin/product.service';
import { AlertifyService } from '../_services/gloabal/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProductViewResolver implements Resolve<Products> {
  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Products> {
    return this.productService.getProduct(route.params['id']).pipe(
      catchError(() => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/admin']);
        return of(null);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Products } from '../_models/Products';
import { ProductService } from '../_services/product.service';
import { catchError } from 'rxjs/operators';
import { UIService } from '../_services/ui.service';

@Injectable()
export class ProductViewResolver implements Resolve<Products> {
  constructor(private productService: ProductService, private uiService: UIService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Products> {
    return this.productService.getProduct(route.params['id']).pipe(
      catchError(() => {
        this.uiService.error('Problem retrieving data');
        this.router.navigate(['/admin/products']);
        return of(null);
      })
    );
  }
}

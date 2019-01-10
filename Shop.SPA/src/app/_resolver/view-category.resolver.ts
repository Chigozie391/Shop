import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UIService } from '../_services/global/ui.service';
import { ProductService } from '../_services/admin/product.service';
import { Query } from '../_models/Query';

@Injectable()
export class ViewCategoryResolver implements Resolve<any> {
  productQuery: Query = {
    sortBy: 'lastUpdated',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 6
  };

  constructor(private productService: ProductService, private uiService: UIService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.productService.getProductsInCategory(route.params['id'], this.productQuery).pipe(
      catchError(() => {
        this.uiService.error('Problem retrieving data');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}

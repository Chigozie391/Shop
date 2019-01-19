import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UIService } from '../_services/ui.service';
import { ProductService } from '../_services/product.service';
import { IQuery } from '../_models/IQuery';

@Injectable()
export class ViewCategoryResolver implements Resolve<any> {
  productQuery: IQuery = {
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Products } from 'src/app/_models/Products';
import { ProductService } from 'src/app/_services/product.service';
import { tap } from 'rxjs/operators';
import { Query } from 'src/app/_models/Query';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  childId: number;
  products: Products[];
  productQuery: Query = {
    sortBy: 'lastUpdated',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 6
  };

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(x => {
      this.products = x.product.items;
      this.paginator.length = x.product.totalItems;
    });
    this.childId = this.route.params['value'].id;
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.productQuery.pageIndex = this.paginator.pageIndex + 1;
          this.productQuery.pageSize = this.paginator.pageSize;

          this.loadProducts();
        })
      )
      .subscribe();
  }

  loadProducts() {
    this.productService.getProductsInCategory(this.childId, this.productQuery).subscribe(result => {
      this.products = result['items'];
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Products } from 'src/app/_models/Products';
import { Query } from 'src/app/_models/Query';
import { MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  products: Products[];
  productQuery: Query = {
    sortBy: 'featured',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 6
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts(this.productQuery).subscribe(x => {
      this.products = x['items'];
      this.paginator.length = x['totalItems'];
    });
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
    this.productService.getProducts(this.productQuery).subscribe(result => {
      this.products = result['items'];
    });
  }
}

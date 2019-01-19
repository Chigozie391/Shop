import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { MatTable, MatPaginator } from '@angular/material';
import { Products } from 'src/app/_models/Products';
import { IQuery } from 'src/app/_models/IQuery';
import { tap } from 'rxjs/operators';
import { UIService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['action', 'name', 'category', 'price', 'featured', 'sold', 'lastupdated'];

  dataSource: Products[];

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading: boolean;

  productQuery: IQuery = {
    sortBy: '',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 5
  };

  constructor(private productService: ProductService, private uiService: UIService) {}

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.productQuery.pageIndex = this.paginator.pageIndex + 1;
          this.productQuery.pageSize = this.paginator.pageSize;

          this.getProducts();
        })
      )
      .subscribe();
  }

  getProducts() {
    this.isLoading = false;
    this.productService.getProducts(this.productQuery).subscribe(
      result => {
        this.dataSource = result['items'];
        this.paginator.length = result['totalItems'];
      },
      null,
      () => (this.isLoading = true)
    );
  }

  resetFilters() {
    this.productQuery = {
      sortBy: '',
      isSortAscending: '',
      pageIndex: 1,
      pageSize: 20
    };

    this.getProducts();
  }

  setFeatured(id: number) {
    this.productService.setFeatured(id).subscribe(
      () => {
        const product = this.dataSource.find(p => p.id == id);
        product.featured ? (product.featured = false) : (product.featured = true);

        this.uiService.success('Successful');
        this.table.renderRows();
      },
      error => this.uiService.error(error.error)
    );
  }

  archiveProduct(id) {
    this.uiService.confirm('Are you sure you want to archive the product', () => {
      this.productService.achiveProduct(id).subscribe(
        () => {
          const index = this.dataSource.findIndex(p => p.id == id);

          this.dataSource.splice(index, 1);
          this.uiService.success('Successfully archived');
          this.table.renderRows();
        },
        error => this.uiService.error(error.error)
      );
    });
  }
  deleteProduct(id) {
    this.uiService.confirm('Permanently delete this product ? ', () => {
      this.productService.deleteProduct(id).subscribe(
        () => {
          const index = this.dataSource.findIndex(p => p.id == id);

          this.dataSource.splice(index, 1);
          this.uiService.success('Successfully archived');
          this.table.renderRows();
        },
        error => this.uiService.error(error.error)
      );
    });
  }
}

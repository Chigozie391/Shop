import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/app/_models/Products';
import { MatTable, MatPaginator } from '@angular/material';
import { IQuery } from 'src/app/_models/IQuery';
import { ProductService } from 'src/app/_services/product.service';
import { UIService } from 'src/app/_services/ui.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  displayedColumns = ['action', 'name', 'category', 'price', 'featured', 'sold', 'lastupdated'];

  dataSource: Products[];

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading: boolean;
  childCategoryId: number;

  productQuery: IQuery = {
    sortBy: '',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 20
  };

  constructor(private productService: ProductService, private uiService: UIService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.childCategoryId = this.route.params['value'].id;
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
    this.productService.getProductsInCategory(this.childCategoryId, this.productQuery).subscribe(
      result => {
        this.dataSource = result['items'];
        this.paginator.length = result['totalItems'];
        console.log(result);
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
          this.uiService.success('Successfully deleted');
          this.table.renderRows();
        },
        error => this.uiService.error(error.error)
      );
    });
  }
}

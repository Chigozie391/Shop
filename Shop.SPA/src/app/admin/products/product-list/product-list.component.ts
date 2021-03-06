import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { MatTable, MatPaginator } from '@angular/material';
import { Products } from 'src/app/_models/Products';
import { IQuery } from 'src/app/_models/IQuery';
import { tap } from 'rxjs/operators';
import { UIService } from 'src/app/_services/ui.service';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['action', 'name', 'category', 'price', 'featured', 'sold', 'lastupdated'];

  dataSource: Products[];

  parentCategory = [];
  childCategory = [];
  parentId: any;
  childId = null;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading: boolean;

  productQuery: IQuery = {
    sortBy: '',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 10
  };

  constructor(
    private productService: ProductService,
    private uiService: UIService,
    private cateService: CategoryService
  ) {}

  ngOnInit() {
    this.cateService.getCategoryWithChildren().subscribe((x: []) => {
      this.parentCategory = x;
    });

    this.getProducts();
  }

  parentSelectionChange() {
    if (this.parentId == 0) {
      this.childId = null;
      this.parentId = null;
    } else {
      this.childCategory = this.parentCategory.find(x => x.id == this.parentId).childCategories;
      this.childId = '' + this.childCategory[0].id;
    }
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.productQuery.pageIndex = this.paginator.pageIndex + 1;
          this.productQuery.pageSize = this.paginator.pageSize;

          this.filter();
        })
      )
      .subscribe();
  }

  filter() {
    if (this.childId != null) {
      this.getProductInCategory();
      this.paginator.firstPage();
    } else {
      this.getProducts();
    }
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

  getProductInCategory() {
    this.isLoading = false;
    this.productService.getProductsInCategory(this.childId, this.productQuery).subscribe(
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
    this.parentId = '';
    this.childId = null;

    this.getProducts();
    this.paginator.firstPage();
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

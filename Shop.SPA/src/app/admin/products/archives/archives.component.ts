import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatPaginator } from '@angular/material';
import { Products } from 'src/app/_models/Products';
import { IQuery } from 'src/app/_models/IQuery';
import { ProductService } from 'src/app/_services/product.service';
import { tap } from 'rxjs/operators';
import { UIService } from 'src/app/_services/ui.service';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {
  displayedColumns = ['action', 'name', 'category', 'price', 'sold', 'lastupdated'];

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
    deleted: true,
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 5
  };

  constructor(
    private productService: ProductService,
    private cateService: CategoryService,
    private alertify: UIService
  ) {}
  ngOnInit() {
    this.cateService.getCategoryWithChildren().subscribe((x: []) => {
      this.parentCategory = x;
    });

    this.getArchivedProducts();
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
      this.getArchivedProducts();
    }
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
      pageSize: 5
    };
    this.parentId = '';
    this.childId = null;
    this.getArchivedProducts();
    this.paginator.firstPage();
  }

  restoreProduct(id: number) {
    this.alertify.confirm('Restore to products ? ', () => {
      this.productService.restoreProduct(id).subscribe(
        () => {
          const index = this.dataSource.findIndex(p => p.id == id);

          this.dataSource.splice(index, 1);
          this.alertify.success('Successfully restored');
          this.table.renderRows();
        },
        error => this.alertify.error(error.error)
      );
    });
  }

  getArchivedProducts() {
    this.isLoading = false;
    this.productService.getArchivedProducts(this.productQuery).subscribe(
      result => {
        this.dataSource = result['items'];
        this.paginator.length = result['totalItems'];
      },
      null,
      () => (this.isLoading = true)
    );
  }

  deleteProduct(id) {
    this.alertify.confirm('Permanently delete this product ? ', () => {
      this.productService.deleteProduct(id).subscribe(
        () => {
          const index = this.dataSource.findIndex(p => p.id == id);

          this.dataSource.splice(index, 1);
          this.alertify.success('Successfully archived');
          this.table.renderRows();
        },
        error => this.alertify.error(error.error)
      );
    });
  }
}

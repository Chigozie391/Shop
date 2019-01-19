import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatPaginator } from '@angular/material';
import { Products } from 'src/app/_models/Products';
import { IQuery } from 'src/app/_models/IQuery';
import { ProductService } from 'src/app/_services/product.service';
import { tap } from 'rxjs/operators';
import { UIService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit {
  displayedColumns = ['action', 'name', 'category', 'price', 'sold', 'lastupdated'];

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

  constructor(private productService: ProductService, private alertify: UIService) {}
  ngOnInit() {
    this.getArchivedProducts();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.productQuery.pageIndex = this.paginator.pageIndex + 1;
          this.productQuery.pageSize = this.paginator.pageSize;

          this.getArchivedProducts();
        })
      )
      .subscribe();
  }
  resetFilters() {
    this.productQuery = {
      sortBy: '',
      isSortAscending: '',
      pageIndex: 1,
      pageSize: 5
    };
    this.getArchivedProducts();
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/_services/admin/product.service';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Products } from 'src/app/_models/Products';
import { ProductQuery } from 'src/app/_models/productQuery';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns = ['action', 'name', 'category', 'price', 'featured', 'sold', 'lastupdated'];

  dataSource = new MatTableDataSource<Products>();
  @ViewChild(MatTable) table: MatTable<any>;
  product: Products;
  sortBy: string;
  isSortAscending = '';

  productQuery: ProductQuery = {
    sortBy: '',
    isSortAscending: ''
  };

  constructor(private productService: ProductService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.productQuery).subscribe(products => {
      this.dataSource.data = products;
    });
  }

  resetFilters() {
    this.sortBy = null;
    this.isSortAscending = '';
    this.productQuery.sortBy = '';
    this.productQuery.isSortAscending = '';

    this.getProducts();
  }

  loadProducts() {
    this.productQuery.sortBy = this.sortBy;
    this.productQuery.isSortAscending = this.isSortAscending;

    this.productService.getProducts(this.productQuery).subscribe(products => {
      this.dataSource.data = products;
    });
  }

  setFeatured(id: number) {
    this.productService.setFeatured(id).subscribe(
      x => {
        const product = this.dataSource.data.find(p => p.id == id);
        product.featured ? (product.featured = false) : (product.featured = true);

        this.alertify.success('Successful');
        this.table.renderRows();
      },
      error => this.alertify.error(error.error)
    );
  }

  archiveProduct(id) {
    this.alertify.confirm('Are you sure you want to archive the product', () => {
      this.productService.achiveProduct(id).subscribe(
        x => {
          const index = this.dataSource.data.findIndex(p => p.id == id);

          this.dataSource.data.splice(index, 1);
          this.alertify.success('Successfully archived');
          this.table.renderRows();
        },
        error => this.alertify.error(error.error)
      );
    });
  }
}

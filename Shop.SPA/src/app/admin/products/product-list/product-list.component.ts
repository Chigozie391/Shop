import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/_services/admin/product.service';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';
import { MatTableDataSource, MatTable } from '@angular/material';
import { Products } from 'src/app/_models/Products';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  displayedColumns = ['action', 'name', 'price', 'featured', 'sold', 'lastupdated'];

  dataSource = new MatTableDataSource<Products>();
  @ViewChild(MatTable) table: MatTable<any>;
  product: Products;

  constructor(private productService: ProductService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.dataSource.data = products;
    });
  }

  viewProduct(id: number) {
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
      console.log(this.product.deleted);
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
      error => this.error()
    );
  }

  deleteProduct(id) {
    this.alertify.confirm('Are you sure you want to delete the product', () => {
      this.productService.deleteProduct(id).subscribe(
        x => {
          const index = this.dataSource.data.findIndex(p => p.id == id);

          this.dataSource.data.splice(index, 1);
          this.alertify.success('Successfully deleted');
          this.table.renderRows();
        },
        error => this.error()
      );
    });
  }

  error() {
    this.alertify.error('Something went wrong');
  }
}

import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Products } from 'src/app/_models/Products';
import { ProductService } from 'src/app/_services/product.service';
import { UIService } from 'src/app/_services/ui.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Products;
  @Input() updateSizeArray;
  sizesArray = [];
  constructor(
    private productService: ProductService,
    private uiService: UIService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.sizesArray = JSON.parse(this.product.sizes);
  }

  setFeatured(id: number) {
    this.productService.setFeatured(id).subscribe(
      (x: boolean) => {
        this.product.featured = x;
        this.uiService.success('Successful');
      },
      error => this.uiService.error(error.error)
    );
  }

  back() {
    this.location.back();
  }

  restoreProduct(id: number) {
    this.uiService.confirm('Restore to products ? ', () => {
      this.productService.restoreProduct(id).subscribe(
        () => {
          this.product.deleted = false;
          this.uiService.success('Successfully restored');
        },
        error => this.uiService.error(error.error)
      );
    });
  }

  archiveProduct(id) {
    this.uiService.confirm('Are you sure you want to archive the product', () => {
      this.productService.achiveProduct(id).subscribe(
        () => {
          this.product.deleted = true;
          this.uiService.success('Successfully archived');
        },
        error => this.uiService.error(error.error)
      );
    });
  }
  deleteProduct(id) {
    this.uiService.confirm('Permanently delete this product ? ', () => {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.router.navigate(['/admin/products']);
          this.uiService.success('Successfully deleted');
        },
        error => this.uiService.error(error.error)
      );
    });
  }
}

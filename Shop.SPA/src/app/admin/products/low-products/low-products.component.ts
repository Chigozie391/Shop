import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { UIService } from 'src/app/_services/ui.service';
import { IQuery } from 'src/app/_models/IQuery';

@Component({
  selector: 'app-low-products',
  templateUrl: './low-products.component.html',
  styleUrls: ['./low-products.component.css']
})
export class LowProductsComponent implements OnInit {
  rawProducts: any[];
  productsArr = [];

  isLoading: boolean;

  productQuery: IQuery = {
    lowItems: true,
    sortBy: '',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 5
  };

  constructor(private productService: ProductService, private uiService: UIService) {}

  ngOnInit() {
    this.getProducts();
  }

  public getProducts() {
    this.isLoading = true;
    this.rawProducts = [];
    this.productsArr = [];
    this.productService.getProducts(this.productQuery).subscribe(
      (x: []) => {
        this.rawProducts = x['items'];
      },
      null,
      () => {
        this.rawProducts.forEach(element => {
          const sizes: any[] = JSON.parse(element.sizes);
          const low = sizes.filter(o => o.threshold >= o.quantity);
          if (low.length > 0) {
            const obj = {
              id: element.id,
              title: element.title,
              sizes: low
            };
            this.productsArr.push(obj);
          }
        });
        this.isLoading = false;
      }
    );
  }
  archiveProduct(id) {
    this.uiService.confirm('Are you sure you want to archive the product', () => {
      this.productService.achiveProduct(id).subscribe(
        () => {
          const index = this.productsArr.findIndex(p => p.id == id);

          this.productsArr.splice(index, 1);
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
          const index = this.productsArr.findIndex(p => p.id == id);

          this.productsArr.splice(index, 1);
          this.uiService.success('Successfully archived');
        },
        error => this.uiService.error(error.error)
      );
    });
  }

  public delete(id) {}
}

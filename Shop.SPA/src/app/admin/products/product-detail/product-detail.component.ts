import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Products } from 'src/app/_models/Products';
import { ProductService } from 'src/app/_services/product.service';
import { UIService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Products;
  @Input() updateSizeArray;
  sizesArray = [];
  constructor(private productService: ProductService, private uiService: UIService) {}

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
}

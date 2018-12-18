import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Products } from 'src/app/_models/Products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Products;
  @Input() updateSizeArray;
  sizesArray = [];
  constructor() {}

  ngOnInit() {
    this.sizesArray = JSON.parse(this.product.sizes);
  }
}

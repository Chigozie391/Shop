import { Component, OnInit, Input } from '@angular/core';
import { Products } from 'src/app/_models/Products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Products;

  constructor() {}

  ngOnInit() {}
}

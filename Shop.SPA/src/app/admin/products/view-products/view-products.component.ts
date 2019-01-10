import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/_models/Products';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  product: Products;
  indexTab: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data['product'];
    });
  }

  updateMainPhoto($event) {
    this.product.photoUrl = $event;
  }
  updateProductEvent($event) {
    this.product = $event;
    this.indexTab = 0;
  }
}

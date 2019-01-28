import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Products } from 'src/app/_models/Products';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
  products: Products[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getPopularProduct().subscribe(x => {
      this.products = x;
    });
  }
}

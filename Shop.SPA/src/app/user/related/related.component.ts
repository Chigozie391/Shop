import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Products } from 'src/app/_models/Products';

@Component({
  selector: 'app-related',
  templateUrl: './related.component.html',
  styleUrls: ['./related.component.css']
})
export class RelatedComponent implements OnInit {
  @Input() childId: number;
  @Input() productId: number;
  products: Products[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getRelatedProduct(this.childId, this.productId).subscribe(x => {
      this.products = x;
      console.log(x);
    });
  }
}

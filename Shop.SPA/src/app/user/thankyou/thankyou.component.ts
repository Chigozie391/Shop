import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/_models/Products';
import { ProductService } from 'src/app/_services/admin/product.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  orderForThankyou: any;
  itemsArr: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.orderForThankyou = data['order'];
      this.itemsArr = JSON.parse(this.orderForThankyou.items);
    });
  }

  startShopping() {
    this.router.navigate(['/']);
  }
}

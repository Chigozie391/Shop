import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderViewAdmin } from 'src/app/_models/Order';
import { OrderService } from 'src/app/_services/order.service';
import { UIService } from 'src/app/_services/ui.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  order: OrderViewAdmin;
  itemsArr = [];

  constructor(
    private route: ActivatedRoute,
    private uiService: UIService,
    private router: Router,
    private orderService: OrderService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.data.subscribe(x => {
      this.order = x['order'];
      this.itemsArr = JSON.parse(this.order.items);
    });
  }

  back() {
    this.location.back();
  }

  completeOrder() {
    this.uiService.confirm('Are you sure you want to complete the order ? ', () => {
      this.orderService.completeOrder(this.order.id).subscribe(x => {
        this.uiService.success('Order successfully completed');
        this.router.navigate(['admin/orders']);
      });
    });
  }

  unCompleteOrder() {
    this.uiService.confirm('Set this order as not shipped ?', () => {
      this.orderService.completeOrder(this.order.id).subscribe(x => {
        this.uiService.message('Order set as not shipped');
        this.router.navigate(['admin/orders']);
      });
    });
  }
}

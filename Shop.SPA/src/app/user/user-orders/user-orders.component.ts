import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';
import { OrderService } from 'src/app/_services/order.service';
import { Order, OrderViewAdmin } from 'src/app/_models/Order';
import { Query } from 'src/app/_models/Query';
import { MatPaginator } from '@angular/material';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  currentUser: User;
  rawOrder: any[] = [];
  orders: OrderViewAdmin[] = [];

  isShipped = false;
  isLoading: boolean;

  sortBy: string;
  isSortAscending = '';

  orderQuery: Query = {
    isShipped: false,
    sortBy: '',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 2
  };

  constructor(private authService: AuthService, private orderService: OrderService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.orderService.getUserOrders(this.currentUser.id, this.orderQuery).subscribe(
      x => {
        this.rawOrder = x['items'];
        this.paginator.length = x['totalItems'];
      },
      null,
      () => {
        this.rawOrder.forEach(element => {
          element.items = JSON.parse(element.items);
          this.orders.push(element);
        });
      }
    );
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.orderQuery.pageIndex = this.paginator.pageIndex + 1;
          this.orderQuery.pageSize = this.paginator.pageSize;

          this.loadProducts();
        })
      )
      .subscribe();
  }

  loadProducts() {
    this.orderQuery.sortBy = this.sortBy;
    this.orderQuery.isShipped = this.isShipped;
    this.orderQuery.isSortAscending = this.isSortAscending;

    this.orderService.getUserOrders(this.currentUser.id, this.orderQuery).subscribe(
      x => {
        this.rawOrder = x['items'];
        this.paginator.length = x['totalItems'];
      },
      null,
      () => {
        this.orders = [];
        this.rawOrder.forEach(element => {
          element.items = JSON.parse(element.items);
          this.orders.push(element);
        });
        console.log(this.orders);
      }
    );
  }

  resetFilters() {
    this.sortBy = null;
    this.isSortAscending = '';
    this.orderQuery.sortBy = '';
    this.orderQuery.isSortAscending = '';

    this.loadProducts();
  }
}

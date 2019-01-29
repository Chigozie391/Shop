import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';
import { OrderService } from 'src/app/_services/order.service';
import { OrderViewAdmin } from 'src/app/_models/Order';
import { IQuery } from 'src/app/_models/IQuery';
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

  isLoading: boolean;

  orderQuery: IQuery = {
    isShipped: false,
    sortBy: '',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 2
  };

  constructor(private authService: AuthService, private orderService: OrderService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.loadOrders();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.orderQuery.pageIndex = this.paginator.pageIndex + 1;
          this.orderQuery.pageSize = this.paginator.pageSize;

          this.loadOrders();
        })
      )
      .subscribe();
  }

  filter() {
    this.loadOrders();
    this.paginator.firstPage();
  }

  loadOrders() {
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
      }
    );
  }

  resetFilters() {
    this.orderQuery.sortBy = '';
    this.orderQuery.isSortAscending = '';

    this.loadOrders();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/_services/admin/order.service';
import { Query } from 'src/app/_models/Query';
import { MatTable, MatPaginator } from '@angular/material';
import { OrderForListAdmin } from 'src/app/_models/Order';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  displayedColumns = ['action', 'reference', 'totalPrice', 'orderDate', 'shipped'];
  dataSource: OrderForListAdmin[];
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isShipped = false;
  isLoading: boolean;

  sortBy: string;
  isSortAscending = '';

  orderQuery: Query = {
    isShipped: false,
    sortBy: '',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 5
  };

  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.getProducts();
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

  getProducts() {
    this.isLoading = false;
    this.orderService.getOrders(this.orderQuery).subscribe(
      result => {
        this.dataSource = result['items'];
        this.paginator.length = result['totalItems'];
      },
      null,
      () => (this.isLoading = true)
    );
  }

  resetFilters() {
    this.sortBy = null;
    this.isSortAscending = '';
    this.orderQuery.sortBy = '';
    this.orderQuery.isSortAscending = '';

    this.getProducts();
  }

  loadProducts() {
    this.orderQuery.sortBy = this.sortBy;
    this.orderQuery.isShipped = this.isShipped;
    this.orderQuery.isSortAscending = this.isSortAscending;

    this.orderService.getOrders(this.orderQuery).subscribe(result => {
      this.dataSource = result['items'];
    });
  }
}

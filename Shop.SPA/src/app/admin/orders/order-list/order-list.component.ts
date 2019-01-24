import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { IQuery } from 'src/app/_models/IQuery';
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

  isLoading: boolean;

  orderQuery: IQuery = {
    isShipped: false,
    sortBy: '',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 5
  };

  constructor(private orderService: OrderService) {}
  ngOnInit() {
    this.getOrders();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.orderQuery.pageIndex = this.paginator.pageIndex + 1;
          this.orderQuery.pageSize = this.paginator.pageSize;

          this.getOrders();
        })
      )
      .subscribe();
  }

  getOrders() {
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
    this.orderQuery = {
      isShipped: false,
      sortBy: '',
      isSortAscending: '',
      pageIndex: 1,
      pageSize: 5
    };

    this.getOrders();
  }
}

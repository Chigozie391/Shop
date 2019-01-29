import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { OrderForListAdmin } from 'src/app/_models/Order';
import { MatTable, MatPaginator } from '@angular/material';
import { IQuery } from 'src/app/_models/IQuery';
import { OrderService } from 'src/app/_services/order.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-order-admin',
  templateUrl: './user-order-admin.component.html',
  styleUrls: ['./user-order-admin.component.css']
})
export class UserOrderAdminComponent implements OnInit {
  displayedColumns = ['action', 'reference', 'totalPrice', 'orderDate', 'shipped'];
  dataSource: OrderForListAdmin[];
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() userId: number;

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
    this.getAllUserOrders();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.orderQuery.pageIndex = this.paginator.pageIndex + 1;
          this.orderQuery.pageSize = this.paginator.pageSize;

          this.getAllUserOrders();
        })
      )
      .subscribe();
  }

  filter() {
    this.getAllUserOrders();
    this.paginator.firstPage();
  }

  getAllUserOrders() {
    this.isLoading = false;
    this.orderService.getAllUserOrders(this.userId, this.orderQuery).subscribe(
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

    this.getAllUserOrders();
    this.paginator.firstPage();
  }
}

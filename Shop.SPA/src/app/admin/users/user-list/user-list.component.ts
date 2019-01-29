import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserForList } from 'src/app/_models/User';
import { MatTable, MatPaginator } from '@angular/material';
import { IQuery } from 'src/app/_models/IQuery';
import { UserService } from 'src/app/_services/user.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns = ['action', 'name', 'email', 'roles', 'login'];

  dataSource: UserForList[];

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  isLoading: boolean;

  userQuery: IQuery = {
    sortBy: '',
    isSortAscending: '',
    pageIndex: 1,
    pageSize: 5
  };
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.userQuery.pageIndex = this.paginator.pageIndex + 1;
          this.userQuery.pageSize = this.paginator.pageSize;

          this.getUsers();
        })
      )
      .subscribe();
  }

  getUsers() {
    this.isLoading = false;
    this.userService.getUsers(this.userQuery).subscribe(
      result => {
        this.dataSource = result['items'];
        this.paginator.length = result['totalItems'];
      },
      null,
      () => (this.isLoading = true)
    );
  }
  resetFilters() {
    this.userQuery = {
      isShipped: false,
      sortBy: '',
      isSortAscending: '',
      pageIndex: 1,
      pageSize: 5
    };

    this.getUsers();
    this.paginator.firstPage();
  }
}

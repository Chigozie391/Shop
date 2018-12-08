import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  baseUrl = environment.apiUrl;
  categoryWithChildren: {};

  constructor(private Http: HttpClient) {}

  ngOnInit() {
    this.getCategoriesWithChildren();
  }

  getCategoriesWithChildren() {
    this.Http.get(this.baseUrl + 'category').subscribe(x => {
      this.categoryWithChildren = x;
    });
  }
}

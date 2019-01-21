import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-panel-admin',
  templateUrl: './user-panel-admin.component.html',
  styleUrls: ['./user-panel-admin.component.css']
})
export class UserPanelAdminComponent implements OnInit {
  tabIndex: number;
  constructor(private location: Location) {}

  ngOnInit() {}
  back() {
    this.location.back();
  }
}

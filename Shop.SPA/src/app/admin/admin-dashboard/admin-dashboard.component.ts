import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  counters: any;
  totalRevenue = 0;
  rawProducts = [];

  constructor(private adminService: AdminService) {}
  ngOnInit() {
    this.adminService.getCounters().subscribe(x => {
      this.counters = x;
      this.totalRevenue = x['totalRevenue'];
    });
  }
}

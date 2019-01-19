import { Component, OnInit } from '@angular/core';
import { UIService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  constructor(private uiService: UIService) {}

  ngOnInit() {}

  toggleSideNav() {
    this.uiService.toggleAdminSideNav.next(true);
  }
  closeSidenav() {
    this.uiService.closeAdminSidenav.next(true);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { UIService } from 'src/app/_services/ui.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  @ViewChild('sideNav') sideNav: MatSidenav;

  constructor(private uiService: UIService) {}

  ngOnInit() {
    this.uiService.toggleAdminSideNav.subscribe(x => {
      this.sideNav.toggle();
    });

    this.uiService.closeAdminSidenav.subscribe(x => {
      this.sideNav.close();
    });
  }
}

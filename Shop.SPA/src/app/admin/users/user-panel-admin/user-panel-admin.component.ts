import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserForDetailAdmin } from 'src/app/_models/User';

@Component({
  selector: 'app-user-panel-admin',
  templateUrl: './user-panel-admin.component.html',
  styleUrls: ['./user-panel-admin.component.css']
})
export class UserPanelAdminComponent implements OnInit {
  @Output() user: UserForDetailAdmin;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(x => {
      this.user = x['user'];
    });
  }

}

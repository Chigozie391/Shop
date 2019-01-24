import { Component, OnInit, Input } from '@angular/core';
import { UserForDetailAdmin } from 'src/app/_models/User';
import { AdminService } from 'src/app/_services/admin.service';
import { UIService } from 'src/app/_services/ui.service';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  @Input() user: UserForDetailAdmin;
  roles = [];
  isAdmin: boolean;

  constructor(
    private adminService: AdminService,
    private uiService: UIService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user.roles.forEach(element => {
      this.roles.push(element.name);
    });
    this.isAdmin = this.authService.roleMatch(['Admin']);
  }

  updateRole() {
    const rolesObj = { roleNames: this.roles };
    this.adminService.updateRole(this.user.email, rolesObj).subscribe(
      (x: string[]) => {
        let roleArr = [];
        x.forEach(item => {
          const role = { name: item };
          roleArr.push(role);
        });
        this.user.roles = roleArr;
        this.uiService.success('Updated Successfully');
      },
      () => {
        this.uiService.error('Unauthorized');
      }
    );
  }

  updateAddress() {
    this.userService.setAddress(this.user.id, this.user).subscribe(
      user => {
        this.user = user;
        this.uiService.success('Updated Successfully');
      },
      () => {
        this.uiService.error('Unauthorized');
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';
import { UIService } from 'src/app/_services/ui.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  currentUser: User;
  editUser: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private uiService: UIService,
    private location: Location
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.editUser = { ...this.currentUser };
  }
  back() {
    this.location.back();
  }

  submit() {
    this.userService.updateUserInfo(this.currentUser.id, this.editUser).subscribe(
      x => {
		  this.currentUser = x;
			 this.authService.currentUser = x;
        localStorage.setItem('user', JSON.stringify(x));
        this.uiService.success('Successfully updated');
      },
      error => {
        this.uiService.error('Unable to update');
      }
    );
  }
}

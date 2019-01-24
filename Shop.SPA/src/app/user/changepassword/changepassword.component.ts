import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/User';
import { UIService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  confirmPasswordInput: string;
  userPassword = {
    oldPassword: '',
    newPassword: ''
  };
  currentUser: User;

  hide: boolean = true;

  constructor(
    private location: Location,
    private uiService: UIService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  changePassword() {
    this.userService.changePassword(this.currentUser.id, this.userPassword).subscribe(
      x => {
        this.uiService.success('Changed successfully');
        this.location.back();
      },
      error => {
        this.uiService.error(error.error);
      }
    );
  }

  back() {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/gloabal/auth.service';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private alertify: AlertifyService) {}
  user: User = {};

  ngOnInit() {}

  login(loginForm: NgForm) {
    this.user.email = loginForm.value.email;
    this.user.password = loginForm.value.password;

    this.authService.login(this.user).subscribe(
      () => {
        this.alertify.success('Login Succesful');
      },
      error => this.alertify.error(error.error),
      () => {
        this.user = {};
      }
    );
  }

  register() {
    console.log(this.user);
  }
}

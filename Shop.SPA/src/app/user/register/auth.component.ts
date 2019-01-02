import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/gloabal/auth.service';
import { User } from 'src/app/_models/User';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {};
  hide: boolean = true;
  confirmPassword: any;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {}

  //   passwordMatchValidator() {
  //      return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  //   }

  register() {
    this.user.userName = this.user.email;
    this.authService.register(this.user).subscribe(
      () => {
        this.alertify.success('Registration Successful');
      },
      error => {
        console.log(error.error);
      },
      () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    );
  }
}

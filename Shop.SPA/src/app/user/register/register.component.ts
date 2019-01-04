import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/_models/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/global/auth.service';
import { UIService } from 'src/app/_services/global/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {};
  hide: boolean = true;
  confirmPassword: any;
  @ViewChild('registerForm') registerForm: NgForm;

  constructor(private authService: AuthService, private uiService: UIService, private router: Router) {}

  ngOnInit() {}

  //   passwordMatchValidator() {
  //      return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  //   }

  register() {
    this.user.userName = this.user.email;
    this.authService.register(this.user).subscribe(
      () => {
        this.uiService.success('Registration Successful');
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

import { Component, OnInit, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/User';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/_services/global/auth.service';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { UIService } from 'src/app/_services/global/ui.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  user: User = {};
  hide: boolean = true;
  rememberMe = true;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private authService: AuthService,
    private router: Router,
    private uiService: UIService
  ) {}

  ngOnInit() {}

  public openDialog() {
    this.dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '450px'
    });
  }
  login() {
    this.authService.login(this.user).subscribe(
      () => {
        this.uiService.success('Login Successful');
      },
      error => {
        this.uiService.error('Email or password is incorrect');
      },
      () => {
        if (this.router.url == '/register') {
          this.router.navigate(['/']);
        }

        this.dialogRef.close();
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
    this.dialogRef.close();
  }
}

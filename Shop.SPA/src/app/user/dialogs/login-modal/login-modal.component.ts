import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/_services/global/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  user: User = {};
  hide: boolean = true;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  public openDialog() {
    this.dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px'
    });
  }
  login() {
    this.authService.login(this.user).subscribe(() => {}, null, () => {
      this.dialogRef.close();
    });
  }

  register() {
    this.router.navigate(['/register']);
    this.dialogRef.close();
  }
}

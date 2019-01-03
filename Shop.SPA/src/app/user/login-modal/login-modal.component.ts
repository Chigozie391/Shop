import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/User';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/_services/global/auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit() {}

  public openDialog() {
    this.dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px'
    });
  }
  login() {
    this.authService.login(this.user).subscribe(x => {}, null, () => {
      this.dialogRef.close();
    });
  }
}

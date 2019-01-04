import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/global/auth.service';

@Component({
  selector: 'app-shipping-address-dialog',
  templateUrl: './shipping-address-dialog.component.html',
  styleUrls: ['./shipping-address-dialog.component.css']
})
export class ShippingAddressDialogComponent implements OnInit {
  currentUser: User = {};
  defaultShipping: boolean = true;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ShippingAddressDialogComponent>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }

  public openDialog() {
    this.dialogRef = this.dialog.open(ShippingAddressDialogComponent, {
      width: '500px',
      panelClass: ['checkout-container']
    });
  }

  proceed() {
    console.log(this.currentUser);
  }
}

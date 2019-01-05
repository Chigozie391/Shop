import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/global/auth.service';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/_services/global/user.service';
import { UIService } from 'src/app/_services/global/ui.service';

@Component({
  selector: 'app-shipping-address-dialog',
  templateUrl: './shipping-address-dialog.component.html',
  styleUrls: ['./shipping-address-dialog.component.css']
})
export class ShippingAddressDialogComponent implements OnInit {
  currentUser: User = {};
  userWithDefaultAddress: User = {};
  setAsDefaultAddress: boolean = true;
  phoneNumber2: number;
  cartToken = environment.cartToken;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ShippingAddressDialogComponent>,
    private authService: AuthService,
    private userService: UserService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser.hasDefaultAddress) {
      this.userWithDefaultAddress = this.currentUser;
      this.setAsDefaultAddress = false;
    }
  }

  public openDialog() {
    this.dialogRef = this.dialog.open(ShippingAddressDialogComponent, {
      width: '500px',
      panelClass: ['checkout-container']
    });
  }

  proceed() {
    if (this.setAsDefaultAddress) {
      this.userWithDefaultAddress.hasDefaultAddress = true;
      this.userService.setDefaultAddress(this.currentUser.id, this.userWithDefaultAddress).subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.uiService.success('Sucessfully set as default shipping address');
      });
    }
    //load paystack
  }
}

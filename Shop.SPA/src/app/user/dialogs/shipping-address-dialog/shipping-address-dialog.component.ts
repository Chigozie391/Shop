import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { User } from 'src/app/_models/User';
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
  userAddress: User = {};
  setAsDefaultAddress: boolean = true;
  phoneNumber2: string = '';
  cartToken = environment.cartToken;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ShippingAddressDialogComponent>,
    private userService: UserService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    if (this.currentUser.hasDefaultAddress) {
      this.userAddress = this.currentUser;
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
      // if he checks this address as the default address
      this.userAddress.hasDefaultAddress = true;
      this.userService.setDefaultAddress(this.currentUser.id, this.userAddress).subscribe(
        user => {
          localStorage.setItem('user', JSON.stringify(user));
          this.uiService.success('Sucessfully set as default shipping address');
        },
        error => {
          return this.uiService.error('Network error');
        }
      );
    }
    if (this.phoneNumber2) {
      this.userAddress.phoneNumber2 = this.phoneNumber2;
    }

    this.uiService.openPaystack.next(this.userAddress);
    this.dialogRef.close();
  }
}

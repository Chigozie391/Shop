import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Modal } from 'src/app/_models/modal';
import { LoginDialogComponent } from 'src/app/user/dialogs/login-dialog/login-dialog.component';
import { ShippingAddressDialogComponent } from 'src/app/user/dialogs/shipping-address-dialog/shipping-address-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private modalMessage = new BehaviorSubject<Modal>({});
  modalMessageObserver = this.modalMessage.asObservable();

  constructor(private loginDialog: LoginDialogComponent, private shippingAddress: ShippingAddressDialogComponent) {}

  openLoginModel() {
    this.loginDialog.openDialog();
  }

  openShippingAddressModel() {
    this.shippingAddress.openDialog();
  }

  setModalMessage(body: Modal) {
    body = {
      title: body.title,
      message: body.message,
      trueValue: body.trueValue,
      falseValue: body.falseValue
    };
    this.modalMessage.next(body);
  }
}

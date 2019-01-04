import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Modal } from 'src/app/_models/modal';
import { environment } from 'src/environments/environment';
import { ShippingAddressDialogComponent } from 'src/app/user/dialogs/shipping-address-dialog/shipping-address-dialog.component';
import { LoginDialogComponent } from 'src/app/user/dialogs/login-dialog/login-dialog.component';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class UIService {
  cartToken = environment.cartToken;

  private itemsInCart = new BehaviorSubject<number>(0);
  totalItemInCart = this.itemsInCart.asObservable();

  private modalMessage = new BehaviorSubject<Modal>({});
  modalMessageObserver = this.modalMessage.asObservable();

  constructor(private loginDialog: LoginDialogComponent, private shippingAddress: ShippingAddressDialogComponent) {
    this.updateTotalItemInCart();
  }

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

  updateTotalItemInCart() {
    let totalItems = 0;
    let x = JSON.parse(localStorage.getItem(this.cartToken)) as Array<{}>;
    if (x == null) return this.itemsInCart.next(totalItems);

    x.forEach(value => {
      totalItems = totalItems + value['quantity'];
    });
    this.itemsInCart.next(totalItems);
  }

  confirm(message: string, okCallbaack: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallbaack();
      } else {
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }
  error(message: string) {
    alertify.error(message);
  }
  warning(message: string) {
    alertify.warning(message);
  }
  message(message: string) {
    alertify.message(message);
  }
}

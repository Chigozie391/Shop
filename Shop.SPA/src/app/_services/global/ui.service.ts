import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class UIService {
  cartToken = environment.cartToken;

  private itemsInCart = new BehaviorSubject<number>(0);
  totalItemInCart = this.itemsInCart.asObservable();
  openPaystack = new Subject();

  constructor() {
    this.updateTotalItemInCart();
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
    alertify.defaults.glossary.title = 'Confirmations';
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

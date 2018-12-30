import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Modal } from 'src/app/_models/modal';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  private modalMessage = new BehaviorSubject<Modal>({});
  modalMessageObserver = this.modalMessage.asObservable();
  constructor() {}

  confirm(message: string, okCallbaack: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallbaack();
      } else {
      }
    });
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

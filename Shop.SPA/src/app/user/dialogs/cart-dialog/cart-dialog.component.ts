import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Modal } from 'src/app/_models/modal';
import { DialogService } from 'src/app/_services/dialog.service';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.css']
})
export class CartDialogComponent implements OnInit {
  modalBody: Modal = {};
  constructor(private dialog: MatDialog, private dialogService: DialogService) {}

  ngOnInit() {
    this.dialogService.modalMessageObserver.subscribe(body => {
      this.modalBody.title = body.title;
      this.modalBody.message = body.message;
      this.modalBody.trueValue = body.trueValue;
      this.modalBody.falseValue = body.falseValue;
    });
  }
  public openDialog(body: Modal, okCallback: () => any, noCallback?: () => any) {
    this.dialogService.setModalMessage(body);
    const dialogRef = this.dialog.open(CartDialogComponent, {
      height: '200px',
      width: '600px',
      panelClass: ['dialog-container', 'ng-inserted', 'dialog-cont']
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        okCallback();
      } else if (typeof noCallback === 'function') {
        noCallback();
      }
    });
  }
}

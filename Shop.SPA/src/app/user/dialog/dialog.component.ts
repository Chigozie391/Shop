import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';
import { Modal } from 'src/app/_models/modal';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  modalBody: Modal = {};
  constructor(private dialog: MatDialog, private alertify: AlertifyService) {}

  ngOnInit() {
    this.alertify.modalMessageObserver.subscribe(body => {
      this.modalBody.title = body.title;
      this.modalBody.message = body.message;
      this.modalBody.trueValue = body.trueValue;
      this.modalBody.falseValue = body.falseValue;
    });
  }
  public openDialog(body: Modal, okCallback: () => any, noCallback?: () => any) {
    this.alertify.setModalMessage(body);
    const dialogRef = this.dialog.open(DialogComponent, {
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

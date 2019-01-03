import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Modal } from 'src/app/_models/modal';
import { UIService } from 'src/app/_services/global/alertify.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  modalBody: Modal = {};
  constructor(private dialog: MatDialog, private uiService: UIService) {}

  ngOnInit() {
    this.uiService.modalMessageObserver.subscribe(body => {
      this.modalBody.title = body.title;
      this.modalBody.message = body.message;
      this.modalBody.trueValue = body.trueValue;
      this.modalBody.falseValue = body.falseValue;
    });
  }
  public openDialog(body: Modal, okCallback: () => any, noCallback?: () => any) {
    this.uiService.setModalMessage(body);
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Products } from 'src/app/_models/Products';
import { ProductService } from 'src/app/_services/admin/product.service';
import * as _ from 'underscore';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.css']
})
export class ProductPhotosComponent implements OnInit {
  @Input() photos: any[] = [];
  @Input() productId: number;
  isMain: boolean;

  constructor(private productService: ProductService, private alertify: AlertifyService) {}

  ngOnInit() {}

  setMainPhoto(productId: number, photo) {
    this.productService.setMainPhoto(productId, photo.id).subscribe(
      x => {
        const currentMain = _.findWhere(this.photos, { isMain: true });
        currentMain.isMain = false;
        photo.isMain = true;

        this.alertify.success('Main Photo set successfully');
      },
      error => this.alertify.error(error.error)
    );
  }

  deletePhoto(productId: number, photo) {
    this.productService.deletePhoto(productId, photo.id).subscribe(
      x => {
        this.photos.splice(this.photos.indexOf(x), 1);
        this.alertify.success('Deleted Successfully');
      },
      error => this.alertify.error(error.error)
    );
  }
}

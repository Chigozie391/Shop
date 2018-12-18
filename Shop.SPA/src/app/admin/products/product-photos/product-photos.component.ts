import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/_services/admin/product.service';
import * as _ from 'underscore';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.css']
})
export class ProductPhotosComponent implements OnInit {
  @Input() photos: any[] = [];
  @Input() productId: number;
  @Output() updatePhotoUrl = new EventEmitter<string>();
  uploader: FileUploader;
  baseUrl = environment.apiUrl;

  constructor(private productService: ProductService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.intializeUploader();
  }

  intializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'products/' + this.productId + '/photos',
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onErrorItem = () => {
      this.alertify.error('Photo upload failed');
    };

    this.uploader.onSuccessItem = (item, response) => {
      if (response) {
        const res = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          isMain: res.isMain
        };
        // push to photo array
        this.photos.push(photo);
      }
    };
    //  this.uploader.onProgressItem = (progress: any) => this.detector.detectChanges();

    //  this.uploader.onProgressItem = (fileItem: FileItem, progress: any) => {
    //    console.log(fileItem);
    //    console.log(progress);
    //  };
  }

  setMainPhoto(productId: number, photo) {
    this.productService.setMainPhoto(productId, photo.id).subscribe(
      () => {
        const currentMain = _.findWhere(this.photos, { isMain: true });
        currentMain.isMain = false;
        photo.isMain = true;
        this.updatePhotoUrl.emit(photo.url);
        this.alertify.success('Main Photo set successfully');
      },
      error => this.alertify.error(error.error)
    );
  }

  deletePhoto(productId: number, photo) {
    this.alertify.confirm('Are you sure you want to delete the photo', () => {
      this.productService.deletePhoto(productId, photo.id).subscribe(
        x => {
          this.photos.splice(this.photos.findIndex(c => c.id == x), 1);

          this.alertify.success('Deleted Successfully');
        },
        error => this.alertify.error(error.error)
      );
    });
  }
}

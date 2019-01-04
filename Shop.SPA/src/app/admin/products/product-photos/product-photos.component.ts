import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/_services/admin/product.service';
import * as _ from 'underscore';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { UIService } from 'src/app/_services/global/ui.service';

@Component({
  selector: 'app-product-photos',
  templateUrl: './product-photos.component.html',
  styleUrls: ['./product-photos.component.css']
})
export class ProductPhotosComponent implements OnInit {
  @Input() photos: any[] = [];
  @Input() productId: number;
  @Input() isDeleted: number;
  @Output() updatePhotoUrl = new EventEmitter<string>();
  uploader: FileUploader;
  baseUrl = environment.apiUrl;

  constructor(private productService: ProductService, private uiService: UIService) {}

  ngOnInit() {
    this.intializeUploader();
  }

  intializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'products/' + this.productId + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onErrorItem = () => {
      this.uiService.error('Photo upload failed');
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
        this.uiService.success('Main Photo set successfully');
      },
      error => this.uiService.error(error.error)
    );
  }

  deletePhoto(productId: number, photo) {
    this.uiService.confirm('Are you sure you want to delete the photo', () => {
      this.productService.deletePhoto(productId, photo.id).subscribe(
        x => {
          this.photos.splice(this.photos.findIndex(c => c.id == x), 1);

          this.uiService.success('Deleted Successfully');
        },
        error => this.uiService.error(error.error)
      );
    });
  }
}

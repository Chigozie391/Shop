import { Component, OnInit, ViewChild } from '@angular/core';
import { Products } from 'src/app/_models/Products';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { isUndefined } from 'util';
import * as _ from 'underscore';
import { Modal } from 'src/app/_models/modal';
import { UIService } from 'src/app/_services/ui.service';
import { CartDialogComponent } from '../dialogs/cart-dialog/cart-dialog.component';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  product: Products;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  sizeArray = [];
  quantity = null;
  maxQuantity: number;
  selectedSize: string;
  selectedSizeObj = null;
  cartToken = environment.cartToken;
  cartItems = [];
  oldCartItems = [];
  outOfStock: boolean;
  modalBody: Modal = {};

  constructor(
    private route: ActivatedRoute,
    private uiService: UIService,
    private dialogComp: CartDialogComponent,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data['product'];
    });

    this.slider();
    const rawSizes = JSON.parse(this.product.sizes);
    this.sizeArray = rawSizes.filter(x => x.quantity > 0);
    // sets the product as out of stock and disable size selection
    if (this.sizeArray.length == 0) this.outOfStock = true;
  }

  onSelectChange() {
    this.selectedSizeObj = this.sizeArray.find(x => x.size.toLowerCase() == this.selectedSize.toLowerCase());
    this.maxQuantity = this.selectedSizeObj.quantity;
    //reset the quantity
    this.form.form.get('quantity').reset();
  }

  addToCart() {
    if (this.selectedSizeObj && this.quantity != null) {
      if (this.quantity > this.maxQuantity) {
        return this.uiService.error('Quantity too large');
      }
    } else {
      return this.uiService.error('Select a size and quantity');
    }
    // add to cart
    const newCartItem = {
      productId: this.product.id,
      size: this.selectedSize,
      quantity: this.quantity
    };

    const oldItemFromStorage = localStorage.getItem(this.cartToken);
    // checks if cart items exits in the local storage
    if (oldItemFromStorage) {
      this.oldCartItems = JSON.parse(oldItemFromStorage);
      const productMatch = _.findWhere(this.oldCartItems, {
        size: this.selectedSize,
        productId: this.product.id
      });

      // checks if product is not already in the cart
      if (isUndefined(productMatch)) {
        this.oldCartItems.push(newCartItem);
        localStorage.setItem(this.cartToken, JSON.stringify(this.oldCartItems));
        this.uiService.updateTotalItemInCart();
        this.navigattionModal();
      } else {
        this.modalBody.title = 'Info.';
        this.modalBody.message = this.product.title + ' Item is already in Cart, Update the Quantity ?';
        this.modalBody.trueValue = 'Update Quantity';
        this.modalBody.falseValue = 'Cancel';

        this.dialogComp.openDialog(this.modalBody, () => {
          productMatch.quantity = productMatch.quantity + this.quantity;

          if (productMatch.quantity > this.maxQuantity) {
            return this.uiService.error('Quantity too large');
          }

          // get the index of the item
          const index = _.findIndex(this.oldCartItems, productMatch);

          // product already exist, increase product quantity
          this.oldCartItems.splice(index, 1, productMatch);
          localStorage.setItem(this.cartToken, JSON.stringify(this.oldCartItems));
          this.uiService.updateTotalItemInCart();
          this.navigattionModal();
        });
      }
    } else {
      // new cart
      this.cartItems.push(newCartItem);
      localStorage.setItem(this.cartToken, JSON.stringify(this.cartItems));
      this.uiService.updateTotalItemInCart();
      this.navigattionModal();
    }
  }

  navigattionModal() {
    this.modalBody.title = 'Success';
    this.modalBody.message = this.product.title + ' has been added to Cart';
    this.modalBody.trueValue = 'Go to Cart';
    this.modalBody.falseValue = 'Continue Shopping';

    this.dialogComp.openDialog(
      this.modalBody,
      () => {
        this.router.navigate(['/cart']);
      },
      () => {
        console.log('Closing Modal');
      }
    );
  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.product.photos.length; i++) {
      imageUrls.push({
        small: this.product.photos[i].url,
        medium: this.product.photos[i].url,
        big: this.product.photos[i].url
      });
    }
    return imageUrls;
  }

  slider() {
    this.galleryOptions = [
      {
        width: '500px',
        height: '400px',
        imageSwipe: true,
        thumbnailsColumns: 4,
        imageAutoPlay: true,
        imageAutoPlayInterval: 5000,
        imageAutoPlayPauseOnHover: true,
        imageInfinityMove: true,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '500px',
        imagePercent: 80,
        imageSwipe: true,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();
  }
}

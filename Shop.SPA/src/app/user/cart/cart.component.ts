import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/_services/admin/product.service';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { UIService } from 'src/app/_services/global/ui.service';
import { AuthService } from 'src/app/_services/global/auth.service';
import { DialogService } from 'src/app/_services/global/dialog.service';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/global/user.service';
import { Order } from 'src/app/_models/Order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  paystackSubscription: Subscription;

  cartToken = environment.cartToken;
  products = [];
  totalPrice = 0;
  storedItem: any[] = JSON.parse(localStorage.getItem(this.cartToken));
  userAddress: User;
  currentUser = this.authService.currentUser;
  reference = Math.floor(Math.random() * 1000000000 + 1);
  order: Order = {};

  constructor(
    private productService: ProductService,
    private uiService: UIService,
    private router: Router,
    private authService: AuthService,
    private dialogService: DialogService,
    private userService: UserService
  ) {
    if (this.storedItem) {
      let counter = 0;
      const arrlength = this.storedItem.length;
      this.storedItem.forEach(element => {
        this.productService.getProductForCart(element['productId']).subscribe(product => {
          const sizeArr = JSON.parse(product.sizes);
          const selectedSize: any = _.findWhere(sizeArr, { size: element['size'] });

          let item = {
            photoUrl: product.photoUrl,
            price: product.price,
            title: product.title,
            productId: element['productId'],
            size: element['size'],
            quantity: element['quantity'],
            maxQuantity: selectedSize.quantity
          };
          this.products.push(item);
          this.totalPrice += +element['quantity'] * product.price;

          counter++;
          if (counter == arrlength) {
            // run this after the whole iteration
            // updates the stored item
            localStorage.setItem(this.cartToken, JSON.stringify(this.products));
          }
        });
      });
    }
  }

  ngOnInit() {
    this.reference = Math.floor(Math.random() * 1000000000 + 1);
    this.paystackSubscription = this.uiService.openPaystack.subscribe(address => {
      // sets the address
      this.userAddress = address;

      //trigger click for paystack
      document.getElementById('paystackbtn').click();

      // set order
      this.order.items = JSON.stringify(this.products);
      this.order.address = this.userAddress.address;
      this.order.city = this.userAddress.city;
      this.order.state = this.userAddress.state;
      this.order.phoneNumber = this.userAddress.phoneNumber;
      this.order.totalPrice = this.totalPrice;
      if (this.userAddress.phoneNumber2) {
        this.order.phoneNumber2 = this.userAddress.phoneNumber2;
      }
    });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    localStorage.setItem(this.cartToken, JSON.stringify(this.products));
    this.products.forEach(x => {
      this.totalPrice += x.quantity * x.price;
    });
    this.uiService.updateTotalItemInCart();
  }

  addQuanitity(productId: number, size: string) {
    const x = { productId: productId, size: size };
    const item: any = _.findWhere(this.products, x);
    if (item.quantity >= item.maxQuantity) {
      return this.uiService.error('Maximium quantity reached');
    }
    //increase the quantity
    item.quantity = item.quantity + 1;
    //modify the product display for user
    this.products.splice(_.findIndex(this.products, x), 1, item);

    this.getTotalPrice();
  }

  removeQuantity(productId: number, size: string) {
    const x = { productId: productId, size: size };
    const item: any = _.findWhere(this.products, x);
    if (item.quantity <= 1) {
      return this.uiService.error('Minimium quantity reached');
    }
    //increase the quantity
    item.quantity = item.quantity - 1;
    //modify the product display for user
    this.products.splice(_.findIndex(this.products, x), 1, item);

    this.getTotalPrice();
  }

  remove(productId: number, size: string) {
    const x = { productId: productId, size: size };
    this.products.splice(_.findIndex(this.products, x), 1);

    this.getTotalPrice();
  }

  viewProduct(productId: number) {
    this.router.navigate(['detail', productId]);
  }

  startShopping() {
    this.router.navigate(['/']);
  }

  checkout() {
    if (!this.authService.loggedIn()) {
      this.dialogService.openLoginModel();
    } else {
      this.dialogService.openShippingAddressModel();
    }
  }

  paymentCancelled() {
    console.log('Cancelled');
  }

  paymentDone($event) {
    let updateSizeObj = [];
    let itemToOrder: any[] = JSON.parse(localStorage.getItem(this.cartToken));
    const arrlength = itemToOrder.length;
    let counter = 0;

    itemToOrder.forEach(element => {
      this.productService.getProductForCart(element['productId']).subscribe(product => {
        const sizeArr = JSON.parse(product.sizes);
        let selectedSize: any = _.findWhere(sizeArr, { size: element['size'] });
        //substract from old quantity
        selectedSize.quantity = selectedSize.quantity - element.quantity;

        //add remove the old item and add the new one
        sizeArr.splice(_.findIndex(sizeArr, { size: element['size'] }), 1, selectedSize);

        let x = { id: product.id, size: JSON.stringify(sizeArr) };
        updateSizeObj.push(x);
        counter++;

        if (counter == arrlength) {
          // run this after the whole iteration
          this.updateProductSizeAfterOrder(updateSizeObj);
        }
      });
    });

    this.order.reference = $event.reference;
    this.userService.createOrder(this.currentUser.id, this.order).subscribe();
  }

  updateProductSizeAfterOrder(updateSizeObj: any[]) {
    const arrlength = updateSizeObj.length;
    let counter = 0;

    updateSizeObj.forEach((element, index) => {
      this.userService.updateProductSizeAfterOrder(element['id'], { sizes: element['size'] }).subscribe(x => {
        counter++;

        if (counter == arrlength) {
          // run this after the whole iteration
          this.router.navigate(['/thankyou', this.currentUser.id, this.order.reference]);
        }
      });
    });

    localStorage.removeItem(this.cartToken);
    this.uiService.updateTotalItemInCart();
  }

  ngOnDestroy() {
    this.paystackSubscription.unsubscribe();
  }
}

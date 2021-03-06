import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { UIService } from 'src/app/_services/ui.service';
import { AuthService } from 'src/app/_services/auth.service';
import { DialogService } from 'src/app/_services/dialog.service';
import { User } from 'src/app/_models/User';
import { UserService } from 'src/app/_services/user.service';
import { Order } from 'src/app/_models/Order';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  paystackSubscription: Subscription;
  isLoading = false;
  isCartEmpty = false;
  paymentStart: boolean;
  warn = false;

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
    private userService: UserService,
    private orderService: OrderService
  ) {
    if (this.storedItem && this.storedItem.length > 0) {
      this.isCartEmpty = false;
      this.isLoading = true;
      let counter = 0;
      const arrlength = this.storedItem.length;
      this.storedItem.forEach((element, index) => {
        this.productService.getProductForCart(element['productId']).subscribe(
          product => {
            counter++;
            const sizeArr = JSON.parse(product.sizes);
            const selectedSize: any = _.findWhere(sizeArr, { size: element['size'] });

            if (element['quantity'] > selectedSize.quantity) {
              // remove the item
              this.removedItem(this.storedItem, {
                productId: element['productId'],
                size: element['size']
              });

              // all the items have been removed
              if (counter == arrlength && this.products.length == 0) {
                this.isCartEmpty = true;
              }

              return;
            }

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

            if (counter == arrlength) {
              // updates the stored item
              localStorage.setItem(this.cartToken, JSON.stringify(this.products));
            }
          },
          error => {
            if (error.status == 404) {
              //remove the item
              this.removedItem(this.storedItem, {
                productId: element['productId'],
                size: element['size']
              });
            }
          },
          () => {
            this.isLoading = false;
          }
        );
      });
    } else {
      // if items have been removedfrom the cart and its now empty
      this.isCartEmpty = true;
    }
  }

  ngOnInit() {
    this.reference = Math.floor(Math.random() * 1000000000 + 1);
    this.paystackSubscription = this.uiService.openPaystack.subscribe(address => {
      //looading icon
      this.paymentStart = true;
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

  public getTotalPrice() {
    this.totalPrice = 0;
    localStorage.setItem(this.cartToken, JSON.stringify(this.products));
    this.products.forEach(x => {
      this.totalPrice += x.quantity * x.price;
    });
    this.uiService.updateTotalItemInCart();
  }

  public addQuanitity(productId: number, size: string) {
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

  public removeQuantity(productId: number, size: string) {
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

  public remove(productId: number, size: string) {
    const x = { productId: productId, size: size };
    this.products.splice(_.findIndex(this.products, x), 1);
    this.getTotalPrice();
    if (this.products.length == 0) {
      this.isCartEmpty = true;
    }
  }

  public viewProduct(productId: number) {
    this.router.navigate(['detail', productId]);
  }

  public startShopping() {
    this.router.navigate(['/']);
  }

  public checkout() {
    if (!this.authService.loggedIn()) {
      this.dialogService.openLoginModel();
    } else {
      this.dialogService.openShippingAddressModel();
    }
  }

  public paymentCancelled() {
    this.paymentStart = false;
    console.log('Cancelled');
  }

  public async paymentDone($event) {
    let itemToOrder: any[] = JSON.parse(localStorage.getItem(this.cartToken));

    for (let i = 0; i < itemToOrder.length; i++) {
      let product = await this.productService.getProductForCart(itemToOrder[i]['productId']).toPromise();

      let sizeArr = JSON.parse(product.sizes);
      let selectedSize: any = _.findWhere(sizeArr, { size: itemToOrder[i]['size'] });
      //substract from old quantity
      selectedSize.quantity = selectedSize.quantity - itemToOrder[i].quantity;

      //remove and add old item and new one respectively
      sizeArr.splice(_.findIndex(sizeArr, { size: itemToOrder[i]['size'] }), 1, selectedSize);

      await this.userService.updateSizeOnOrder(product.id, { sizes: JSON.stringify(sizeArr) }).toPromise();
    }

    // create order and send notification
    this.order.reference = this.reference;
    this.updateSoldProduct(this.order.items);
    let orderId = await this.userService.createOrder(this.currentUser.id, this.order).toPromise();
    this.orderService.sendNotification(orderId).toPromise();

    this.navigateToThankyou();
  }

  // update sold count
  public async updateSoldProduct(items: any) {
    let itemArr: any[] = JSON.parse(items);
    for (let i = 0; i < itemArr.length; i++) {
      await this.productService.updateSoldCount(itemArr[i].productId, itemArr[i].quantity).toPromise();
    }
  }

  navigateToThankyou() {
    localStorage.removeItem(this.cartToken);
    this.uiService.updateTotalItemInCart();
    this.router.navigate(['/thankyou', this.currentUser.id, this.order.reference]);
  }

  public closeWarn() {
    document.getElementById('closeWarn').remove();
  }

  public removedItem(storedItem: any[], item: {}) {
    this.warn = true;

    storedItem.splice(_.findIndex(storedItem, item), 1);
    localStorage.setItem(this.cartToken, JSON.stringify(storedItem));
    this.uiService.updateTotalItemInCart();
  }

  ngOnDestroy() {
    this.paymentStart = false;
    this.reference = null;
    this.order = null;
    this.paystackSubscription.unsubscribe();
  }
}

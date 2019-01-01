import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/admin/product.service';
import { environment } from 'src/environments/environment';
import * as _ from 'underscore';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartToken = environment.cartToken;
  products = [];
  totalPrice = 0;
  storedItem: any[] = JSON.parse(localStorage.getItem(this.cartToken));

  constructor(private productService: ProductService, private alertify: AlertifyService, private router: Router) {}

  ngOnInit() {
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
      });
    });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    localStorage.setItem(this.cartToken, JSON.stringify(this.storedItem));
    this.products.forEach(x => {
      this.totalPrice += x.quantity * x.price;
    });
    this.alertify.updateTotalItemInCart();
  }

  addQuanitity(productId: number, size: string) {
    const x = { productId: productId, size: size };
    const item: any = _.findWhere(this.products, x);
    if (item.quantity >= item.maxQuantity) {
      return this.alertify.error('Maximium quantity reached');
    }
    //increase the quantity
    item.quantity = item.quantity + 1;
    //modify the product display for user
    this.products.splice(_.findIndex(this.products, x), 1, item);
    // modify the store item for locastorage
    this.storedItem.splice(_.findIndex(this.storedItem, x), 1, item);
    this.getTotalPrice();
  }

  removeQuantity(productId: number, size: string) {
    const x = { productId: productId, size: size };
    const item: any = _.findWhere(this.products, x);
    if (item.quantity <= 1) {
      return this.alertify.error('Minimium quantity reached');
    }
    //increase the quantity
    item.quantity = item.quantity - 1;
    //modify the product display for user
    this.products.splice(_.findIndex(this.products, x), 1, item);
    // modify the store item for locastorage
    this.storedItem.splice(_.findIndex(this.storedItem, x), 1, item);
    this.getTotalPrice();
  }

  remove(productId: number, size: string) {
    const x = { productId: productId, size: size };
    this.products.splice(_.findIndex(this.products, x), 1);

    this.storedItem.splice(_.findIndex(this.storedItem, x), 1);
    this.getTotalPrice();
  }
  viewProduct(productId: number) {
    this.router.navigate(['view', productId]);
  }
}

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { NgForm } from '@angular/forms';
import { Products } from 'src/app/_models/Products';
import { ProductService } from 'src/app/_services/product.service';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { UIService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  constructor(
    private cateService: CategoryService,
    private productService: ProductService,
    private route: Router,
    private uiService: UIService
  ) {}
  parentCategory = [];
  childCategory = [];
  newProductid: number;

  parentId: any;

  ngOnInit() {
    this.cateService.getCategoryWithChildren().subscribe((x: []) => {
      this.parentCategory = x;
    });
  }

  parentSelectionChange() {
    this.childCategory = this.parentCategory.find(x => x.id == this.parentId).childCategories;
  }
  addProduct(form: NgForm) {
    const sizes = [
      {
        size: form.value.size0,
        quantity: form.value.quantity0,
        threshold: form.value.threshold0
      },
      {
        size: form.value.size1,
        quantity: form.value.quantity1 == '' || form.value.quantity1 == null ? '0' : form.value.quantity1,
        threshold: form.value.threshold1 == '' || form.value.threshold1 == null ? '0' : form.value.threshold1
      },
      {
        size: form.value.size2,
        quantity: form.value.quantity2 == '' || form.value.quantity2 == null ? '0' : form.value.quantity2,
        threshold: form.value.threshold2 == '' || form.value.threshold2 == null ? '0' : form.value.threshold2
      }
    ];

    let trimmedSize = sizes.filter(x => x.size != null && x.size != '');

    const productObj: Products = {
      title: form.value.title,
      price: form.value.price,
      sizes: JSON.stringify(trimmedSize),
      childCategoryId: form.value.child,
      description: form.value.description
    };

    this.productService.addProduct(productObj).subscribe(
      (x: number) => {
        this.newProductid = x;
      },
      error => this.uiService.error(error.error),
      () => {
        this.uiService.success('Successfully Created');
        this.route.navigate(['/admin/products', this.newProductid]);
      }
    );
  }
  resetForm(form: NgForm) {
    form.resetForm();
  }
}

import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/_services/admin/product.service';
import { Products } from 'src/app/_models/Products';
import { AdminCategoryService } from 'src/app/_services/admin/adminCategory.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() product: Products;
  parentCategories = [];
  childCategories = [];
  selectedCategory;

  constructor(private productService: ProductService, private cateService: AdminCategoryService) {}

  ngOnInit() {
    this.cateService.getCategoryWithChildren().subscribe(
      (x: []) => {
        this.parentCategories = x;
      },
      null,
      () => {
        this.selectedCategory = '' + this.product.categoryId;
        this.parentSelectionChange();
      }
    );
  }

  parentSelectionChange() {
    console.log('Hii');

    this.childCategories = this.parentCategories.find(
      x => x.id == this.product.categoryId
    ).childCategories;
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }

  updateProduct(form: NgForm) {
    console.log(form.value);
  }
}

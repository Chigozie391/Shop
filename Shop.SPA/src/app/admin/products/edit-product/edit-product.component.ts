import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Products } from 'src/app/_models/Products';
import { CategoryService } from 'src/app/_services/category.service';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @Input() product: Products;
  productForEdit: Products;
  parentCategories = [];
  childCategories = [];
  selectedCategory: any;
  sizeArray = [];
  @Output() updatedProduct = new EventEmitter<Products>();

  constructor(
    private cateService: CategoryService,
    private productService: ProductService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.productForEdit = { ...this.product };

    this.cateService.getCategoryWithChildren().subscribe(
      (x: []) => {
        this.parentCategories = x;
      },
      null,
      () => {
        this.selectedCategory = '' + this.productForEdit.categoryId;
        this.parentSelectionChange();
      }
    );

    this.sizeArray = JSON.parse(this.productForEdit.sizes);
  }
  //		use reactive form
  //   addValidator() {
  //     this.fb.group({
  //       size0: ['', Validators.required]
  //     });
  //   }

  parentSelectionChange() {
    this.childCategories = this.parentCategories.find(x => x.id == this.productForEdit.categoryId).childCategories;
  }

  resetForm(form: NgForm) {
    form.resetForm();
  }

  updateProduct(form: NgForm) {
    const newSizeArray = [
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

    let trimmedSize = newSizeArray.filter(x => x.size != null && x.size != '');

    const productObj: Products = {
      title: this.productForEdit.title,
      price: this.productForEdit.price,
      sizes: JSON.stringify(trimmedSize),
      childCategoryId: this.productForEdit.childCategoryId,
      description: this.productForEdit.description,
      deleted: this.productForEdit.deleted,
      featured: this.productForEdit.featured
    };

    this.productService.updateProduct(this.productForEdit.id, productObj).subscribe(
      product => {
        this.updatedProduct.emit(product);
      },
      error => this.uiService.error(error.error),
      () => {
        this.uiService.success('Successfully Updated');
      }
    );
  }
}

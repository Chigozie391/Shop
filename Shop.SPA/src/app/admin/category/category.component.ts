import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/admin/category.service';
import { NgForm } from '@angular/forms';
import * as _ from 'underscore';
import { AlertifyService } from 'src/app/_services/gloabal/alertify.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  obj: { id; name } = { id: '', name: '' };
  parentId: string;
  isSelectDisable = false;
  isChildUpdate = false;
  isParentUpdate = false;
  buttonText = 'Add Child';
  placeholderForInput = 'Child Name';

  constructor(private adminCatService: CategoryService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.getCategoryWithChildren();
  }

  getCategoryWithChildren() {
    this.adminCatService.getCategoryWithChildren().subscribe((category: []) => {
      this.categories = category;
    });
  }

  add(form: NgForm) {
    const body = { name: form.value.name };
    const pId = form.value.parent;

    // update child
    if (this.isChildUpdate && +this.parentId != 0) {
      this.adminCatService.updateChildCategory(this.obj.id, body).subscribe(
        x => {
          this.getCategoryWithChildren();
          this.alertify.success('Successfully Updated');
        },
        error => this.error()
      );
    } else if (!this.isChildUpdate && +this.parentId != 0) {
      // add new child category
      this.adminCatService.addChildCategory(pId, body).subscribe(
        newChild => {
          const index = this.categories.indexOf(this.categories.find(x => x.id == pId));
          this.categories.splice(index, 1, newChild);
          this.alertify.success('Added Successfully');
        },
        error => this.error()
      );
    } else if (this.isParentUpdate && +this.parentId == 0) {
      // update parent
      this.adminCatService.updateCategory(this.obj.id, body).subscribe(
        x => {
          const index = this.categories.indexOf(this.categories.find(p => p.id == this.obj.id));
          this.categories.splice(index, 1, x);
          this.alertify.success('Successfully Updated');
        },
        error => this.error()
      );
    } else {
      // add new category
      this.adminCatService.addCategory(body).subscribe(
        x => {
          this.categories.push(x);
          this.alertify.success('Added Successfully');
        },
        error => this.error()
      );
    }

    this.resetForm(form);
  }

  populateForChild(childId: number, pId: string) {
    const parent = this.utilityForpopulate(pId, true);
    this.parentId = '' + parent.id;
    this.obj = { ...parent.childCategories.find(x => x.id == childId) };
  }

  populateForCategory(pId) {
    const parent = this.utilityForpopulate(pId, false);
    this.parentId = '0';
    this.obj = { ...parent };
  }

  deleteChildCategory(childid, pId) {
    const childCategory: any[] = this.categories.find(p => p.id == pId).childCategories;
    const child = childCategory.find(c => c.id == childid);

    this.alertify.confirm(
      'Are you sure you wantb to delete <b>' + child.name + '</b> sub category',
      () => {
        this.adminCatService.deleteChildCategory(childid).subscribe(() => {
          childCategory.splice(_.findIndex(childCategory, child), 1);
          this.alertify.success('Deleted Successfully');
        });
      }
    );
  }

  deleteCategory(pid) {
    this.alertify.confirm(
      'Deleting the main category will also delete all product associated with it',
      () => {
        this.adminCatService.deleteCategory(pid).subscribe(x => {
          this.categories.splice(_.indexOf(this.categories, x), 1);
          this.alertify.success('Deleted Succesfully');
        });
      }
    );
  }

  onSelectChange() {
    if (+this.parentId == 0) {
      this.buttonText = 'Add Category';
      this.placeholderForInput = 'Category Name';
    } else {
      this.buttonText = 'Add Child';
      this.placeholderForInput = 'Child Name';
    }
  }

  utilityForpopulate(pId, isChild) {
    let parent;
    if (isChild) {
      parent = this.categories.find(x => x.id == pId);
      this.isSelectDisable = true;
      this.placeholderForInput = 'Child Name';
      this.buttonText = 'Update Child';
      this.isChildUpdate = true;
    } else {
      parent = this.categories.find(x => x.id == pId);
      this.isSelectDisable = true;
      this.isParentUpdate = true;
      this.placeholderForInput = 'Category Name';
      this.buttonText = 'Update Name';
    }
    return parent;
  }

  error() {
    this.alertify.error('Something went wrong');
  }
  resetForm(form: NgForm) {
    this.isChildUpdate = false;
    this.isSelectDisable = false;
    this.isParentUpdate = false;
    this.parentId = '';
    form.resetForm();
  }

  // for child update
  // const parentId = this.parentId;
  // const childCategory: any[] = this.categories.find(p => p.id == parentId).childCategories;
  // const child = childCategory.find(c => c.id == this.obj.id);
  // childCategory.splice(_.findIndex(childCategory, child), 1, x);
}

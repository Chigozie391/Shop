/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProductPhotosComponent } from './product-photos.component';

describe('ProductPhotosComponent', () => {
  let component: ProductPhotosComponent;
  let fixture: ComponentFixture<ProductPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

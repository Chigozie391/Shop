/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminCategoryService } from './adminCategory.service';

describe('Service: AdminCategory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCategoryService]
    });
  });

  it('should ...', inject([AdminCategoryService], (service: AdminCategoryService) => {
    expect(service).toBeTruthy();
  }));
});

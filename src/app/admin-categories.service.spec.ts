import { TestBed, inject } from '@angular/core/testing';

import { AdminCategoriesService } from './admin-categories.service';

describe('AdminCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCategoriesService]
    });
  });

  it('should be created', inject([AdminCategoriesService], (service: AdminCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});

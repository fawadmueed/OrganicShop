import { TestBed, async, inject } from '@angular/core/testing';

import { TestAuthGuard } from './test-auth.guard';

describe('TestAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestAuthGuard]
    });
  });

  it('should ...', inject([TestAuthGuard], (guard: TestAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { Next3plPackageService } from './next3pl-package.service';

describe('Next3plPackageService', () => {
  let service: Next3plPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Next3plPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

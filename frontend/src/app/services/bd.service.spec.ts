import { TestBed } from '@angular/core/testing';

import { BDService } from './bd.service';

describe('ServicioBDService', () => {
  let service: BDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

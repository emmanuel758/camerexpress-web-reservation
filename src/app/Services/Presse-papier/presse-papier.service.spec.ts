import { TestBed } from '@angular/core/testing';

import { PressePapierService } from './presse-papier.service';

describe('PressePapierService', () => {
  let service: PressePapierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PressePapierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

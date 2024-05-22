import { TestBed } from '@angular/core/testing';

import { VoyageFilterService } from './voyage-filter.service';

describe('VoyageFilterService', () => {
  let service: VoyageFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoyageFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

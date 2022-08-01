import { TestBed } from '@angular/core/testing';

import { SeatsBookedService } from './seats-booked.service';

describe('SeatsBookedService', () => {
  let service: SeatsBookedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatsBookedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

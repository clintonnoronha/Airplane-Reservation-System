import { TestBed } from '@angular/core/testing';

import { AddPassengerService } from './add-passenger.service';

describe('AddPassengerService', () => {
  let service: AddPassengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPassengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

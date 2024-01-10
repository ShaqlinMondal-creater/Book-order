import { TestBed } from '@angular/core/testing';

import { UserregserviceService } from './userregservice.service';

describe('UserregserviceService', () => {
  let service: UserregserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserregserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

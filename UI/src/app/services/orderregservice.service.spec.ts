import { TestBed } from '@angular/core/testing';

import { OrderregserviceService } from './orderregservice.service';

describe('OrderregserviceService', () => {
  let service: OrderregserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderregserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

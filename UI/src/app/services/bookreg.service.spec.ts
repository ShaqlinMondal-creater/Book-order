import { TestBed } from '@angular/core/testing';

import { BookregService } from './bookreg.service';

describe('BookregService', () => {
  let service: BookregService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookregService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

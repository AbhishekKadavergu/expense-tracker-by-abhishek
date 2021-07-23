import { TestBed } from '@angular/core/testing';

import { RestCallsService } from './rest-calls.service';

describe('RestCallsService', () => {
  let service: RestCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NetIntakesService } from './net-intakes.service';

describe('NetIntakesService', () => {
  let service: NetIntakesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetIntakesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

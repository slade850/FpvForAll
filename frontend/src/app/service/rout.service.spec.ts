import { TestBed } from '@angular/core/testing';

import { RoutService } from './rout.service';

describe('RoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutService = TestBed.get(RoutService);
    expect(service).toBeTruthy();
  });
});

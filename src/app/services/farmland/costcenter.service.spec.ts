import { TestBed } from '@angular/core/testing';

import { CostcenterService } from './costcenter.service';

describe('CostcenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostcenterService = TestBed.get(CostcenterService);
    expect(service).toBeTruthy();
  });
});

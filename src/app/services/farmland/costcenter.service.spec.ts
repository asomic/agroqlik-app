import { TestBed } from '@angular/core/testing';

import { CostCenterService } from './costcenter.service';

describe('CostCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostCenterService = TestBed.get(CostCenterService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FarmlandService } from './farmland.service';

describe('FarmlandService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FarmlandService = TestBed.get(FarmlandService);
    expect(service).toBeTruthy();
  });
});

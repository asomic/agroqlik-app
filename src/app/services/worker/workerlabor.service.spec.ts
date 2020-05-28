import { TestBed } from '@angular/core/testing';

import { WorkerLaborService } from './workerlabor.service';

describe('WorkerlaborService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkerLaborService = TestBed.get(WorkerLaborService);
    expect(service).toBeTruthy();
  });
});

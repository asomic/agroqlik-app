import { TestBed } from '@angular/core/testing';

import { WorkerdayService } from './workerday.service';

describe('WorkerdayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkerdayService = TestBed.get(WorkerdayService);
    expect(service).toBeTruthy();
  });
});

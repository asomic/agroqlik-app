import { TestBed } from '@angular/core/testing';

import { WorkerDayService } from './workerday.service';

describe('WorkerdayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkerDayService = TestBed.get(WorkerDayService);
    expect(service).toBeTruthy();
  });
});

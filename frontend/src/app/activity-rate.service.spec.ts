import { TestBed } from '@angular/core/testing';

import { ActivityRateService } from './activity-rate.service';

describe('ActivityRateService', () => {
  let service: ActivityRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ActivityPeriodService } from './activity-period.service';

describe('ActivityPeriodService', () => {
  let service: ActivityPeriodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityPeriodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

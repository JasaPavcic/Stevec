import { TestBed } from '@angular/core/testing';

import { TimeTrackingService } from './time-tracking.service';

describe('TimeTrackingServiceService', () => {
  let service: TimeTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

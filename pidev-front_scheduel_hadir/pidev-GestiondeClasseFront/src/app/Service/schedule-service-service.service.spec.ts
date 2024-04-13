import { TestBed } from '@angular/core/testing';

import { ScheduleServiceServiceService } from './schedule-service-service.service';

describe('ScheduleServiceServiceService', () => {
  let service: ScheduleServiceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleServiceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

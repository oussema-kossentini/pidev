import { TestBed } from '@angular/core/testing';

import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';

describe('ServiceFazzetregisterServiceService', () => {
  let service: ServiceFazzetregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFazzetregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

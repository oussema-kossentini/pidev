import { TestBed } from '@angular/core/testing';

import { ClasseEvalService } from './classe-eval.service';

describe('ClasseEvalService', () => {
  let service: ClasseEvalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasseEvalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

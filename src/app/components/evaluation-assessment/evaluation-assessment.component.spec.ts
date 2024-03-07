import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationAssessmentComponent } from './evaluation-assessment.component';

describe('EvaluationAssessmentComponent', () => {
  let component: EvaluationAssessmentComponent;
  let fixture: ComponentFixture<EvaluationAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationAssessmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

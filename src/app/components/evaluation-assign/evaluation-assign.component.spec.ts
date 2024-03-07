import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationAssignComponent } from './evaluation-assign.component';

describe('EvaluationAssignComponent', () => {
  let component: EvaluationAssignComponent;
  let fixture: ComponentFixture<EvaluationAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationAssignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

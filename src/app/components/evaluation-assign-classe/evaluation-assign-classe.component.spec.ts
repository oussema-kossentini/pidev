import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationAssignClasseComponent } from './evaluation-assign-classe.component';

describe('EvaluationAssignClasseComponent', () => {
  let component: EvaluationAssignClasseComponent;
  let fixture: ComponentFixture<EvaluationAssignClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationAssignClasseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluationAssignClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

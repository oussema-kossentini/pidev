import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseEvalComponent } from './classe-eval.component';

describe('ClasseEvalComponent', () => {
  let component: ClasseEvalComponent;
  let fixture: ComponentFixture<ClasseEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClasseEvalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasseEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatProffParSpcComponent } from './stat-proff-par-spc.component';

describe('StatProffParSpcComponent', () => {
  let component: StatProffParSpcComponent;
  let fixture: ComponentFixture<StatProffParSpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatProffParSpcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatProffParSpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

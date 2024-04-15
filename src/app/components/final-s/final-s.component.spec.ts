import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalSComponent } from './final-s.component';

describe('FinalSComponent', () => {
  let component: FinalSComponent;
  let fixture: ComponentFixture<FinalSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

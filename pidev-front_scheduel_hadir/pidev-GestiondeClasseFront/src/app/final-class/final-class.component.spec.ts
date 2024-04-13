import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalCLASSComponent } from './final-class.component';

describe('FinalCLASSComponent', () => {
  let component: FinalCLASSComponent;
  let fixture: ComponentFixture<FinalCLASSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalCLASSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalCLASSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

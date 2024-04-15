import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionCLASSComponent } from './session-class.component';

describe('SessionCLASSComponent', () => {
  let component: SessionCLASSComponent;
  let fixture: ComponentFixture<SessionCLASSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessionCLASSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionCLASSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

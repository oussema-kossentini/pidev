import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPROFComponent } from './session-prof.component';

describe('SessionPROFComponent', () => {
  let component: SessionPROFComponent;
  let fixture: ComponentFixture<SessionPROFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessionPROFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionPROFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

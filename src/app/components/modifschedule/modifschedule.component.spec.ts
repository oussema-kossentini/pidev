import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifscheduleComponent } from './modifschedule.component';

describe('ModifscheduleComponent', () => {
  let component: ModifscheduleComponent;
  let fixture: ComponentFixture<ModifscheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifscheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

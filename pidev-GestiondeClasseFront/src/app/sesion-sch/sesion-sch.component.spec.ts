import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionSchComponent } from './sesion-sch.component';

describe('SesionSchComponent', () => {
  let component: SesionSchComponent;
  let fixture: ComponentFixture<SesionSchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SesionSchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SesionSchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

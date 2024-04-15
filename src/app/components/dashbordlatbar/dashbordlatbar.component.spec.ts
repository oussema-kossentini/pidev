import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordlatbarComponent } from './dashbordlatbar.component';

describe('DashbordlatbarComponent', () => {
  let component: DashbordlatbarComponent;
  let fixture: ComponentFixture<DashbordlatbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashbordlatbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashbordlatbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

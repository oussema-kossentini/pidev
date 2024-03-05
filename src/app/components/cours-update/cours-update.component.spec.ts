import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursUpdateComponent } from './cours-update.component';

describe('CoursUpdateComponent', () => {
  let component: CoursUpdateComponent;
  let fixture: ComponentFixture<CoursUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

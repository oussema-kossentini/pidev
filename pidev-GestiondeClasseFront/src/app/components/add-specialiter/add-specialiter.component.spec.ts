import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialiterComponent } from './add-specialiter.component';

describe('AddSpecialiterComponent', () => {
  let component: AddSpecialiterComponent;
  let fixture: ComponentFixture<AddSpecialiterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSpecialiterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSpecialiterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

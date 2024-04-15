import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQaComponent } from './add-qa.component';

describe('AddQaComponent', () => {
  let component: AddQaComponent;
  let fixture: ComponentFixture<AddQaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

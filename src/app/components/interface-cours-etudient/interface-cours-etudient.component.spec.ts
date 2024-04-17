import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceCoursEtudientComponent } from './interface-cours-etudient.component';

describe('InterfaceCoursEtudientComponent', () => {
  let component: InterfaceCoursEtudientComponent;
  let fixture: ComponentFixture<InterfaceCoursEtudientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterfaceCoursEtudientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterfaceCoursEtudientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

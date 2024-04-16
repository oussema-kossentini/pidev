import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesseurnavComponent } from './professeurnav.component';

describe('ProfesseurnavComponent', () => {
  let component: ProfesseurnavComponent;
  let fixture: ComponentFixture<ProfesseurnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfesseurnavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesseurnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

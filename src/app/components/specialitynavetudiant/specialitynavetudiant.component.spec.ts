import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialitynavetudiantComponent } from './specialitynavetudiant.component';

describe('SpecialitynavetudiantComponent', () => {
  let component: SpecialitynavetudiantComponent;
  let fixture: ComponentFixture<SpecialitynavetudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialitynavetudiantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialitynavetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

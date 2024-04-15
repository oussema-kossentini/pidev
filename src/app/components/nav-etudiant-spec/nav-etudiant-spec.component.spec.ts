import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEtudiantSpecComponent } from './nav-etudiant-spec.component';

describe('NavEtudiantSpecComponent', () => {
  let component: NavEtudiantSpecComponent;
  let fixture: ComponentFixture<NavEtudiantSpecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavEtudiantSpecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavEtudiantSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

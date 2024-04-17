import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceContenuEtudientComponent } from './interface-contenu-etudient.component';

describe('InterfaceContenuEtudientComponent', () => {
  let component: InterfaceContenuEtudientComponent;
  let fixture: ComponentFixture<InterfaceContenuEtudientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterfaceContenuEtudientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterfaceContenuEtudientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

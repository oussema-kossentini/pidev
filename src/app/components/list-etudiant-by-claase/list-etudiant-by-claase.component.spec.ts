import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudiantByClaaseComponent } from './list-etudiant-by-claase.component';

describe('ListEtudiantByClaaseComponent', () => {
  let component: ListEtudiantByClaaseComponent;
  let fixture: ComponentFixture<ListEtudiantByClaaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEtudiantByClaaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEtudiantByClaaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

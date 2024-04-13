import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudiantToAffComponent } from './list-etudiant-to-aff.component';

describe('ListEtudiantToAffComponent', () => {
  let component: ListEtudiantToAffComponent;
  let fixture: ComponentFixture<ListEtudiantToAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEtudiantToAffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEtudiantToAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

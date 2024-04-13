import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnsignatByClasseComponent } from './list-ensignat-by-classe.component';

describe('ListEnsignatByClasseComponent', () => {
  let component: ListEnsignatByClasseComponent;
  let fixture: ComponentFixture<ListEnsignatByClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEnsignatByClasseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEnsignatByClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

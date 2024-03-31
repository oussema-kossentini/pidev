import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnseignatToAffComponent } from './list-enseignat-to-aff.component';

describe('ListEnseignatToAffComponent', () => {
  let component: ListEnseignatToAffComponent;
  let fixture: ComponentFixture<ListEnseignatToAffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEnseignatToAffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEnseignatToAffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

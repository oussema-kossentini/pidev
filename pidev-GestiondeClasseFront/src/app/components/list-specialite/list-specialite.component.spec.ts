import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpecialiteComponent } from './list-specialite.component';

describe('ListSpecialiteComponent', () => {
  let component: ListSpecialiteComponent;
  let fixture: ComponentFixture<ListSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListSpecialiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

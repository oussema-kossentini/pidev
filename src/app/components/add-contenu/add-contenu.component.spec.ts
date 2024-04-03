import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContenuComponent } from './add-contenu.component';

describe('AddContenuComponent', () => {
  let component: AddContenuComponent;
  let fixture: ComponentFixture<AddContenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddContenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddContenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

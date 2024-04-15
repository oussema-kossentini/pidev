import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClasseSpComponent } from './show-classe-sp.component';

describe('ShowClasseSpComponent', () => {
  let component: ShowClasseSpComponent;
  let fixture: ComponentFixture<ShowClasseSpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowClasseSpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowClasseSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

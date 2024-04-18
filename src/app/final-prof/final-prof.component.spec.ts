import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalProfComponent } from './final-prof.component';

describe('FinalProfComponent', () => {
  let component: FinalProfComponent;
  let fixture: ComponentFixture<FinalProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinalProfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

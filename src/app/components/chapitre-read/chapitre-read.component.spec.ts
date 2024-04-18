import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapitreReadComponent } from './chapitre-read.component';

describe('ChapitreReadComponent', () => {
  let component: ChapitreReadComponent;
  let fixture: ComponentFixture<ChapitreReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChapitreReadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChapitreReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

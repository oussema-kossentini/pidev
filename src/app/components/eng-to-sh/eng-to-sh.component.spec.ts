import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngToShComponent } from './eng-to-sh.component';

describe('EngToShComponent', () => {
  let component: EngToShComponent;
  let fixture: ComponentFixture<EngToShComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EngToShComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EngToShComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

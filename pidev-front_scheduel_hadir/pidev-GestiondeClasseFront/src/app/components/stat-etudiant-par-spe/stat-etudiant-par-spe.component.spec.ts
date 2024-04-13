import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatEtudiantParSpeComponent } from './stat-etudiant-par-spe.component';

describe('StatEtudiantParSpeComponent', () => {
  let component: StatEtudiantParSpeComponent;
  let fixture: ComponentFixture<StatEtudiantParSpeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatEtudiantParSpeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatEtudiantParSpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

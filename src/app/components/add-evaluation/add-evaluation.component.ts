import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationService } from '../../service/evaluation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Evaluation, TypeEvaluation, Categorie } from '../../Models/evaluation.model';

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})


///
export class AddEvaluationComponent implements OnInit {
  evaluationForm!: FormGroup;
  isEditMode: boolean = false;
  categories = Object.values(Categorie); // Assurez-vous que Categorie est bien défini et exporté
  evolutionTypes = [
    { value: TypeEvaluation.QUIZZ, label: 'Quiz' },
    { value: TypeEvaluation.SOLVED_PROBLEME, label: 'Problème résolu' }
  ]; // Assurez-vous que TypeEvaluation est bien défini et exporté

  constructor(
    private formBuilder: FormBuilder,
    private evaluationService: EvaluationService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<AddEvaluationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { evaluation?: Evaluation }
  ) { }

  ngOnInit(): void {
    this.isEditMode = !!this.data?.evaluation;
    this.initForm();
  }

  initForm(): void {
    this.evaluationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      typeEvaluation: [null, Validators.required],
      categorie: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      statue: ['', Validators.required],
      duration: '',


    });

    if (this.isEditMode && this.data?.evaluation) {
      // Convertissez les dates au format ISO pour les champs datetime-local si nécessaire
      const evaluation = this.data.evaluation;
      this.evaluationForm.patchValue({
        ...evaluation,
        startDate: this.convertToDateTimeLocal(evaluation.startDate),
        endDate: evaluation.endDate ? this.convertToDateTimeLocal(evaluation.endDate) : ''
      });
    }
  }

  onSubmit(): void {
    if (this.evaluationForm.valid) {
      let formData = { ...this.evaluationForm.value };
      // Transformez les dates et heures au format nécessaire pour votre backend ou votre modèle
      formData.startDate = new Date(formData.startDate);
      formData.endDate = formData.endDate ? new Date(formData.endDate) : null;

      const operation = this.isEditMode ?
        this.evaluationService.updateEvaluation(this.data.evaluation?.idEvaluation || '', formData) :
        this.evaluationService.addEvaluation(formData);

      operation.subscribe({
        next: () => {
          Swal.fire('Success', `The evaluation has been ${this.isEditMode ? 'updated' : 'added'} successfully.`, 'success')
            .then(() => this.dialogRef?.close(true));
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire('Error', 'There was a problem saving the evaluation. Please try again.', 'error');
        }
      });
    }
  }

  private convertToDateTimeLocal(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    // Le navigateur convertit automatiquement en heure locale
    return date.toISOString().slice(0, 16);
  }
}

import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EvaluationService } from '../../Services/evaluation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Evaluation, TypeEvaluation , Categorie} from '../../Models/evaluation.model';

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})
export class AddEvaluationComponent implements OnInit {
  evaluationForm!: FormGroup;
  
  isEditMode: boolean = false;
  categories = Object.values(Categorie);
  evolutionTypes = [
    { value: TypeEvaluation.QUIZZ, label: 'Quiz' },
    { value: TypeEvaluation.SOLVED_PROBLEME, label: 'Problème résolu' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private evaluationService: EvaluationService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<AddEvaluationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { evaluation?: Evaluation }
  ) {}

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
      duration:'',
      classe: ['']
    });

    if (this.isEditMode && this.data?.evaluation) {
      this.evaluationForm.patchValue(this.data.evaluation);
    }
  }

  onSubmit(): void {
    console.log(this.evaluationForm.value);
    if (this.evaluationForm.valid) {
      const evaluationData = this.evaluationForm.value;
      const operation = this.isEditMode
        ? this.evaluationService.updateEvaluation(this.data.evaluation?.idEvaluation || '', evaluationData)
        : this.evaluationService.addEvaluation(evaluationData);

      operation.subscribe({
        next: () => {
          Swal.fire({
            title: 'Success',
            text: `The evaluation has been ${this.isEditMode ? 'updated' : 'added'} successfully.`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.dialogRef?.close(true); // Use optional chaining
          });
        },
        error: (error) => {
          console.error('Error:', error);
          Swal.fire({
            title: 'Error',
            text: 'There was a problem saving the evaluation. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}

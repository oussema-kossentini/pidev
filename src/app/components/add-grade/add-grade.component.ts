import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradeService } from '../../Services/grade.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grade } from '../../Models/grade.model';

@Component({
  selector: 'app-add-grade',
  templateUrl: './add-grade.component.html',
  styleUrls: ['./add-grade.component.scss']
})
export class AddGradeComponent implements OnInit {
  gradeForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private gradeService: GradeService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<AddGradeComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { grade?: Grade }
  ) {}

  ngOnInit(): void {
    this.isEditMode = !!this.data?.grade;
    this.gradeForm = this.fb.group({
      idGrade: [this.data?.grade?.idGrade || '', Validators.required],
      value: [this.data?.grade?.value || '', [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]],
      comment: [this.data?.grade?.comment || '']
    });
  }

  onSubmit(): void {
    if (this.gradeForm.valid) {
      const gradeData: Grade = this.gradeForm.value;
      const operation = this.isEditMode
        ? this.gradeService.updateGrade(this.data.grade?.idGrade || '', gradeData)
        : this.gradeService.addGrade(gradeData);

      operation.subscribe({
        next: () => this.handleSuccessResponse(this.isEditMode ? 'mise à jour' : 'ajoutée'),
        error: (error) => this.handleErrorResponse(error)
      });
    }
  }

  private handleSuccessResponse(action: string): void {
    Swal.fire('Succès', `La note a été ${action} avec succès.`, 'success').then(() => {
      this.dialogRef.close(true);
      this.router.navigate(['/grade-list']);
    });
  }

  private handleErrorResponse(error: any): void {
    Swal.fire('Erreur', 'Un problème est survenu lors de l’enregistrement de la note. Veuillez réessayer.', 'error');
  }
}

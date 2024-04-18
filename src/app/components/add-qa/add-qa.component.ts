import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { QaService } from '../../service/qa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QA } from '../../Models/qa.model'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-add-qa',
  templateUrl: './add-qa.component.html',
  styleUrls: ['./add-qa.component.scss']
})
export class AddQaComponent implements OnInit {
  qaForm!: FormGroup;
  isEditMode: boolean = false;
  evaluationId: any;

  constructor(
    private fb: FormBuilder,
    private qaService: QaService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<AddQaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { qa?: QA, evaluationId?: any }
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.qa) {
      this.isEditMode = true;
      this.populateForm(this.data.qa);
    }
    this.evaluationId = this.data?.evaluationId;
  }
//new
  initializeForm(): void {
    this.qaForm = this.fb.group({
      question: ['', Validators.required],
      correctResponse: ['', Validators.required],
      score: [0, [Validators.required, Validators.min(0)]],
      difficulty: ['', Validators.required],
      response: this.fb.array([], Validators.required),
      evaluationId: ['']
    });
  }

  get response(): FormArray {
    return this.qaForm.get('response') as FormArray;
  }

  addResponse(): void {
    this.response.push(this.fb.control('', Validators.required));
  }

  removeResponse(index: number): void {
    this.response.removeAt(index);
  }

  populateForm(qa: QA): void {
    this.qaForm.patchValue({
      question: qa.question,
      score: qa.score,
      difficulty: qa.difficulty,
      evaluationId: qa.evaluationId
    });
    this.response.clear();
    qa.response.forEach(response => this.response.push(this.fb.control(response, Validators.required)));
  }

  onSubmit(): void {
    if (this.qaForm.valid) {
      const qaData: QA = {
        ...this.qaForm.value,
        response: this.response.value
      };

      if (this.isEditMode) {
        this.qaService.modifyQA(this.data.qa?.idQa || '', qaData);
      } else {
        this.qaService.addQA(qaData).subscribe(value => {
          this.qaService.assignQaToEvaluation(value.idQa, this.evaluationId).subscribe(value1 => {
            Swal.fire({
              title: 'Success',
              text: `The Question has been assigned successfully.`,
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              this.dialogRef?.close(true); // Use optional chaining
            });
          });
        });
      }
    }
  }
}

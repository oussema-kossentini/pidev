import {Component, Inject, Optional} from '@angular/core';
import {EvaluationService} from "../../service/evaluation.service";
import {QaService} from "../../service/qa.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EvaluationListComponent} from "../evaluation-list/evaluation-list.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-evaluation-assign-classe',
  templateUrl: './evaluation-assign-classe.component.html',
  styleUrl: './evaluation-assign-classe.component.scss'
})
export class EvaluationAssignClasseComponent {
  evaluations: any[] = [];
  idCLasse:any;
  constructor(private evaluationService: EvaluationService,
              private qaService:QaService,
              @Optional() public dialogRef: MatDialogRef<EvaluationListComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: {idClasse?: any }
  ) { }

  ngOnInit(): void {
    this.loadEvaluations();
    this.idCLasse=this.data.idClasse;
  }

  loadEvaluations(): void {
    this.evaluationService.getEvaluations().subscribe({
      next: (data) => this.evaluations = data,
      error: (err) => console.error(err)
    });
  }

  assign(idEvaluation: any) {
    console.log("assigning user to evaluation")
    this.evaluationService.assignEvaluationtoClasse(this.idCLasse,idEvaluation)
      .subscribe(value => {

        Swal.fire({
          title: 'Success',
          text: `The evaluation has been assigned successfully.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.dialogRef?.close(true); // Use optional chaining
        });
      });
  }
}

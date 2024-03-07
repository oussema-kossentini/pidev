import {Component, EventEmitter, Inject, OnInit, Optional, Output} from '@angular/core';
import {EvaluationService} from "../../Services/evaluation.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {QaService} from "../../Services/qa.service";
import {QA} from "../../Models/qa.model";
import {EvaluationListComponent} from "../evaluation-list/evaluation-list.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-evaluation-assign',
  templateUrl: './evaluation-assign.component.html',
  styleUrl: './evaluation-assign.component.scss'
})
export class EvaluationAssignComponent implements OnInit{
  evaluations: any[] = [];
  idUser:any;
  constructor(private evaluationService: EvaluationService,
              private qaService:QaService,
              @Optional() public dialogRef: MatDialogRef<EvaluationListComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: {idUser?: any }
              ) { }

  ngOnInit(): void {
    this.loadEvaluations();
    this.idUser=this.data.idUser;
  }

  loadEvaluations(): void {
    this.evaluationService.getEvaluations().subscribe({
      next: (data) => this.evaluations = data,
      error: (err) => console.error(err)
    });
  }

  assign(idEvaluation: any) {
    console.log("assigning user to evaluation")
    this.evaluationService.assignEvaluationToUser(this.idUser,idEvaluation)
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

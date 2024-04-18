import {Component, OnInit} from '@angular/core';
import {ClasseComponent} from "../classe/classe.component";
import {ClasseEvalService} from "../../service/classe-eval.service";
import {EvaluationService} from "../../service/evaluation.service";
import {EvaluationAssignComponent} from "../evaluation-assign/evaluation-assign.component";
import {MatDialog} from "@angular/material/dialog";
import {EvaluationAssignClasseComponent} from "../evaluation-assign-classe/evaluation-assign-classe.component";

@Component({
  selector: 'app-classe-eval',
  templateUrl: './classe-eval.component.html',
  styleUrl: './classe-eval.component.scss'
})

//new
export class ClasseEvalComponent  implements OnInit{
  classes: any[] | undefined
  ngOnInit(): void {
    this.classeService.getAllClasses().subscribe(
      value => {
        this.classes=value
      }
    )
  }
  constructor(private classeService: ClasseEvalService,
              private dialog: MatDialog,
              private evaluationService: EvaluationService) {
  }

  assignEvaluation(idClasse: any) {
    const dialogRef = this.dialog.open(EvaluationAssignClasseComponent, {
      width: '80%',
      height:'80%',
      data: { idUser: idClasse }
    });
  }
}

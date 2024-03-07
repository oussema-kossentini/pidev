import {Component, Input, OnInit} from '@angular/core';
import {EvaluationService} from "../../../Services/evaluation.service";
import {Evaluation} from "../../../Models/evaluation.model";

@Component({
  selector: 'app-evaluation-details',
  templateUrl: './evaluation-details.component.html',
  styleUrl: './evaluation-details.component.scss'
})
export class EvaluationDetailsComponent implements OnInit{
  evaluation!:Evaluation

  ngOnInit(): void {
  }

  constructor(private service:EvaluationService) {
  }
  getEvaluationById(evaluationId:any){
    this.service.getEvaluation(evaluationId).subscribe(value =>
      this.evaluation=value
    )
  }
}

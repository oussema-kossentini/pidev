import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { EvaluationService } from "../../service/evaluation.service";
import { Evaluation } from "../../Models/evaluation.model";
import { interval, Subscription, takeWhile } from "rxjs";

@Component({
  selector: 'app-evaluation-assessment',
  templateUrl: './evaluation-assessment.component.html',
  styleUrl: './evaluation-assessment.component.scss'
})
export class EvaluationAssessmentComponent implements OnInit, OnDestroy {
  idu: any;
  ide: any;
  evaluation!: Evaluation;
  private timerSubscription: Subscription | null = null;
  remainingTime: number = 0;
  accessibleEval!: boolean;

  constructor(
    private route: ActivatedRoute,
    private evaluationService: EvaluationService
  ) { }

  ngOnDestroy() {

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.idu = this.route.snapshot.paramMap.get('idu');
    this.ide = this.route.snapshot.paramMap.get('ide');
    this.evaluationService.getEvaluation(this.ide).subscribe(value => {
      this.evaluation = value;
      this.accessibleEval = this.evaluation.accessible;
      console.log(this.evaluation);
    });

    const storedTime = sessionStorage.getItem("remainingTime");
    if (storedTime) {
      this.remainingTime = parseInt(storedTime);
    } else {
      this.remainingTime = this.evaluation.duration; // Use default duration if no stored time
    }

    this.startTimer(this.remainingTime);
  }

  startTimer(duration: number) {
    this.remainingTime = duration;
    this.timerSubscription = interval(1000) // Update every second
      .pipe(takeWhile(() => this.remainingTime > 0))
      .subscribe(() => {
        this.remainingTime--;
        if (this.remainingTime > 0) {
          sessionStorage.setItem("remainingTime", this.remainingTime.toString());
        }
        if (this.remainingTime == 0) {
          this.accessibleEval = false;
        }
      }, error => {
        console.error('Error in timer:', error);
      }, () => {
        console.log('Timer completed!');
        // Handle timer completion, e.g., disable submit buttons, mark evaluation as closed
      });
  }
}

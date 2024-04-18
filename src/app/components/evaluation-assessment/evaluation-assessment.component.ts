import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationService} from "../../service/evaluation.service";
import {interval, Subscription, takeWhile} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-evaluation-assessment',
  templateUrl: './evaluation-assessment.component.html',
  styleUrl: './evaluation-assessment.component.scss'
})

//new
export class EvaluationAssessmentComponent implements OnInit, OnDestroy {
  idu: any;
  ide: any;
  evaluation!: any;
  private timerSubscription: Subscription | null = null;
  remainingTime: number = 0;
  accessibleEval!: boolean;
  totalScore!: number;
  private userAttempts: any[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private evaluationService: EvaluationService,
    private router: Router
  ) {
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.idu = this.route.snapshot.paramMap.get('idu');
    this.ide = this.route.snapshot.paramMap.get('ide');
    this.evaluationService.getEvaluationAttemptsByUserId(this.idu)
      .subscribe(value => {
        this.userAttempts = value;
      });
    this.evaluationService.getEvaluation(this.ide).subscribe(value => {
      this.evaluation = value;
      if (this.userAttempts?.find(value1 => value1.evaluation.idEvaluation == this.evaluation.idEvaluation)) {
        this.evaluation.accessible = false
      }
      this.prepareQuestions(this.evaluation);
      this.accessibleEval = this.evaluation.accessible;

    });

    const storedTime = sessionStorage.getItem("remainingTime-" + this.ide);
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
          sessionStorage.setItem("remainingTime-" + this.ide, this.remainingTime.toString());
        }
        if (this.remainingTime == 0) {
          this.accessibleEval = false;
          console.log("iff")
          console.log(this.accessibleEval)
        }
      }, error => {
        console.error('Error in timer:', error);
      }, () => {
        console.log('Timer completed!');
        // Handle timer completion, e.g., disable submit buttons, mark evaluation as closed
      });
  }

  prepareQuestions(evaluation: any) {
    if (evaluation.qas) {
      for (let i = 0; i < evaluation.qas.length; i++) {
        if (!evaluation.qas[i].response.includes(evaluation.qas[i].correctResponse)) { // Check if already present
          evaluation.qas[i].response.push(evaluation.qas[i].correctResponse);
        }
        this.shuffleAnswers(evaluation.qas[i]);
      }
    }
  }

  shuffleAnswers(question: any) {
    for (let i = question.response.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [question.response[i], question.response[j]] = [question.response[j], question.response[i]];
    }
  }


  calculateAndSubmitResponse(value: any) {

    let score = 0;
    for (let i = 0; i < this.evaluation.qas.length; i++) {
      if (this.evaluation.qas[i].correctResponse == value[this.evaluation.qas[i].question]) {
        score += this.evaluation.qas[i].score;
      }
    }
    this.totalScore = score;
    console.log("Total score: ", this.totalScore);
    this.evaluationService.addEvaluationAttempt(this.idu, this.ide, this.totalScore)
      .subscribe();
    Swal.fire({
      title: 'Evaluation Submitted',
      text: `You will Received an email with the score ! ,`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate([""]).then(r => {
      })
    });
  }
}

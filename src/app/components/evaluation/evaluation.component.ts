// EvaluationComponent Class
import { Component } from '@angular/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'] // Assurez-vous que c'est 'styleUrls' au pluriel
})
export class EvaluationComponent {
  selectedPage: any;
  evaluationId: any;

  navigateTo(page: string): void {
    this.selectedPage = page;
    console.log('Navigation to:', this.selectedPage);
  }
}

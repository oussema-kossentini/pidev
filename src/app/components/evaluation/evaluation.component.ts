import { Component } from '@angular/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent {
  selectedPage:any;
  evaluationId:any;
  navigateTo(page:any) {
    this.selectedPage=  page
    console.log(this.selectedPage);
  }


}

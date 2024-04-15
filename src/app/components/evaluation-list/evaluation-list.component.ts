import { MatDialog } from '@angular/material/dialog';
import { AddEvaluationComponent } from '../add-evaluation/add-evaluation.component';
import { EvaluationService } from '../../service/evaluation.service';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import {AddQaComponent} from "../add-qa/add-qa.component";
import {QaListComponent} from "../qa-list/qa-list.component";

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.scss']
})
export class EvaluationListComponent implements OnInit {
  evaluations: any[] = [];
  @Output() emitter= new EventEmitter<any>();

  constructor(private evaluationService: EvaluationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadEvaluations();
  }

  loadEvaluations(): void {
    this.evaluationService.getEvaluations().subscribe({
      next: (data) => this.evaluations = data,
      error: (err) => console.error(err)
    });
  }
  assignQuestion(evalutionId:any){
    const dialogRef = this.dialog.open(AddQaComponent, {
      width: '40%',
      height:'80%',
      data: { evaluationId: evalutionId }
    });
  }

  editEvaluation(evaluation: any): void {
    const dialogRef = this.dialog.open(AddEvaluationComponent, {
      width: '40%',
      height:'80%',
      data: { evaluation: evaluation }
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadEvaluations();
    });
  }
  AddEvaluation(): void {
    const dialogRef = this.dialog.open(AddEvaluationComponent, {
      width: '40%',
      height:'80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadEvaluations();
    });
  }

  deleteEvaluation(id: string): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluationService.deleteEvaluation(id).subscribe(
          () => {
            Swal.fire(
              'Supprimé!',
              'L’évaluation a été supprimée avec succès.',
              'success'
            );
            this.loadEvaluations(); // Rechargez ou mettez à jour la liste des évaluations ici
          },
          error => {
            console.error('Erreur lors de la suppression de l’évaluation', error);
            Swal.fire(
              'Erreur!',
              'Un problème est survenu lors de la suppression de l’évaluation.',
              'error'
            );
          }
        );
      }
    });
  }

  navigateTo(page: string) {

    this.emitter.emit(page)
  }

  openQuestion(idEvaluation: any) {
    const dialogRef = this.dialog.open(QaListComponent, {
      width: '40%',
      height:'80%',
      data:{evaluationId:idEvaluation,byId:"true"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadEvaluations();
    });
  }
}

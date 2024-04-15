import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { QA } from '../../Models/qa.model'; // Assurez-vous que le chemin est correct
import { QaService } from '../../service/qa.service'; // Assurez-vous que le chemin est correct
import { AddQaComponent } from '../add-qa/add-qa.component';


@Component({
  selector: 'app-qa-list',
  templateUrl: './qa-list.component.html',
  styleUrls: ['./qa-list.component.scss']
})
export class QaListComponent implements OnInit {

  qas: QA[] = [];

  constructor(
    @Optional() public dialogRef: MatDialogRef<AddQaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {evaluationId?: any,byId:any },
    private qaService: QaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadQAs();
  }

  loadQAs(): void {
    if(this.data!=null){
      this.qaService.getQaById(this.data.evaluationId).subscribe(value =>{
        this.qas=value;
      })
    }else{
    this.qaService.retrieveAllQA().subscribe({
      next: (data) => {
        this.qas = data;
      },
      error: (err) => {
        console.error('Error loading QAs:', err);
        Swal.fire('Erreur', 'Un problème est survenu lors du chargement des QAs.', 'error');
      }
    });}
  }

  editQa(qa: QA): void {
    const dialogRef = this.dialog.open(AddQaComponent, {
      width: '500px',
      data: { qa }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadQAs();
      }
    });
  }

  removeQA(id: string): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas annuler cette action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-la!',
      cancelButtonText: 'Non, annulez!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.qaService.removeQA(id).subscribe({
          next: () => {
            Swal.fire('Supprimé!', 'Votre QA a été supprimée.', 'success');
            this.loadQAs(); // Rechargez la liste des QA ici
          },
          error: (err) => {
            console.error('Erreur lors de la suppression de la QA:', err);
            Swal.fire('Erreur', 'Un problème est survenu lors de la suppression de la QA.', 'error');
          }
        });
      }
    });
}

}

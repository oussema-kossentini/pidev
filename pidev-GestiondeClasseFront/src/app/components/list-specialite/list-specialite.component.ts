
import { SpecialiteService } from '../../Service/specialite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit ,ViewChild} from '@angular/core';
import { ClasseService } from '../../Service/classe.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {saveAs} from "file-saver";

@Component({
  selector: 'app-list-specialite',
  templateUrl: './list-specialite.component.html',
  styleUrl: './list-specialite.component.scss'
})
export class ListSpecialiteComponent {
//   dialog: any;
// // addClass(arg0: any) {
// throw new Error('Method not implemented.');
// }
  SpecList: any[] = [];
  errorMessage: string = '';
  titels: any[] = [];
  specialite:any[] = [];
  constructor(
    private specialiteService: SpecialiteService,
    private ClasseService:ClasseService,
    private formBuilder: FormBuilder ,
    private router: Router
  ) {
    this.loadSpecialite();
    // this.loadTitels();
  }


  ngOnInit(): void {
    this.loadSpecialite();

  }
  loadSpecialite() {
    this.specialiteService.getAllSpecialite().subscribe(
      data => {
        this.SpecList = data;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des classes: ' + error.message;
      }
    );
  }

  // loadTitels() {
  //   this.specialiteService.getTitels().subscribe(
  //     data => {
  //       this.titels = data;
  //     },
  //     error => console.log('Erreur lors du chargement des classes', error)
  //   );
  // }

  deleteClass(id: string) {
    if(confirm('Are you sure to delete this class?')) {
      this.specialiteService.deleteSpecialit(id).subscribe(
        () => {
          console.log('Class deleted successfully');
          this.loadSpecialite();
        },
        error => console.log('Error during class deletion', error)
      );
    }
  }


  editSpecialite(specialite: any): void {
    specialite.editing = true; // Activate edit mode for the user
    alert(`Editing class: ${specialite.name}`);
  }


  saveChanges(specialite: any): void {
    specialite.editing = false; // Deactivate edit mode for the user
    this.specialiteService.modifySpecialite(specialite).subscribe({
      next: (response) => {
        console.log('class modified successfully:', response);
        // Handle successful response, e.g., display confirmation message
      },
      error: (error) => {
        console.error('Error modifying :', error);
        // Handle error, e.g., display error message to user
      }
    });
  }



  // openDialog(): void {
  //   const dialogRef = this.dialog.open(this.ClasseService, {
  //     width: '500px',

  //   });

  //   dialogRef.afterClosed().subscribe(() => {
  //     console.log('The dialog was closed');
  //     // You can handle any result or action after the dialog is closed
  //   });
  // }


  comment(idSpecialite:any):void {
    this.router.navigate(['/classe',idSpecialite])
    }


    comments(idSpecialite:any):void {
      console.log(idSpecialite);
      this.router.navigate(['/show-classe-sp/',idSpecialite])
      }

  goToStatEtudiant() {
    this.router.navigate(['/statEtudiant']);
  }
  goTostatEnseignat() {
    this.router.navigate(['/statEnseignat']);
  }


  ExportPdf() {
    this.ClasseService.exportUniversitesPdf().subscribe(
      (blob: Blob) => {
        const fileName = 'classes_etudiants.pdf';
        saveAs(blob, fileName);
      },
      error => {
        console.error(error);
      }
    );
  }


}




import { SpecialiteService } from '../../service/specialite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import { ClasseService } from '../../service/classe.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {saveAs} from "file-saver";
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import {isPlatformBrowser} from "@angular/common";
import { timeout } from 'rxjs/operators';
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
  isBrowser :Boolean;
  constructor(
    private specialiteService: SpecialiteService,
    private ClasseService:ClasseService,
    public authService: ServiceFazzetregisterService,
    private formBuilder: FormBuilder ,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.loadSpecialite();
    // this.loadTitels();
    this.isBrowser = isPlatformBrowser(platformId);
  }


  ngOnInit(): void {
    this.loadSpecialite();

  }
  loadSpecialite() {
    // Reset errorMessage each time the method is called
    this.errorMessage = '';

    // Récupération du token JWT via le service d'authentification
    const token = this.authService.getJwtToken();

    if (token == null) {
      this.errorMessage = 'Token not found';
      console.error(this.errorMessage);
      return;  // Arrêter le chargement si le token n'est pas trouvé
    }

    this.specialiteService.getAllSpecialite(token).subscribe({
      next: (data) => {
        this.SpecList = data;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des spécialités: ' + error.message;
        console.error(this.errorMessage);
      }
    });
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
    if (confirm('Are you sure to delete this class?')) {
      // Récupérer le token JWT via le service d'authentification
      const token = this.authService.getJwtToken();

      if (token == null) {
        console.error('Token not found');
        return;  // Arrêter la suppression si le token n'est pas trouvé
      }

      this.specialiteService.deleteSpecialite(id, token).subscribe(
        () => {
          console.log('Class deleted successfully');
          this.loadSpecialite();
          console.log('Class  ');
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
    this.ClasseService.exportUniversitesPdf().pipe(
      timeout(30000) // Augmentez le délai d'attente à 30 secondes
    ).subscribe(
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



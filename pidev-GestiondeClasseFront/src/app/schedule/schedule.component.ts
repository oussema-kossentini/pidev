import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { response } from 'express';
import { ScheduleServiceServiceService } from '../Service/schedule-service-service.service';

// Assurez-vous d'importer le service nécessaire si vous ne l'avez pas déjà fait.
// import { ScheduleServiceService } from 'chemin-vers-votre-service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {


  hadirs: any[] = [];
  tutorials = [{ id: 1, nameClasse: 'Classe 1' }, { id: 2, nameClasse: 'Classe 2' }]; // Exemple de données
  selectedId: any; // Variable pour stocker l'ID sélectionné

  id: any;
  tutorialss: any[] = [];
  result: any;
  selectedClasse: any;
  registerFormCustom!: FormGroup; // Utiliser un seul nom pour le formulaire
  dataSubmitted = false; // Assurez-vous d'avoir cette propriété déclarée si vous l'utilisez

  onSelect(id: any) {
    this.selectedId = id;
    console.log('ID sélectionné:', this.selectedId); // Pour vérification
  }


  constructor(private fb: FormBuilder, private scheduleServiceService: ScheduleServiceServiceService) { }

  ngOnInit(): void {
    this.registerFormCustom = this.fb.group({
      // idScheduel: '',
      // class: '',
      startDate: ['', Validators.required],
      endDate: ['', [Validators.required, this.validateEndDate]]
    });

    this.getALL();
    
    //this.getByIdClasse(this.id);
    this.getALLClasse();
  }



  // Validation personnalisée pour endDate
  validateEndDate(control: any): { [key: string]: any } | null {
    const startDate = control.parent?.get('startDate')?.value;
    const endDate = control.value;
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { 'endDateBeforeStartDate': true };
    }
    return null;
  }


  onSubmit() {
    console.log(this.registerFormCustom.value);
  }

  onSubmitsch() {
    if (this.registerFormCustom.valid) {
      this.dataSubmitted = true;
      this.scheduleServiceService.addStoClasse(this.registerFormCustom.value, this.selectedId).subscribe(
        response => {
          console.log(response);
          this.hadirs.push(response);

        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }




  //All Scheduels
  getALL(): void {
    this.scheduleServiceService.getAllSchedules()
      .subscribe(
        (data) => {
          console.log(data);
          this.hadirs = data; // assigner les données récupérées à la variable tutorials






          console.log("dattttttttttttttttttttttttt", data);

        },
        (error) => {
          console.log(error); // gérer les erreurs éventuelles
        }
      );
  }



  //All Classe

  getALLClasse(): void {
    this.scheduleServiceService.getAllClasses()
      .subscribe(
        (data) => {
          console.log("gggggggggg", data);
          this.tutorialss = data; // assigner les données récupérées à la variable tutorials
        },
        (error) => {
          console.log(error); // gérer les erreurs éventuelles
        }
      );
  }




  getByIdClasse(id: any) {
    this.scheduleServiceService.getByIdClass(id).subscribe(
      data => {
        this.result = data;
        console.log("data", this.result)
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }



  // Supposons que cette méthode soit dans votre composant qui affiche les horaires
  deleteSchedule(idScheduel: string): void {
    console.log("Deleting schedule with ID:", idScheduel); // Vérifiez l'identifiant
    this.scheduleServiceService.deleteSched(idScheduel).subscribe({
      next: () => {
        console.log('Schedule deleted successfully');
        // Mettre à jour la liste des horaires après la suppression
        this.scheduleServiceService.getAllSchedules().subscribe((response) => {
          this.tutorials = response;
        });
      },
      error: (error) => {
        console.error('Error deleting schedule', error);
      }
    });
  }

}

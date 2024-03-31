import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialiteService } from '../Service/specialite.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleServiceServiceService } from '../Service/schedule-service-service.service';

@Component({
  selector: 'app-sesion-sch',
  templateUrl: './sesion-sch.component.html',
  styleUrl: './sesion-sch.component.scss'
})
export class SesionSchComponent implements OnInit {

  nameCLASSE: any;
  id: any;
  sessions: any[] = [];
  dataSubmitted = false;
  selectedTutorial: any = {};
  session: any = {};

  registerFormCustom!: FormGroup; // Formulaire pour ajouter une session
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Liste des jours de la semaine
  hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']; // Liste des heures

  constructor(private fb: FormBuilder,
    private scheduleServiceService: ScheduleServiceServiceService,

    private router: Router,
    private route: ActivatedRoute) { }


  onSelect(tutorial: any): void {
    this.selectedTutorial = tutorial;

    console.log('Tutoriel sélectionné:', this.selectedTutorial);

    // Vous avez maintenant accès à both `this.selectedTutorial.idSubject` et `this.selectedTutorial.subjectName`
  }


  ngOnInit(): void {
    this.registerFormCustom = this.fb.group({


      day: [''], // Jour de la session
      debutHour: [''], // Heure de début
      endHour: [''], // Heure de fin
    });


    this.id = this.route.snapshot.paramMap.get('idScheduel');
    console.log("idScheduel", this.id)

    this.initializeScheduleFromLocalStorage(); // Initialisation de l'emploi du temps à partir du stockage local
    this.getALLClasse();
    //this.getByIdscheduel(this.id);
  }


  initializeScheduleFromLocalStorage() {
    const storedSchedule = localStorage.getItem('schedule');
    if (storedSchedule) {
      this.session = JSON.parse(storedSchedule);


    } else {
      this.initializeSchedule(); // Si aucune donnée n'est stockée localement, initialiser un emploi du temps vide
    }
  }
  initializeSchedule() {
    this.daysOfWeek.forEach(day => {
      this.session[day] = {};
      this.hours.forEach(hour => {
        this.session[day][hour] = '-';
      });
    });
  }

  saveScheduleToLocalStorage() {
    localStorage.setItem('schedule', JSON.stringify(this.session));

    console.log("SESSION", this.session);


  }
  
  //
  getSubjectForTime(day: string, hour: string): any {
    const session = this.session[day]?.[hour];
    if (session && session.idScheduel === this.id) {
      return session;
    }
    return null;
  }


  onSubmit() {
    if (this.registerFormCustom.valid) {
      const { day, debutHour, endHour } = this.registerFormCustom.value;
      const idScheduel = this.id;
     // const sub = this.selectedTutorial.idSubject;
      const idS = this.selectedTutorial.idScheduel;
      const nameClasse = this.selectedTutorial.classe.nameClasse



      this.scheduleServiceService.addShToSession({ day, debutHour, endHour }, idS).subscribe(
        (response) => {
          console.log("posttttttt", response);
          console.log("classeNom", this.selectedTutorial.classe.nameClasse)
          this.session[day][debutHour] = { idSession: response.idSession, idScheduel,  nameClasse };
          this.session[day][endHour] = { idSession: response.idSession, idScheduel, nameClasse };
          console.log("sesionnn", this.session)
          this.saveScheduleToLocalStorage();
          this.registerFormCustom.reset();

          console.log('Session ajoutée avec succès.');
        },
        (error) => {
          console.log('Erreur lors de l\'ajout de la session:', error);
        }
      );
    } else {
      console.error('Le formulaire n\'est pas valide.');
    }
  }

  classe: any[] = [];
  getALLClasse(): void {
    this.scheduleServiceService.getAllSchedules()
      .subscribe(
        (data) => {
          console.log("gggggggggg", data);
          this.classe = data; // assigner les données récupérées à la variable tutorials
        },
        (error) => {
          console.log(error); // gérer les erreurs éventuelles
        }
      );
  }
  // getByIdscheduel(id: any) {
  //   this.scheduleServiceService.getByIdScheduel(id).subscribe(
  //     data => {
  //       this.classe = data;
  //       console.log("data", this.classe)
  //     },
  //     error => {
  //       console.error('Erreur lors de la récupération des données', error);
  //     }
  //   );
  // }





}

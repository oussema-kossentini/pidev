import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import  {SpecialiteService} from "../../service/specialite.service";

import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleServiceServiceService } from '../../service/schedule-service-service.service';
//import { ClasseService } from '../../service/classe.service';
import {ClasseService} from "../../service/classe.service";
//import  {SpecialiteService} from "../../service/specialite.service";
@Component({
  selector: 'app-session-prof',
  templateUrl: './session-prof.component.html',
  styleUrl: './session-prof.component.scss'
})
export class SessionPROFComponent implements OnInit{

  nameCLASSE: any;
  id: any;
  idss: any;
  iduser: any;
  sessions: any[] = [];
  dataSubmitted = false;
  selectedTutorial: any = {};
  session: any = {};
  clasess: any[] = [];

  hadirs: any[] = [];
  registerFormCustom!: FormGroup; // Formulaire pour ajouter une session
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Liste des jours de la semaine
  hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']; // Liste des heures

  constructor(private fb: FormBuilder,
    private scheduleServiceService: ScheduleServiceServiceService,
    private classesService: ClasseService,
    private router: Router,
    private route: ActivatedRoute) { }

  getAllClasses(): void {
    this.classesService.getClassesByUserId(this.iduser)
      .subscribe(classes => {
        this.clasess = classes;
      });

  }
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
    this.idss = this.route.snapshot.paramMap.get('idScheduel');


    console.log('okok')
    // authService needs to be injected and implemented


    this.initializeScheduleFromLocalStorage(); // Initialisation de l'emploi du temps à partir du stockage local
    // this.getALLClasse();
    this.getByIdscheduel(this.id);


    this.gettest();
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
    // Vérifie si le formulaire est valide
    if (this.registerFormCustom.valid) {
        const { day, debutHour, endHour } = this.registerFormCustom.value;
        const idScheduel = this.id;

        const nameClasse = this.selectedTutorial.nameClasse;


        this.scheduleServiceService.addShToSession({ day, debutHour, endHour }, idScheduel).subscribe(
            (response) => {

                console.log("TEST3CHA", response);
                this.session[day][debutHour] = { idSession: response.idSession, idScheduel, nameClasse };
                this.session[day][endHour] = { idSession: response.idSession, idScheduel, nameClasse };
                console.log("sesionnn", this.session);
                this.saveScheduleToLocalStorage();
                this.registerFormCustom.reset();
                console.log('Session ajoutée avec succès.');
            },
            (error) => {

                console.log('Erreur lors de l\'ajout de la session:', error);
                if (error.status === 400) {
                    alert('Choisissez une autre date car elle est déjà remplie.');
                } else {

                    alert('Choisissez une autre date car elle est déjà remplie.');
                }
            }
        );
    } else {
        // Si le formulaire n'est pas valide, affiche un message d'erreur
        console.error('Le formulaire n\'est pas valide.');
    }
}


  classe: any[] = [];
  // getALLClasse(): void {
  //   this.scheduleServiceService.getAllSchedules()
  //     .subscribe(
  //       (data) => {
  //         console.log("gggggggggg", data);
  //         this.classe = data; // assigner les données récupérées à la variable tutorials
  //       },
  //       (error) => {
  //         console.log(error); // gérer les erreurs éventuelles
  //       }
  //     );
  // }
  users: any
  iddd: any
  USERS: any
  getByIdscheduel(id: any) {
    this.scheduleServiceService.getByIdScheduel(id).subscribe(
      data => {
        this.classe = data;

        console.log("idSchedueldddddddd", data.idScheduel)
        const USERS = data.idScheduel;



        console.log("aloooooooooooooooooooooo", data.classe.usersIds[0])
        this.classesService.getClassesByUserId(data.classe.usersIds[0])
          .subscribe({
            next: (data) => {

              this.hadirs = data;


              console.log(data, "claseeeeeeByidddd");
            },
            error: (error) => {
              console.error('Erreur lors de la récupération des horaires par idUser', error);
            }
          });



      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }

  gettest(): void {

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScheduleServiceServiceService } from '../Service/schedule-service-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.scss'],
})
export class EmploiComponent implements OnInit {
  id: any;
  idDD: any;
  // dataSubmitted = false;
  selectedId: any; // Variable pour stocker l'ID sélectionné
  session: any = {}; // Objet pour stocker l'emploi du temps
  result: any;
  tutorialss: any[] = [];
  //selectedClasse: any;
  TEST: any[] = [];
  registerFormCustom!: FormGroup; // Formulaire pour ajouter une session
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Liste des jours de la semaine
  hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']; // Liste des heures







  selectedTutorial: any = {}; // Utilisez un type plus spécifique si possible


  onSelect(tutorial: any): void {
    this.selectedTutorial = tutorial;

    console.log('Tutoriel sélectionné:', this.selectedTutorial);

    // Vous avez maintenant accès à both `this.selectedTutorial.idSubject` et `this.selectedTutorial.subjectName`
  }




  constructor(private fb: FormBuilder,
    private scheduleServiceService: ScheduleServiceServiceService,
    private router: Router,
    private route: ActivatedRoute) { }








  ngOnInit(): void {
    this.registerFormCustom = this.fb.group({


      day: [''], // Jour de la session
      debutHour: [''], // Heure de début
      endHour: [''], // Heure de fin
    });

    this.initializeScheduleFromLocalStorage(); // Initialisation de l'emploi du temps à partir du stockage local
    // Récupérer l'ID de l'URL du navigateur
    this.id = this.route.snapshot.paramMap.get('id');

    this.GetByIdScheduel(this.id);
    this.getALLSubject();
    // this.loadTutorials(); // Chargez vos données ici








  }
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
  getALLSubject(): void {
    this.scheduleServiceService.getAllSubject()
      .subscribe(
        (data) => {
          console.log("uuuuuuuu", data);
          this.TEST = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }



  GetByIdScheduel(id: any) {
    this.scheduleServiceService.getByIdScheduel(id).subscribe(
      data => {
        this.result = data;
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }



  // loadTutorials(): void {
  //   this.scheduleServiceService.getAllSubject()
  //     .subscribe(
  //       (data) => {
  //         console.log("uuuuuuuu", data);
  //         this.TEST = data;
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // }








  onSubmit() {
    if (this.registerFormCustom.valid) {
        const { day, debutHour, endHour } = this.registerFormCustom.value;
        const idScheduel = this.id; 
        const idSubject = this.selectedTutorial.idSubject; 
        const subjectName = this.selectedTutorial.subjectName;

        // Vérification pour s'assurer qu'on n'ajoute pas une session déjà existante
        const existingSession = this.session[day]?.[debutHour]?.idScheduel === idScheduel && 
                                this.session[day]?.[debutHour]?.idSubject === idSubject;

        if (!existingSession) {
            this.scheduleServiceService.addSchedSS({ day, debutHour, endHour }, idScheduel, idSubject).subscribe(
                (response) => {
                    console.log("posttttttt", response);

                    // Assurez-vous de vérifier l'existence du jour et de l'heure avant d'attribuer la valeur
                    if (!this.session[day]) {
                        this.session[day] = {};
                    }

                    this.session[day][debutHour] = { 
                        idSession: response.idSession, 
                        idScheduel, 
                        idSubject: response.idSubject, 
                        name: subjectName 
                    };
                    
                    this.session[day][endHour] = { 
                        idSession: response.idSession, 
                        idScheduel, 
                        idSubject: response.idSubject, 
                        name: subjectName 
                    };

                    this.saveScheduleToLocalStorage(); 
                    this.registerFormCustom.reset(); 

                    console.log('Session ajoutée avec succès.');
                },
                (error) => {
                    console.log('Erreur lors de l\'ajout de la session:', error);
                }
            );
        } else {
            console.error('Une session avec les mêmes idScheduel et idSubject existe déjà.');
        }
    } else {
        console.error('Le formulaire n\'est pas valide.');
    }
}


  isSessionAlreadyAdded(day: string, debutHour: string, endHour: string, idScheduel: string): boolean {
    // Vérifie si le jour a été initialisé dans le tableau session
    if (!this.session[day]) {
      return false;
    }

    // Vérifie si une session avec la même heure de début et de fin et le même jour existe déjà dans le même emploi du temps
    return this.session[day][debutHour] !== undefined &&
      this.session[day][debutHour].idScheduel === idScheduel &&
      this.session[day][endHour] !== undefined &&
      this.session[day][endHour].idScheduel === idScheduel;
  }











  //origine

  //   onSubmit() {
  //     if (this.registerFormCustom.valid) {
  //       // this.dataSubmitted =true;
  //       const { day, debutHour, endHour } = this.registerFormCustom.value;
  //       const idScheduel = this.id;
  // //****** */

  //       const sub = this.selectedTutorial.idSubject;


  //       const name = this.selectedTutorial.subjectName;

  //       console.log("idddd", idScheduel)

  //       this.scheduleServiceService.addSchedSS({ day, debutHour, endHour }, idScheduel, sub).subscribe(
  //         (response) => {

  //           console.log("posttttttt", response);



  //           this.session[day][debutHour] = { idSession: response.idSession, idScheduel, idSubject: response.idSubject ,name};
  //           this.session[day][endHour] = { idSession: response.idSession, idScheduel, name };


  //           console.log("esponse.idSubject ", response.idSubject)


  //           this.saveScheduleToLocalStorage();

  //           this.registerFormCustom.reset();


  //           console.log('Session ajoutée avec succès.');
  //         },
  //         (error) => {
  //           console.log('Erreur lors de l\'ajout de la session:');
  //         }
  //       );
  //     } else {
  //       console.error('Le formulaire n\'est pas valide.');
  //     }
  //   }



















  //Initialise l'emploi du temps à partir du stockage local s'il existe, sinon initialise un emploi du temps vide.

  initializeScheduleFromLocalStorage() {
    const storedSchedule = localStorage.getItem('schedule');
    if (storedSchedule) {
      this.session = JSON.parse(storedSchedule);


    } else {
      this.initializeSchedule(); // Si aucune donnée n'est stockée localement, initialiser un emploi du temps vide
    }
  }
  //Sauvegarde l'emploi du temps actuel dans le stockage local.
  saveScheduleToLocalStorage() {
    localStorage.setItem('schedule', JSON.stringify(this.session));

    console.log("SESSION", this.session);


  }

  getSubjectForTime(day: string, hour: string): any {
    const session = this.session[day]?.[hour];
    if (session && session.idScheduel === this.id &&  session && session.idSession[1]
) {
      return session;
    }
    return null;
  }


  //Initialise l'emploi du temps avec des valeurs par défaut.
  initializeSchedule() {
    this.daysOfWeek.forEach(day => {
      this.session[day] = {};
      this.hours.forEach(hour => {
        this.session[day][hour] = '-';
      });
    });
  }

  getSessionId(day: string, hour: string): string {
    return `${day}_${hour}`;
  }







  getByIdSubject(id: any) {
    this.scheduleServiceService.getByIdSubject(id).subscribe(
      data => {
        this.result = data;
        console.log("data", this.result)
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }




  onDeleteSession(idSession: string, day: string, hour: string): void {
    console.log("Deleting session with ID:", idSession);
    if (idSession) {
      this.scheduleServiceService.deleteSession(idSession).subscribe(
        () => {
          // Suppression de la session du modèle local
          delete this.session[day][hour];
          this.saveScheduleToLocalStorage();
          console.log('Session deleted successfully');
        },
        (error) => {
          console.error('Error deleting session:', error);
        }
      );
    } else {
      console.error('No session ID provided for deletion');
    }
  }

  onModifySession(session: any, day: string, hour: string): void {
    //   console.log("Modifying session:", session);
    //   // Ici, vous pré-rempliriez votre formulaire avec les données de la session.
    //   // Par exemple, si votre formulaire a des champs pour day, debutHour, endHour, vous les définiriez comme suit:
    //   this.registerFormCustom.setValue({
    //     day: day,
    //     debutHour: hour,
    //     endHour: this.calculateEndHour(hour, session.duration), // Supposons que vous avez une logique pour calculer l'heure de fin basée sur la durée de la session
    //     // Ajoutez d'autres champs requis ici, en vous assurant qu'ils sont présents dans le FormGroup de votre formulaire
    //   });

    //   // Supposons également que vous avez une variable pour contrôler l'affichage d'un modal de modification
    //   // this.showEditModal = true; // Mettre cette variable à true pour afficher le modal
    // }

    // calculateEndHour(startHour: string, duration: number): string {
    //   // Ici, vous aurez une logique pour calculer l'heure de fin basée sur l'heure de début et la durée de la session
    //   // Cet exemple est simplifié; vous devrez adapter cette logique à votre format d'heure spécifique et à la gestion du temps
    //   let [hours, minutes] = startHour.split(':').map(Number);
    //   let totalTime = hours * 60 + minutes + duration; // Convertir l'heure de début en minutes et ajouter la durée
    //   let endHours = Math.floor(totalTime / 60);
    //   let endMinutes = totalTime % 60;
    //   return `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
  }
}





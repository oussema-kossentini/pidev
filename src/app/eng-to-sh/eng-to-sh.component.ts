import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialiteService } from '../Service/specialite.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleServiceServiceService } from '../Service/schedule-service-service.service';
import { ClasseService } from '../Service/classe.service';

@Component({
  selector: 'app-eng-to-sh',
  templateUrl: './eng-to-sh.component.html',
  styleUrl: './eng-to-sh.component.scss'
})
export class EngToShComponent implements OnInit {
  dataSubmitted = false;
  registerFormCustom!: FormGroup;
  ProfList: any[] = [];
  result: any[] = [];
  hadirs: any[] = [];
  prof: any[] = [];
  id: any;
  idUser: any;
  constructor(private fb: FormBuilder,
    private scheduleServiceService: ScheduleServiceServiceService,
    private classeService: ClasseService,
    private router: Router,
    private route: ActivatedRoute) { }





  selectedTutorial: any = {}; // Utilisez un type plus spécifique si possible


  onSelect(tutorial: any): void {
    this.selectedTutorial = tutorial;


    console.log('Tutoriel sélectionné:', this.selectedTutorial);

    // Vous avez maintenant accès à both `this.selectedTutorial.idSubject` et `this.selectedTutorial.subjectName`
  }
  loadEnsignat() {
    this.classeService.getProfessorFromClass(this.id).subscribe(
      data => {
        this.ProfList = data;
        console.log(data);
      },

    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('idClasse');

    this.getidclasse();
    this.getTEST();

    this.getSchedulesByclasseId();
    this.registerFormCustom = this.fb.group({

      startDate: ['', Validators.required],
      endDate: ['', [Validators.required]],
      usersIds: ['', []],
    });



    this.classeService.getProfessorFromClass(this.id).subscribe(
      data => {
        this.ProfList = data;
        if ('idUser' in this.ProfList) {
          this.idUser = this.ProfList.idUser;
        }
        console.log(data);
      }




    );
    //this.getALL();
    this.getSchedulesByclasseId();

    const storedHadirs = localStorage.getItem(`hadirs-${this.id}`);
    if (storedHadirs) {
      this.hadirs = JSON.parse(storedHadirs);
    } else {
      this.getSchedulesByclasseId();
    }








  }




  idd: any
  getidclasse() {
    this.classeService.getById(this.id).subscribe(
      data => {
        this.result = data;
        console.log("ddddddddddddddddddddddddddddddddddddddd", data.usersIds[0])

        this.idd = data.usersIds[0];
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  }


  onSubmitsch() {
    if (this.registerFormCustom.valid) {

      const iduser = this.selectedTutorial.firstName;

      const usersIds = this.idd;

      //const subjectName = this.selectedTutorial.subjectName;
      this.dataSubmitted = true;
      this.scheduleServiceService.addShToClasse(this.registerFormCustom.value, this.id).subscribe(
        response => {
          console.log(response);
          this.hadirs.push(response);
          localStorage.setItem(`hadirs-${this.id}`, JSON.stringify(this.hadirs));

        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
  getSchedulesByclasseId(): void {

    this.classeService.getClassesByUserId(this.id)
      .subscribe({
        next: (data) => {

          this.hadirs = data; // Stockez les données reçues pour les afficher
          console.log("fffffffff", data);
          //  localStorage.setItem(`hadirs-${this.id}`, JSON.stringify(data));
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des horaires par idUser', error);
        }
      });
  }



  getTEST(): void {

    this.classeService.getProfessorFromClass(this.id)
      .subscribe({
        next: (data) => {

          this.prof = data; // Stockez les données reçues pour les afficher
          console.log("fffffffff", data);
          //  localStorage.setItem(`hadirs-${this.id}`, JSON.stringify(data));
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des horaires par idUser', error);
        }
      });
  }


  deleteSchedule(idSchedule: string): void {
    console.log("Deleting schedule with ID:", idSchedule); // Vérifiez l'identifiant
    this.scheduleServiceService.deleteSched(idSchedule).subscribe({
      next: () => {
        console.log('Schedule deleted successfully');
        // Mettre à jour la liste des horaires après la suppression
        // En retirant l'horaire supprimé du tableau local `hadirs`
        this.hadirs = this.hadirs.filter(schedule => schedule.idScheduel !== idSchedule);
        // N'oubliez pas de mettre à jour le localStorage également si nécessaire
        localStorage.setItem(`hadirs-${this.id}`, JSON.stringify(this.hadirs));
      },
      error: (error) => {
        console.error('Error deleting schedule', error);
      }
    });
  }


  // getALL(): void {
  //   this.scheduleServiceService.getAllSchedules()
  //     .subscribe(
  //       (data) => {
  //         console.log("scheduleee",data);
  //         this.hadirs = data; // assigner les données récupérées à la variable tutorials


  //         console.log("dattttttttttttttttttttttttt", this.hadirs);

  //       },
  //       (error) => {
  //         console.log(error); // gérer les erreurs éventuelles
  //       }
  //     );
  // }



}

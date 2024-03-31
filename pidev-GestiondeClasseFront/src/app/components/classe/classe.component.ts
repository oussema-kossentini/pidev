import { Component,OnInit  } from '@angular/core';
import { ClasseService } from '../../Service/classe.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialiteService } from '../../Service/specialite.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {
  specialite:any;
  specialiteid:any;
  levels: any[] = [];
  specialiteeid : any;
  titels:any[]=[];
  classeData: any = {}; // Initialisation de l'objet classeData
  idSpecialite: string = ''; // Initialisation de l'identifiant de la spécialité
  //titres: string[] = [];
  titres: Specialite[] = []; // Use the Specialite interface to type the array
  specialites:any[]=[];

  title: any[]=[];
  errorMessage: string;
  constructor(
    private classeService: ClasseService,
    private specialiteService:SpecialiteService,
    private formBuilder : FormBuilder,
    private router: Router  ,
    private route: ActivatedRoute
  
  ) {
   
    this.createForm();
    this.loadLevels();
    // this.loadSpecialite();
    this.getObjetByIds();
    this.errorMessage = ''; // Initialisation avec une chaîne vide
  }
  classeForm: FormGroup = this.formBuilder.group({
    nameClasse: [''],
    level: [''],
    universityDate: ['']
  });
  createForm() {
    this.classeForm = this.formBuilder.group({
      nameClasse: ['', [Validators.required, ]],
      level: ['', [Validators.required,]],
      universityDate: ['', [Validators.required,]]
    });
  
  }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.idSpecialite = params['id'];
    this.gettingSpecialite(this.idSpecialite);
  });
}

gettingSpecialite(idSpecialite: any): void {
  this.specialiteService.gettingSpecialite(idSpecialite).subscribe(res => {
    this.idSpecialite = res;
    this.classeForm.patchValue({
      idSpecialite: this.idSpecialite
    });
    console.log(this.idSpecialite)
  });
}


  getObjetByIds(): void {
    this.specialiteService.getAllSpecialite().subscribe({
      next: (data) => {
        this.titres = data.map((specialite) => specialite); // Assuming 'title' is the property containing the titles
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Une erreur s'est produite lors du chargement des spécialités: ${error.message}`;
        // Vous pouvez aussi envisager d'afficher cette erreur à l'utilisateur d'une manière plus conviviale
      }
    });
  }
  





  // onSubmit() {
  //   if (this.classeForm.valid) {
  //     this.classeService.addClasse(this.classeForm.value)
  //       .subscribe({
  //         next: (response) => {
  //           console.log('La classe a été créée avec succès:', response);
  //           // Handle successful response
  //           this.router.navigate(['/classe-list']);
  //         },
  //         error: (error) => {
  //           console.error('Erreur lors de la création de la classe:', error);
  //           // Handle error
  //         }
  //       });
  //   } else {
  //     console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
  //   }
  // }
  
  // onSubmit() {
  //   if (this.classeForm.valid) {
  //     this.classeService.addClasse(this.classeForm.value)
  //       .subscribe({
  //         next: (response) => {
  //           console.log('La classe a été créée avec succès:', response);
  //           // Handle successful response
  //           this.router.navigate(['/classe-list']);
  //         },
  //         error: (error) => {
  //           console.error('Erreur lors de la création de la classe:', error);
  //           // Handle error
  //         }
  //       });
  //   } else {
  //     console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
  //   }
  // }

 
  // onSubmit() {
  //   // Vérifie d'abord si le formulaire est valide
  //   if (this.classeForm.valid) {
  //     // Récupère la valeur du titre sélectionné dans le formulaire
  //     const selectedTitle: string = this.classeForm.get('titres')!.value;
  //     // Trouve la spécialité correspondante dans la liste des titres
  //     const specialite = this.titres.find(s => s.title === selectedTitle);
  
  //     // Si une spécialité correspondante est trouvée, utilise son idSpecialite; sinon, utilise null
  //     const idSpecialite = specialite ? specialite.idSpecialite : null;
  
  //     // Vérifie si idSpecialite a été trouvé
  //     if (!idSpecialite) {
  //       console.error('Impossible de trouver l\'ID pour la spécialité sélectionnée.');
  //       this.router.navigate(['/classe-list']);
  //       return; // Arrête l'exécution si aucun idSpecialite n'est trouvé
  //     }
  
  //     // Prépare les données du formulaire pour l'envoi
  //     const formData = { ...this.classeForm.value, idSpecialite };
  
  //     // Appelle le service pour ajouter la classe avec l'ID de spécialité
  //     this.classeService.addClasse(formData,idSpecialite)
  //       .subscribe(
  //         response => {
  //           console.log('Classe affectée avec succès:', response);
  //           // Redirige l'utilisateur ou effectue d'autres actions après succès
  //         },
  //         error => {
  //           console.error('Erreur lors de l\'affectation de la classe:', error);
  //         }
  //       );
  //   } else {
  //     // Affiche un message d'erreur si le formulaire est invalide
  //     console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
  //   }
  // }
  
  onSubmit() {
    console.log(this.idSpecialite);
    if (this.classeForm.valid) {

      const classeData = this.classeForm.value;
      

            // Appel de ajouterFoyerEtAffecterAUniversite avec les données du formulaire
            this.classeService.ajouterFoyerEtAffecterAUniversite(classeData, this.idSpecialite)
              .subscribe({
                next: (response) => {
                  console.log('Foyer ajouté et affecté avec succès à l\'université:', response);
                  // Handle successful response
                  // Naviguer vers la liste des classes après avoir traité les deux appels
                  this.router.navigate(['/show-classe-sp/',this.idSpecialite]);
                },
                error: (error) => {
                  console.error('Erreur lors de l\'ajout et de l\'affectation du foyer à l\'université:', error);
                  // Handle error
                }
              });



    } else {
      console.log('Le formulaire est invalide. Veuillez vérifier les champs.');
    }
  }
  
  
  
  
  

  loadLevels() {
    this.classeService.getLevel().subscribe(
      data => {
        this.levels = data;
      },
      error => console.log('Erreur lors du chargement des classes', error)
    );
  }
  // loadSpecialite() {
  //   this.specialiteService.getTitels().subscribe(
  //     data => {
  //       this.titels = data;
  //     },
  //     error => console.log('Erreur lors du chargement des classes', error)
  //   );
  // }
  notJustWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? { 'whitespace': true } : null;
    };
  }
  // Définir le validateur pour vérifier que la date n'est pas avant 2024
dateNotBefore2024(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = new Date(control.value);
    const minDate = new Date('2024-01-01');
    return inputDate < minDate ? { 'tooEarly': true } : null;
  };
}


}
  
  

// export function notJustWhitespaceValidator(): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: any} | null => {
//     const isJustWhitespace = (control.value || '').trim().length === 0;
//     return isJustWhitespace ? {'whitespace': true} : null;
//   };

// }
// Définir le validateur pour vérifier que la valeur n'est pas juste des espaces blancs

// export function dateNotBefore2024(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const inputDate = new Date(control.value);
//     if (inputDate.getFullYear() < 2024) {
//       // Return the custom validation error if the condition is met
//       return { dateNotBefore2024: true };
//     }
//     return null; // Return null if the control value passes validation
//   };
// }


interface Specialite {
  title: string;
  idSpecialite: string;
}

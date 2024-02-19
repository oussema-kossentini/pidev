import { ServiceFazzetregisterService } from './../../service/service-fazzetregister-service.service';
import { Component, AfterViewInit } from '@angular/core';
//import {Models } from '../register/register.module';
//import * as feather from 'feather-icons';
 import { OwlOptions } from 'ngx-owl-carousel-o';
 import { from } from 'rxjs';
 import { replace } from 'feather-icons';
 import zxcvbn from 'zxcvbn';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {





  ngOnInit() {

    //  feather.replace();
  }
  passwordStrength: number = 0;
  evaluatePasswordStrength(password: string) {
    const result = zxcvbn(password);
    this.passwordStrength = result.score; // score est un nombre entre 0 et 4
  }

  ngAfterViewInit() {

  }
/*


  public registerOwlOptions: OwlOptions = {
    margin: 25,
    nav: true,
    loop: true,
    responsive: {
        0: {
          items: 1
        },
        768 : {
          items: 3
        },
        1170: {
          items: 4
        }
    },
  };

*/

   // public routes = routes;

    //public passwordResponce:passwordResponce={};


    nationalities: any[]=[]; // Ajoutez cette ligne pour déclarer la propriété
    roles: any[]=[];
    imgURL : any[]=[];

    password= 'password';
    show = true;


    phoneCodes: any[];

    constructor(private serviceFazzetregisterService:ServiceFazzetregisterService ) {

      this.phoneCodes = this.serviceFazzetregisterService.getCountryCodes();
      this.loadNationalities();
      this.loadRoles();
    }

    loadNationalities() {
      this.serviceFazzetregisterService.getNationalities().subscribe(
        data => {
          this.nationalities = data;
        },
        error => console.log('Erreur lors du chargement des nationalités', error)
      );
    }

    loadRoles() {
      this.serviceFazzetregisterService.getRoles().subscribe(
        data => {
          this.roles = data;
        },
        error => console.log('Erreur lors du chargement des rôles', error)
      );
    }

   /* ngOnInit() {
      //this.loadNationalities();
      //this.loadRoles();
    }*/

    onClick() {
      if (this.password === 'password') {
        this.password = 'text';
        this.show = false;
      } else {
        this.password = 'password';
        this.show = true;
      }
    }

    public registerFormCustom = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      nationality: '',
      phone: '',
      phoneCodes:'',
      role: '',
      profilePicture: null as File | null,
    };




    typingStarted = false;

    onInputChange() {
      this.typingStarted = true;
    }
   /* onFileChange(event: Event) {
      const element = event.target as HTMLInputElement;
      const fileList: FileList | null = element.files;
      if (fileList && fileList.length > 0) {
          const file = fileList[0];

          this.registerFormCustom.profilePicture = file;
      }
  }*/

  // onFileChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     // Récupérer le fichier à partir de l'événement
  //     const file = inputElement.files[0];
  //     // Assigner le fichier à registerFormCustom.profilePicture
  //     this.registerFormCustom.profilePicture = file;
  //   }
  // }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      // Retrieve the file from the event
      const file = inputElement.files[0];

      // Assign the file to registerFormCustom.profilePicture
      this.registerFormCustom.profilePicture = file;

      // FileReader instance to read the file
      const reader = new FileReader();

      reader.onload = (loadEvent: any) => {
        // On successfully reading the file, assign its Base64 URL to imgURL
        this.imgURL = loadEvent.target.result;
      };

      // Read the file as a Data URL (Base64)
      reader.readAsDataURL(file);
    }
  }


    passwordMismatch = false;
    createUser(event: Event) {

      event.preventDefault(); // Empêche la soumission du formulaire
      event.stopPropagation(); // Empêche la propagation de l'événement

      if (this.registerFormCustom.password !== this.registerFormCustom.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }

      this.passwordMismatch = false;
      const fullPhoneNumber = `${this.registerFormCustom.phoneCodes}${this.registerFormCustom.phone}`;
      this.registerFormCustom.phone = fullPhoneNumber;

      const formData = new FormData();
     // formData.append('user', new Blob([JSON.stringify(this.registerFormCustom)], { type: 'application/json' }));
     formData.append('user', JSON.stringify(this.registerFormCustom));
      if (this.registerFormCustom.profilePicture) {
        formData.append('profilePicture', this.registerFormCustom.profilePicture);
      }
      formData.append('firstName', this.registerFormCustom.firstName || '');
      formData.append('lastName', this.registerFormCustom.lastName || '');
      formData.append('email', this.registerFormCustom.email || '');
      formData.append('password', this.registerFormCustom.password || '');
      formData.append('dateOfBirth', this.registerFormCustom.dateOfBirth || '');
      formData.append('nationality', this.registerFormCustom.nationality || '');
      formData.append('phone', this.registerFormCustom.phone || '');
      formData.append('role', this.registerFormCustom.role || '');

      // S'abonner au service dans le composant
      this.serviceFazzetregisterService.createUser(formData)
        .subscribe({
          next: (response) => {
            console.log('Utilisateur créé avec succès :', response);
            // Gestion de la réponse réussie, par exemple redirection ou affichage d'un message
         //   this.router.navigate(['/cheminVersLaListeDesUtilisateurs']);
          },
          error: (error) => {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            // Gestion de l'erreur, par exemple affichage d'un message d'erreur à l'utilisateur
          }
        });
    }


    /*
    createUser() {
      // Vérifie si les mots de passe correspondent
      if (this.registerFormCustom.password !== this.registerFormCustom.confirmPassword) {
    //    alert('Le mot de passe et la confirmation du mot de passe ne correspondent pas.');
        this.passwordMismatch=true;
        return; // Stoppe la fonction si les mots de passe ne correspondent pas
      }

      // Concaténation de l'indicatif téléphonique et du numéro de téléphone
      const fullPhoneNumber = `${this.registerFormCustom.phoneCodes}${this.registerFormCustom.phone}`;
      this.registerFormCustom.phone = fullPhoneNumber;

      // Continuez avec l'envoi des données si les mots de passe correspondent
      this.serviceFazzetregisterService.createUser(this.registerFormCustom).subscribe(
        (response) => {
          console.log('Utilisateur créé avec succès :', response);
          // Ici, vous pouvez rediriger l'utilisateur ou afficher un message de succès
        },
        (error) => {
          console.error('Erreur lors de la création de l\'utilisateur :', error);
          // Ici, vous pouvez gérer l'erreur, par exemple, en affichant un message à l'utilisateur
        }
      );
    }*/




  }






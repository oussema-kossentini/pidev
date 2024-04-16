import { ServiceFazzetregisterService } from './../../service/service-fazzetregister-service.service';
import { Component } from '@angular/core';
import { passwordResponce } from '../register/register.module';
//import * as feather from 'feather-icons';
 import { OwlOptions } from 'ngx-owl-carousel-o';
 import { from } from 'rxjs';
 import { replace } from 'feather-icons';
 import zxcvbn from 'zxcvbn';
 import { Router } from '@angular/router';
import {Role} from "./role.enum";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {





  ngOnInit() {

    //  feather.replace();
  }



  ngAfterViewInit() {

  }


  // passwordStrength: string = '';
  // warnings: string = '';
  // suggestions: string = '';

  // onChangePassword(password: string): void {
  //   const result = zxcvbn(password);
  //   this.passwordStrength = `Strength: ${result.score} / 4`;
  //   this.warnings = result.feedback.warning;
  //   this.suggestions = result.feedback.suggestions.join('. ');

  //   // Vous pouvez ajuster les messages en fonction du score pour plus de clarté
  //   switch (result.score) {
  //     case 0:
  //     case 1:
  //       this.passwordStrength += ' (Weak)';
  //       break;
  //     case 2:
  //       this.passwordStrength += ' (Fair)';
  //       break;
  //     case 3:
  //       this.passwordStrength += ' (Good)';
  //       break;
  //     case 4:
  //       this.passwordStrength += ' (Strong)';
  //       break;
  //   }
  // }





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
    onClick() {
      if (this.password === 'password') {
        this.password = 'text';
        this.show = false;
      } else {
        this.password = 'password';
        this.show = true;
      }
    }

    public passwordResponce:passwordResponce={};

    nationalities: any[]=[]; // Ajoutez cette ligne pour déclarer la propriété
    roles: any[]=[];
    imgURL : any[]=[];

    password= 'password';
    show = true;


    phoneCodes: any[];

    constructor(private serviceFazzetregisterService:ServiceFazzetregisterService,private router:Router ) {

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
      role: 'USER',
      statue:'',
      profilePicture: null as File | null,
    };



    public onChangePassword(password:string){
      if(password.match(/^$|\s+/)) {
        this.passwordResponce.passwordResponceText = "whitespaces are not allowed"
        this.passwordResponce.passwordResponceImage = ""
        this.passwordResponce.passwordResponceKey = ''
        return
      }
      if(password.length == 0){
        this.passwordResponce.passwordResponceText = ""
        this.passwordResponce.passwordResponceImage = ""
        this.passwordResponce.passwordResponceKey = ''
        return
      }
      if (password.length < 8) {
        this.passwordResponce.passwordResponceText = "Weak. Must contain at least 8 characters"
        this.passwordResponce.passwordResponceImage = "assets/img/icon/angry.svg"
        this.passwordResponce.passwordResponceKey = '0'
      } else if (password.search(/[a-z]/) < 0) {
        this.passwordResponce.passwordResponceText = "Average. Must contain at least 1 upper case and number"
        this.passwordResponce.passwordResponceImage = "assets/img/icon/anguish.svg"
        this.passwordResponce.passwordResponceKey = '1'
      } else if(password.search(/[A-Z]/) < 0) {
        this.passwordResponce.passwordResponceText = "Average. Must contain at least 1 upper case and number"
        this.passwordResponce.passwordResponceImage = "assets/img/icon/anguish.svg"
        this.passwordResponce.passwordResponceKey = '1'
      } else  if (password.search(/[0-9]/) < 0) {
        this.passwordResponce.passwordResponceText= "Average. Must contain at least 1 upper case and number"
        this.passwordResponce.passwordResponceImage = "assets/img/icon/anguish.svg"
        this.passwordResponce.passwordResponceKey = '1'
      } else  if (password.search(/(?=.*?[#?!@$%^&*-])/) < 0) {
        this.passwordResponce.passwordResponceText = "Almost. Must contain special symbol"
        this.passwordResponce.passwordResponceImage = "assets/img/icon/smile.svg"
        this.passwordResponce.passwordResponceKey = '2'
      }else {
        this.passwordResponce.passwordResponceText = "Awesome! You have a secure password."
          this.passwordResponce.passwordResponceImage = "assets/img/icon/smile.svg"
           this.passwordResponce.passwordResponceKey = '3'
       }
    }

    typingStarted = false;

    onInputChange() {
      this.typingStarted = true;
    }


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


    /*createUser(event: Event) {
      event.preventDefault(); // Prevent the default form submission behavior
      //event.stopPropagation(); // Stop the event from propagating

      if (this.registerFormCustom.password !== this.registerFormCustom.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }

      this.passwordMismatch = false;
      const fullPhoneNumber = `${this.registerFormCustom.phoneCodes}${this.registerFormCustom.phone}`;
      this.registerFormCustom.phone = fullPhoneNumber;

      const formData = new FormData();
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

      // Subscribe to the service method to create user
      this.serviceFazzetregisterService.createUser(formData)
        .subscribe({
          next: (response) => {
            console.log('User created successfully:', response);
            // Handle success response here, for example, displaying a success message
            this.router.navigate(['/evaluation']);
          },
          error: (error) => {
            console.error('Error creating user:', error);
            // Handle error, for example, displaying an error message to the user
          }
        });
    }


*/
  createUser(event: Event) {
    event.preventDefault();

    if (this.registerFormCustom.password !== this.registerFormCustom.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;
    const fullPhoneNumber = `${this.registerFormCustom.phoneCodes}${this.registerFormCustom.phone}`;
    this.registerFormCustom.phone = fullPhoneNumber;
    this.registerFormCustom.role = Role.USER;


    const formData = new FormData();
    formData.append('request', new Blob([JSON.stringify(this.registerFormCustom)], { type: "application/json" }));
    if (this.registerFormCustom.profilePicture) {
      formData.append('profilePicture', this.registerFormCustom.profilePicture);
    }


    formData.append('role', Role.USER);
    formData.append('firstName', this.registerFormCustom.firstName || '');
    formData.append('lastName', this.registerFormCustom.lastName || '');
    formData.append('email', this.registerFormCustom.email || '');
    formData.append('password', this.registerFormCustom.password || '');
    formData.append('dateOfBirth', this.registerFormCustom.dateOfBirth || '');
    formData.append('nationality', this.registerFormCustom.nationality || '');
    formData.append('phone', this.registerFormCustom.phone || '');

    // formData.append('role', Role.USER);
    // Example setting

    //formData.append('role', this.registerFormCustom.role);

    this.serviceFazzetregisterService.createUser(formData).subscribe(
      response => {
        console.log('User successfully created!', response);
        const token = response.headers.get('Authorization');
        if (token) {
          // Save the token and fetch user info
          this.serviceFazzetregisterService.saveToken(token);
          this.serviceFazzetregisterService.fetchUserInfo(token);
          this.router.navigate(['/account-settings']);
        } else {
          console.error('No token found in response headers');
          // Handle the case where the token is not present in the response
        }

        // Implement additional logic as needed
      },
      error => {
        console.error('Failed to create user', error);
      }
    );
  }

}






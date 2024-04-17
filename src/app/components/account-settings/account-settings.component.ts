import { user } from './../../models/user.model';
import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { Router } from '@angular/router';
//import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent  implements OnInit {
  userInfo :any;
  isEditMode = false;
  nationalities: any[]=[];
  imgURL : any[]=[];
  event :any;
  password= 'password';
  show = true;
  selectedFile: File | null = null;
  uploadSuccess: boolean | null = null;
  uploadMessage: string = '';
  randomColor: string = '';

  phoneCodes: any[];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public authService: ServiceFazzetregisterService,
    public router: Router,
    private cdr: ChangeDetectorRef
  ) {

    this.phoneCodes = this.authService.getCountryCodes();
    this.loadNationalities();
  }


  loadNationalities() {
    this.authService.getNationalities().subscribe(
      data => {
        this.nationalities = data;
      },
      error => console.log('Erreur lors du chargement des nationalités', error)
    );
  }

  toggleEdit() {
    this.isEditMode = !this.isEditMode;
  }
  saveChanges() {


      // Vous pouvez modifier userInfo directement si vous le souhaitez
      this.authService.modifyUserCN(this.userInfo).subscribe(
        response => {
          console.log('Update successful', response);
          const token = this.authService.getJwtToken();


          if (token != null) {
            this.authService.clearLocalStorageExceptToken();
            this.authService.fetchUserInfo(token);
            this.authService.storeUserInfo(token);

          }
          this.toggleEdit();  // Désactivez le mode édition
        },
        error => {
          console.error('Failed to update user info', error);
        }
      );



  }
  /*saveChanges() {
    // Call the backend API to save the changes
    // Then toggle the edit mode off
    console.log('Saving changes...');

      console.log('Saving changes...', this.registerFormCustom);
      // Appeler ici la méthode pour sauvegarder les données sur le serveur
      this.authService.modifyUser(this.registerFormCustom).subscribe(
        response => {
          console.log('Update successful', response);
          this.toggleEdit(); // Désactiver le mode édition après la sauvegarde
        },
        error => {
          console.error('Failed to update user info', error);
        }
      );
    this.isEditMode = false;
  }*/
  formatDate(date: string): string {
    if (!date) {
      return '';
    }


    // Create a new Date object using the ISO string
    const newDate = new Date(date);

    // Convert the Date object to a YYYY-MM-DD string
    const year = newDate.getFullYear();
    const month = ('0' + (newDate.getMonth() + 1)).slice(-2); // getMonth() is zero-based, add leading zero
    const day = ('0' + newDate.getDate()).slice(-2); // getDate() returns the day of month, add leading zero

    return `${year}-${month}-${day}`;
  }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
     // this.authService.fetchUserInfoPeriodically()
      const tkt = this.authService.getJwtToken();
      if(tkt !=null) {
        this.authService.fetchUserInfo(tkt).subscribe();

      }
      this.authService.userInfo$.subscribe(data => {
        this.userInfo = data;
        this.userInfo.dateOfBirth = this.formatDate(this.userInfo.dateOfBirth);
        //  this.extractCountryCode();
        this.cdr.markForCheck();
        this.randomColor = this.getRandomColor();

      });
    }
  }
  /* ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
       this.authService.userInfo$.subscribe(data => {
        this.userInfo = data;
       this.registerFormCustom = { ...this.registerFormCustom, ...data };
         this.userInfo.dateOfBirth = this.formatDate(this.userInfo.dateOfBirth);

         this.extractCountryCode();
         this.cdr.markForCheck();



         // Assurez-vous que cette ligne est dans le subscribe pour être exécutée après la réception des données.
       });
       this.randomColor = this.getRandomColor();
     }
   }*/
  onFileSelect(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0] as File; // Directly cast here to avoid null in the next steps

      this.selectedFile = file; // We've already checked this is non-null

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userInfo.profilePicture = e.target.result;  // Update the preview immediately
      };

      // Since we have directly assigned and checked for non-null, we safely pass it to readAsDataURL
      reader.readAsDataURL(file);
    }
  }




  //awel etape
  //temchi li componnenet mtaak
  // tzid appel lel service mtaai fi constructeurru



  saveImage(): void {
    const token = this.authService.getJwtToken();
    if (!token) {
      this.uploadSuccess = false;
      this.uploadMessage = 'Authentication token is missing or expired. Please log in again.';
      console.error(this.uploadMessage);
      return;
    }
    if (this.selectedFile) {
      this.authService.updateProfilePicture(this.selectedFile,token).subscribe(
        response => {
          console.log('Upload successful', response);
          this.uploadSuccess = true;
          this.uploadMessage = 'Image has been successfully updated.';
          this.selectedFile = null;
        },
        error => {
          console.error('Error uploading the image', error);
          this.uploadSuccess = false;
          this.uploadMessage = 'Failed to update the image.';
        }
      );
    } else {
      this.uploadSuccess = false;
      this.uploadMessage = 'Please select an image first.';
    }
  }
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  getInitials(firstName: string, lastName: string): string {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    return '';
  }


  /* ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
//this.userInfo = this.authService.getUserInfo();
this.authService.userInfo$.subscribe(data => {
 this.userInfo = data;
});
this.userInfo.dateOfBirth = this.formatDate(this.userInfo.dateOfBirth);
console.log("Formatted date of birth is : ", this.userInfo.dateOfBirth);
this.extractCountryCode();
this.cdr.markForCheck();

 }
}
*/

  onTabChange(event: any) {
    const activeTab = event.target; // L'onglet actif
    console.log(activeTab.id + ' tab selected.');
    // Vous pouvez ici ajouter d'autres logiques, comme charger des données spécifiques à l'onglet
  }

  selectedCountryCode: string = '';
  extractCountryCode() {
    const phone = this.userInfo.phone;
    if (!phone) {
      return; // Handle empty phone number gracefully
    }

    // Regular expression to match most common phone number formats
    const regex = /^\+?([0-9]{1,3})\)?[-.\s]?(.*)$/;
    const match = phone.match(regex);

    if (match) {
      this.selectedCountryCode = match[1]; // Country code is the first captured group
    } else {
      console.warn('Invalid phone number format. Country code could not be extracted.');
    }
  }

}

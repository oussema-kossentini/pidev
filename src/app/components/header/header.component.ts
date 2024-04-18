import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { Router } from '@angular/router';
//import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {SpecialiteService} from "../../service/specialite.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
//fff
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;
  isTeacher: boolean = false;
  isStudent: boolean = false;
  isUser: boolean = false;
  userInfo: any;
 // currentUserFirstName: string = '';
  //currentUserLastName: string = '';
  //currentUserFullName: string = '';

  //constructor(public authService: ServiceFazzetregisterService, public router: Router) {}
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public authService: ServiceFazzetregisterService,
    public router: Router,
    private specialiteService: SpecialiteService,
    private cdr: ChangeDetectorRef
  ) {

    this.authService.verifyUserRole();

// this.isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
// this.isTeacher=JSON.parse(localStorage.getItem('isTeacher') || 'false');
// this.isStudent=JSON.parse(localStorage.getItem('isStudent') || 'false');
// this.isUser=JSON.parse(localStorage.getItem('isUser') || 'false');

    // S'abonner au statut isAdmin pour les mises à jour
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;

      if (isAdmin) {
        console.log(`Received isAdmin status: true`);
      } else {
        console.log(`Received isAdmin status: false`);
      }
    })};


/*localStorage.getItem('role',adminstrateur)

localStorage.setItem('rolesASAdmin', response.token);

if localStorage.getItem(role) = adminstrateur

console.log(`Received isAdmin status: ${isAdmin}`);
isAdmin  =true



logique token decode el role ou testokih fi local storage apres

 x=local storage.get item

if x = admin

then
console.log(`Received isAdmin status: true`);

is admin true

if x = professeru

isproffeseur = true*/









    ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {

        this.isAdmin = JSON.parse(localStorage.getItem('isAdmin') || 'false');
this.isTeacher=JSON.parse(localStorage.getItem('isTeacher') || 'false');
this.isStudent=JSON.parse(localStorage.getItem('isStudent') || 'false');
this.isUser=JSON.parse(localStorage.getItem('isUser') || 'false');
        if (typeof localStorage !== 'undefined') {
          // Appel de la méthode updateRoleStatus pour mettre à jour les rôles
          this.authService.updateRoleStatus();

          // Abonnez-vous à isAdmin$ après avoir mis à jour le statut isAdmin
          this.authService.isAdmin$.subscribe(isAdmin => {
            this.isAdmin = isAdmin;
            console.log(`Received isAdmin status: ${isAdmin}`);

          });
        } else {
          console.error('localStorage is not available');
        }
        // Autres souscriptions et logique d'initialisation ici



 // Obtenez les informations utilisateur du service
//  this.authService.currentUserFirstName$.subscribe(firstName => {
//   this.authService.currentUserLastName$.subscribe(lastName => {
//     this.currentUserFullName = `${firstName} ${lastName}`;
//   });
// });

this.userInfo = this.authService.getUserInfo();

  }
}

  logout() {
    this.authService.logoutUser().subscribe(
      () => {
        // Navigation vers la page de connexion après une déconnexion réussie
        console.log("Déconnexion réussie.");
 // Réinitialiser l'état dans localStorage
 localStorage.removeItem('token');
 localStorage.removeItem('roles');
localStorage.removeItem('firstName');
localStorage.removeItem('lastName');
 // Réinitialiser l'état local du composant
 this.resetLocalState();


        this.router.navigate(['/login']);
      },
      error => {
        console.error("Erreur lors de la déconnexion", error);
      }
    );
  }



  private resetLocalState() {
    this.isAdmin = false;
    this.isTeacher = false;
    this.isStudent = false;
    this.isUser = false;
    // this.currentUserFirstName = '';
    // this.currentUserLastName = '';
    // this.currentUserFullName = '';

    // Informer le service d'authentification de réinitialiser son état également
    this.authService.resetState();
  }

  redirectToAddCours() {
    this.router.navigate(['/addCours']);
  }
  redirectToCoursList() {
    this.router.navigate(['/coursDetails']);
  }
  redirectToCoursEtudientList() {
    this.router.navigate(['/coursEtudient']);
  }



  redirectToSpecialte() {
    this.router.navigate(['/specialite']);
  }
  redirectToListSpecialte() {
    this.router.navigate(['/list-specialite']);
  }
  redirectTonavSpecialite() {
    this.router.navigate(['/specialitenavetudiant']);
  }
  redirectToProfnav() {
    this.router.navigate(['/profnav']);
  }




  redirectToScheduel() {
    this.router.navigate(['/schedule']);
  }
  redirectToProf() {
    this.router.navigate(['/EMPLOIT']);
  }
  redirectToclasse() {
    this.router.navigate(['/Finalclass']);
  }
}

import { user } from './../models/user.model';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap, catchError,map } from 'rxjs/operators';
import { interval, of, throwError } from 'rxjs';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import * as CryptoJS from 'crypto-js';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';

import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

//let jwt_decode = await import('jwt-decode');
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { UserInfoResponse } from '../models/UserInfoResponse ';

@Injectable({
  providedIn: 'root'
})
export class ServiceFazzetregisterService {

  // constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient,private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token) {
        this.retrieveUserData();
        // Optionnel : Validation du token côté serveur ici
        this.updateIsAdminStatus();
         // Initialise l'état isAdmin basé sur le token
     //   this.clearLocalStorageExceptToken();
       //  this.fetchUserInfoPeriodically();
        }

    }


  }

  private readonly TOKEN_KEY = 'token';

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem(this.TOKEN_KEY);
    }
    return false;
  }

getCountryCodes(): any[] {
    return [
        // Afrique
        { name: 'Algérie', code: '+213' },
        { name: 'Angola', code: '+244' },
        { name: 'Bénin', code: '+229' },
        { name: 'Botswana', code: '+267' },
        { name: 'Burkina Faso', code: '+226' },
        { name: 'Burundi', code: '+257' },
        { name: 'Cameroun', code: '+237' },
        { name: 'Cap-Vert', code: '+238' },
        { name: 'République centrafricaine', code: '+236' },
        { name: 'Tchad', code: '+235' },
        { name: 'Comores', code: '+269' },
        { name: 'Congo', code: '+242' },
        { name: "Côte d'Ivoire", code: '+225' },
        { name: 'Djibouti', code: '+253' },
        { name: 'Égypte', code: '+20' },
        { name: 'Guinée équatoriale', code: '+240' },
        { name: 'Érythrée', code: '+291' },
        { name: 'Éthiopie', code: '+251' },
        { name: 'Gabon', code: '+241' },
        { name: 'Gambie', code: '+220' },
        { name: 'Ghana', code: '+233' },
        { name: 'Guinée', code: '+224' },
        { name: 'Guinée-Bissau', code: '+245' },
        { name: 'Kenya', code: '+254' },
        { name: 'Lesotho', code: '+266' },
        { name: 'Liberia', code: '+231' },
        { name: 'Libye', code: '+218' },
        { name: 'Madagascar', code: '+261' },
        { name: 'Malawi', code: '+265' },
        { name: 'Mali', code: '+223' },
        { name: 'Maroc', code: '+212' },
        { name: 'Mauritanie', code: '+222' },
        { name: 'Maurice', code: '+230' },
        { name: 'Mozambique', code: '+258' },
        { name: 'Namibie', code: '+264' },
        { name: 'Niger', code: '+227' },
        { name: 'Nigeria', code: '+234' },
        { name: 'Rwanda', code: '+250' },
        { name: 'Sao Tomé-et-Principe', code: '+239' },
        { name: 'Sénégal', code: '+221' },
        { name: 'Seychelles', code: '+248' },
        { name: 'Sierra Leone', code: '+232' },
        { name: 'Somalie', code: '+252' },
        { name: 'Afrique du Sud', code: '+27' },
        { name: 'Soudan du Sud', code: '+211' },
        { name: 'Soudan', code: '+249' },
        { name: 'Swaziland', code: '+268' },
        { name: 'Tanzanie', code: '+255' },
        { name: 'Togo', code: '+228' },
        { name: 'Tunisie', code: '+216' },
        { name: 'Ouganda', code: '+256' },
        { name: 'Zambie', code: '+260' },
        { name: 'Zimbabwe', code: '+263' },
        // Amérique
        { name: 'Antigua-et-Barbuda', code: '+1-268' },
        { name: 'Argentine', code: '+54' },
        { name: 'Bahamas', code: '+1-242' },
        { name: 'Barbade', code: '+1-246' },
        { name: 'Belize', code: '+501' },
        { name: 'Bolivie', code: '+591' },
        { name: 'Brésil', code: '+55' },
        { name: 'Canada', code: '+1' },
        { name: 'Chili', code: '+56' },
        { name: 'Colombie', code: '+57' },
        { name: 'Costa Rica', code: '+506' },
        { name: 'Cuba', code: '+53' },
        { name: 'République dominicaine', code: '+1-809' },
        { name: 'Équateur', code: '+593' },
        { name: 'El Salvador', code: '+503' },
        { name: 'Grenade', code: '+1-473' },
        { name: 'Guatemala', code: '+502' },
        { name: 'Guyana', code: '+592' },
        { name: 'Haïti', code: '+509' },
        { name: 'Honduras', code: '+504' },
        { name: 'Jamaïque', code: '+1-876' },
        { name: 'Mexique', code: '+52' },
        { name: 'Nicaragua', code: '+505' },
        { name: 'Panama', code: '+507' },
        { name: 'Paraguay', code: '+595' },
        { name: 'Pérou', code: '+51' },
        { name: 'Saint-Kitts-et-Nevis', code: '+1-869' },
        { name: 'Sainte-Lucie', code: '+1-758' },
        { name: 'Saint-Vincent-et-les Grenadines', code: '+1-784' },
        { name: 'Suriname', code: '+597' },
        { name: 'Trinité-et-Tobago', code: '+1-868' },
        { name: 'Uruguay', code: '+598' },
        { name: 'Venezuela', code: '+58' },
        // Asie
        { name: 'Afghanistan', code: '+93' },
        { name: 'Arménie', code: '+374' },
        { name: 'Azerbaïdjan', code: '+994' },
        { name: 'Bahreïn', code: '+973' },
        { name: 'Bangladesh', code: '+880' },
        { name: 'Bhoutan', code: '+975' },
        { name: 'Brunei', code: '+673' },
        { name: 'Birmanie', code: '+95' },
        { name: 'Cambodge', code: '+855' },
        { name: 'Chine', code: '+86' },
        { name: 'Corée du Nord', code: '+850' },
        { name: 'Corée du Sud', code: '+82' },
        { name: 'Émirats arabes unis', code: '+971' },
        { name: 'Géorgie', code: '+995' },
        { name: 'Inde', code: '+91' },
        { name: 'Indonésie', code: '+62' },
        { name: 'Irak', code: '+964' },
        { name: 'Iran', code: '+98' },
        { name: 'Israël', code: '+972' },
        { name: 'Japon', code: '+81' },
        { name: 'Jordanie', code: '+962' },
        { name: 'Kazakhstan', code: '+7' },
        { name: 'Kirghizistan', code: '+996' },
        { name: 'Koweït', code: '+965' },
        { name: 'Laos', code: '+856' },
        { name: 'Liban', code: '+961' },
        { name: 'Malaisie', code: '+60' },
        { name: 'Maldives', code: '+960' },
        { name: 'Mongolie', code: '+976' },
        { name: 'Népal', code: '+977' },
        { name: 'Oman', code: '+968' },
        { name: 'Ouzbékistan', code: '+998' },
        { name: 'Pakistan', code: '+92' },
        { name: 'Philippines', code: '+63' },
        { name: 'Qatar', code: '+974' },
        { name: 'Sri Lanka', code: '+94' },
        { name: 'Syrie', code: '+963' },
        { name: 'Tadjikistan', code: '+992' },
        { name: 'Taïwan', code: '+886' },
        { name: 'Thaïlande', code: '+66' },
        { name: 'Timor oriental', code: '+670' },
        { name: 'Turkménistan', code: '+993' },
        { name: 'Turquie', code: '+90' },
        { name: 'Viêt Nam', code: '+84' },
        { name: 'Yémen', code: '+967' },
        // Europe
        { name: 'Albanie', code: '+355' },
        { name: 'Andorre', code: '+376' },
        { name: 'Autriche', code: '+43' },
        { name: 'Biélorussie', code: '+375' },
        { name: 'Belgique', code: '+32' },
        { name: 'Bosnie-Herzégovine', code: '+387' },
        { name: 'Royaume-Uni', code: '+44' },
        { name: 'Bulgarie', code: '+359' },
        { name: 'Croatie', code: '+385' },
        { name: 'Chypre', code: '+357' },
        { name: 'République tchèque', code: '+420' },
        { name: 'Danemark', code: '+45' },
        { name: 'Estonie', code: '+372' },
        { name: 'Finlande', code: '+358' },
        { name: 'France', code: '+33' },
        { name: 'Allemagne', code: '+49' },
        { name: 'Grèce', code: '+30' },
        { name: 'Hongrie', code: '+36' },
        { name: 'Islande', code: '+354' },
        { name: 'Irlande', code: '+353' },
        { name: 'Italie', code: '+39' },
        { name: 'Kosovo', code: '+383' },
        { name: 'Lettonie', code: '+371' },
        { name: 'Liechtenstein', code: '+423' },
        { name: 'Lituanie', code: '+370' },
        { name: 'Luxembourg', code: '+352' },
        { name: 'Macédoine du Nord', code: '+389' },
        { name: 'Malte', code: '+356' },
        { name: 'Moldavie', code: '+373' },
        { name: 'Monaco', code: '+377' },
        { name: 'Monténégro', code: '+382' },
        { name: 'Pays-Bas', code: '+31' },
        { name: 'Norvège', code: '+47' },
        { name: 'Pologne', code: '+48' },
        { name: 'Portugal', code: '+351' },
        { name: 'Roumanie', code: '+40' },
        { name: 'Russie', code: '+7' },
        { name: 'Saint-Marin', code: '+378' },
        { name: 'Serbie', code: '+381' },
        { name: 'Slovaquie', code: '+421' },
        { name: 'Slovénie', code: '+386' },
        { name: 'Espagne', code: '+34' },
        { name: 'Suède', code: '+46' },
        { name: 'Suisse', code: '+41' },
        { name: 'Ukraine', code: '+380' },
        { name: 'Vatican', code: '+379' }
    ];
}

getProtectedData(url: string, jwtToken: string) {
  const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    })
  };

  return this.http.get(url, httpOptions);
}




    private baseUrl = 'http://localhost:8085/courszello/api/users'; // Ajustez selon votre configuration
    //private apiAddUser = 'http://localhost:8085/courszello/api/users/add';
  private apiAddUser = 'http://localhost:8085/courszello/api/auth/register';

    private seconnecterurl='http://localhost:8085/courszello/api/auth/authenticate'
private jwtbaseurl='http://localhost:8085/courszello/api/auth';
private getuserinfo ='http://localhost:8085/courszello/api/auth/userinfo/{idUser}'
    getRoles(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/roles`);
    }

    getNationalities(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/nationalities`);
    }
  /*  createUser(formData :FormData): Observable<any> {

      return this.http.post(this.apiAddUser, formData).pipe(
        tap((response: any) => {
          localStorage.setItem('authToken', response.token); // Store the token
          this.updateUserStatus('ONLINE').subscribe();
        })
      );
    }*/



  createUser(formData: FormData): Observable<any> {
    return this.http.post(this.apiAddUser, formData).pipe(
      tap((response: any) => {

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);}
        const decodedToken = this.decodeJwt(response.token);
        const roles = decodedToken.roles || [];
        // Autres traitements nécessaires avec le token
      }),
      switchMap(response => {
        // Ici, vous utilisez switchMap pour continuer avec la récupération des informations de l'utilisateur
        return this.fetchUserInfo(response.token).pipe(
          tap(userInfo => {
            if (isPlatformBrowser(this.platformId)) {

              this.storeUserInfo(userInfo);  // Stockage des informations de l'utilisateur

              const decodedToken = this.decodeJwt(response.token);
              const roles = decodedToken.roles || [];
              localStorage.setItem('roles', JSON.stringify(roles));
              this.updateUserRoleState(roles);
            } }),
          catchError(error => {
            console.error('Failed to fetch user info', error);
            return of(null);  // Gérer l'erreur éventuellement autrement
          })
        );
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null);  // Gérer l'erreur de connexion
      })
    );
  }
  siginWithGoogle(email:String):Observable<any>{
    return this.http.post("http://localhost:8085/courszello/api/auth/authenticateGoogle",{email}).pipe(
      tap((response: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);}
        const decodedToken = this.decodeJwt(response.token);
        const roles = decodedToken.roles || [];
        // Autres traitements nécessaires avec le token
      }),
      switchMap(response => {
        // Ici, vous utilisez switchMap pour continuer avec la récupération des informations de l'utilisateur
        return this.fetchUserInfo(response.token).pipe(
          tap(userInfo => {
            if (isPlatformBrowser(this.platformId)) {
              this.storeUserInfo(userInfo);  // Stockage des informations de l'utilisateur

              const decodedToken = this.decodeJwt(response.token);
              const roles = decodedToken.roles || [];
              localStorage.setItem('roles', JSON.stringify(roles));
              this.updateUserRoleState(roles);
            } }),
          catchError(error => {
            console.error('Failed to fetch user info', error);
            return of(null);  // Gérer l'erreur éventuellement autrement
          })
        );
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(null);  // Gérer l'erreur de connexion
      })
    );

  }
  /*



  createUser(formData: FormData): Observable<any> {
    return this.http.post(this.apiAddUser, formData).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token); // Store the token
        // Optional: Update user status after registration
        this.updateUserStatus('ONLINE').subscribe();
      })
    );
  }
  */

     addTokenToHeaders(headers: HttpHeaders = new HttpHeaders()): HttpHeaders {
      const token = this.getJwtToken();
      if (token) {
        return headers.append('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
    public updateRoleStatus(): void {
      const token = this.getJwtToken();
      if (!token) {
        this.clearRoleStatus();
        return;
      }

      try {
        const decoded: any = this.decodeJwt(token); // Assurez-vous d'ajuster le typage ici
        const roles = decoded.roles || [];
        localStorage.setItem('isAdmin', String(roles.includes('ADMINISTRATOR')));
        localStorage.setItem('isUser', String(roles.includes('USER')));
        localStorage.setItem('isTeacher', String(roles.includes('TEACHER')));
        localStorage.setItem('isStudent', String(roles.includes('STUDENT')));
      } catch (error) {
        console.error('Error decoding token:', error);
        this.clearRoleStatus();
      }
    }

     decodeJwt(token: string): any {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }
    saveToken(token: string): void {
      if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);}
    }





    // Dans votre service d'authentification


    //lougout mdarha cote client barak
/*logoutUser(): void {


  this.removeToken(); // ou toute autre logique de déconnexion
  this.isAdminSubject.next(false); // Met à jour l'état d'administration


}
*/

/*
logoutUser(): Observable<any> {
  const token = this.getJwtToken();
  if (!token) {
    console.error("No JWT token found. Unable to logout.");
    // Retourne un observable qui échoue, pour rester cohérent avec la signature de la méthode
    return throwError(() => new Error('No JWT token found'));
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` // Inclut correctement le token ici
  });

  //mettre ajoour le etat de user

  // Enlève immédiatement le token du stockage pour éviter des utilisations non autorisées
  this.removeToken();
  this.isAdminSubject.next(false); // Met à jour l'état d'administration

  // Retourne l'Observable de la requête HTTP, permettant ainsi son utilisation avec .subscribe()
  return this.http.post(`${this.jwtbaseurl}/logout`, {}, { headers: headers ,responseType: 'text' });
}
*/

logoutUser(): Observable<any> {
  // Exemple d'implémentation
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.getJwtToken()}`
  });

  // Supprime le token du stockage local et met à jour l'état de connexion
  this.removeToken();
  this.clearRoleStatus();
  this.isAdminSubject.next(false);
  // Si vous avez besoin de notifier le serveur de la déconnexion, faites-le ici
  return this.http.post(`${this.jwtbaseurl}/logout`, {}, { headers }).pipe(
    tap(() => {
      // Mettre à jour l'état de connexion
      this.isLoggedInSubject.next(false);

      //this.isAdminSubject.next(false);
      // Supprimer le token du stockage
      this.removeToken();
      localStorage.clear();
      // Rediriger vers la page de connexion ou effectuer d'autres actions
    }),
    catchError(error => {
      console.error("Error during logout:", error);
      return throwError(() => new Error('Error during logout'));
    })
  );
}
//5  mn hia 300000
  verifyUserRole(): void {
    interval(300000) // Toutes les 5 minutes
      .pipe(
        switchMap(() => this.http.get(`${this.jwtbaseurl}/roleuser`, {
          headers: new HttpHeaders({
            'Authorization': `Bearer ${this.getJwtToken()}`
          })
        })),
        catchError(error => {
          console.error("Error retrieving user role:", error);
          return throwError(() => new Error('Error retrieving user role'));
        })
      )
      .subscribe({
        next: (roleData: any) => {
          const localRole = localStorage.getItem('roles');
          if (roleData.role !== localRole) {
            this.logoutUser().subscribe();
          }
        },
        error: (error) => console.error('Error in role verification:', error)
      });
  }
/*
logoutUser(): Observable<any> {
  const token = this.getJwtToken();
  if (!token) {
    console.error("No JWT token found. Unable to logout.");
    return throwError(() => new Error('No JWT token found'));
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Premièrement, mettez à jour le statut de l'utilisateur à 'OFFLINE'
  return this.updateUserStatus('OFFLINE').pipe(
    // Utilisez switchMap pour enchaîner la requête de déconnexion après la mise à jour réussie du statut
    switchMap(() => {
      // Enlève le token du stockage pour éviter des utilisations non autorisées
      this.removeToken();
      this.isAdminSubject.next(false); // Met à jour l'état d'administration

      // Effectue la requête de déconnexion
      return this.http.post(`${this.jwtbaseurl}/logout`, {}, { headers: headers, responseType: 'text' });
    }),
    catchError(error => {
      // Gestion des erreurs, si nécessaire
      console.error("Error during logout:", error);
      return throwError(() => new Error('Error during logout'));
    })
  );
}*/

    // Vérifier si l'utilisateur est connecté
   /* isLoggedIn(): boolean {
      return !!this.getJwtToken();
    }*/

    public isLoggedInAndJwtValid(jwtToken: string): Observable<boolean> {
      // Supposez que vous avez configuré votre backend pour valider le JWT et retourner un booléen
      return this.http.get<boolean>(`${this.jwtbaseurl}/is-logged-in`, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${jwtToken}`
        })
      }).pipe(
        map(isValid => {
          this.isLoggedInSubject.next(isValid);
          return isValid;
        }),
        catchError(error => {
          this.isLoggedInSubject.next(false);
          return of(false);
        })
      );
    }



    isLoggedIn(): boolean {
      return !!this.getJwtToken();
    }

     // Supprimer le token JWT
     removeToken(): void {
      localStorage.removeItem(this.TOKEN_KEY);
     // this.isLoggedInSubject.next(false);
    }

  /*  public async isLoggedIn(): Promise<boolean> {
      const jwtToken = this.getJwtToken();

      if (!jwtToken) {
        return false;
      }

      try {
        // Await the result of the isLoggedInAndJwtValid call
        const isValid = await this.isLoggedInAndJwtValid(jwtToken).toPromise();
        return isValid;
      } catch (error) {
        console.error('Error checking login status:', error);
        return false; // Or potentially handle the error differently
      }
    }*/


    // Utilisation de la fonction decodeJwt dans isAdmin
    isAdminn(): boolean {
      const token = this.getJwtToken();
      if (!token) return false;

      try {
        const decoded = this.decodeJwt(token);
        return decoded && decoded.roles && decoded.roles.includes('ADMINISTRATOR');
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
    private clearRoleStatus(): void {
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isUser');
      localStorage.removeItem('isTeacher');
      localStorage.removeItem('isStudent');
    }

    // public get isAdmin(): boolean {
    //   return JSON.parse(localStorage.getItem('isAdmin') || 'false');
    // }

    // public get isUser(): boolean {
    //   return JSON.parse(localStorage.getItem('isUser') || 'false');
    // }

    // public get isTeacher(): boolean {
    //   return JSON.parse(localStorage.getItem('isTeacher') || 'false');
    // }

    // public get isStudent(): boolean {
    //   return JSON.parse(localStorage.getItem('isStudent') || 'false');
    // }

   /* isTeacher(): boolean {
      const token = this.getJwtToken();
      if (!token) return false;

      try {
        const decoded = this.decodeJwt(token);
        return decoded && decoded.roles && decoded.roles.includes('PROFESSOR');
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }*/

  /*  isTeacher(): boolean {
      const token = this.getJwtToken();

      // Handle missing token gracefully
      if (!token) {
        return false;
      }

      try {
        const decoded = this.decodeJwt(token);

        // Ensure decoded object and roles array exist before access
        if (decoded && decoded.roles && decoded.roles.includes('PROFESSOR')) {
          localStorage.setItem('isTeacher', 'true');
          return true;
        } else {
          localStorage.removeItem('isTeacher'); // Clear if not a student
          return false;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }

    */

  /*  isStudent(): boolean {
      const token = this.getJwtToken();

      // Handle missing token gracefully
      if (!token) {
        return false;
      }

      try {
        const decoded = this.decodeJwt(token);

        // Ensure decoded object and roles array exist before access
        if (decoded && decoded.roles && decoded.roles.includes('STUDENT')) {
          localStorage.setItem('isStudent', 'true');
          return true;
        } else {
          localStorage.removeItem('isStudent'); // Clear if not a student
          return false;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }

    */
   /* isUser(): boolean {
      const token = this.getJwtToken();

      // Handle missing token gracefully
      if (!token) {
        return false;
      }

      try {
        const decoded = this.decodeJwt(token);

        // Ensure decoded object and roles array exist before access
        if (decoded && decoded.roles && decoded.roles.includes('USER')) {
          localStorage.setItem('isUser', 'true');
          return true;
        } else {
          localStorage.removeItem('isUser'); // Clear if not a student
          return false;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }*/


   /* isStudent(): boolean {
      const token = this.getJwtToken();
      if (!token) return false;

      try {
        const decoded = this.decodeJwt(token);
        return decoded && decoded.roles && decoded.roles.includes('STUDENT')
        localStorage.setItem('isStudent', true);

                   ;
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }*/

   /* isUser(): boolean {
      const token = this.getJwtToken();
      if (!token) return false;

      try {
        const decoded = this.decodeJwt(token);
        return decoded && decoded.roles && decoded.roles.includes('USER');
      } catch (error) {
        console.error('Error decoding token:', error);
        return false;
      }
    }
*/




////// el fouk decodi el role men jwt



   /* login(email: string, password: string): Observable<any> {
      return this.http.post(`${this.jwtbaseurl}/authenticate`, {email, password});
    }*/

   /* login(email: string, password: string): Observable<any> {
      return this.http.post(`${this.jwtbaseurl}/authenticate`, {email, password}).pipe(
        tap((response: any) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            this.updateIsAdminStatus(); // Mettre à jour le statut d'administrateur
          //  this.isStudent();
            //this.isTeacher();
            //this.isUser();
          }
        })
      );
    }


    */
    private currentUserFirstName = new BehaviorSubject<string>('');
    private currentUserLastName = new BehaviorSubject<string>('');
    private currentUserEmail = new BehaviorSubject<string>('');

    // Observable pour accéder au prénom et nom de l'extérieur
    public currentUserFirstName$ = this.currentUserFirstName.asObservable();
    public currentUserLastName$ = this.currentUserLastName.asObservable();
    public currentUserEmail$ = this.currentUserEmail.asObservable();



 //  private encryptionKey = '7abf56c4d22af9e9fbf3faafe69c9e65';
///
public updateUserData(firstName: string, lastName: string, email: string): void {
  // Mettre à jour les sujets observables
  this.currentUserFirstName.next(firstName);
  this.currentUserLastName.next(lastName);
  this.currentUserEmail.next(email);

 // Store the data directly in localStorage
 localStorage.setItem('userData', `${firstName},${lastName},${email}`);
}

retrieveUserData(): void {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const userDataArray = userData.split(',');
    if (userDataArray.length === 3) {
      const [firstName, lastName, email] = userDataArray;
      this.updateUserData(firstName, lastName, email);
    } else {
      console.error('Invalid format of user data in localStorage');
    }
  } else {
    console.debug('No user data found in localStorage');
  }
}
// Méthode pour récupérer les données utilisateur du localStorage
/*retrieveUserDataEN(): void {
  const encryptedData = localStorage.getItem('userData');
  if (encryptedData) {
    try {
      const decryptedDataArray = this.decryptUserData(encryptedData);
      if (decryptedDataArray && decryptedDataArray.length > 0) {
        const decryptedData = decryptedDataArray[0];
        const userDataArray = decryptedData.split(',');
        if (userDataArray.length === 3) {
          const [firstName, lastName, email] = userDataArray;
          this.updateUserData(firstName, lastName, email);
        } else {
          console.error('Invalid format of decrypted data');
        }
      }
    } catch (error) {
      console.error('Error decrypting user data:', error);
    }
  } else {
    console.debug('No user data found in localStorage');
  }
}


// Méthode pour chiffrer les données utilisateur
private encryptUserData(firstName: string, lastName: string, email: string): string {
  const dataToEncrypt = `${firstName},${lastName},${email}`;
  return CryptoJS.AES.encrypt(dataToEncrypt, this.encryptionKey).toString();
}

// Méthode pour déchiffrer les données utilisateur
private decryptUserData(encryptedData: string): string[] | null {
  const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData.split(',');
}

*/

///

public get isAdmin(): boolean {
  return JSON.parse(localStorage.getItem('isAdmin') || 'false');
}

public get isUser(): boolean {
  return JSON.parse(localStorage.getItem('isUser') || 'false');
}

public get isTeacher(): boolean {
  return JSON.parse(localStorage.getItem('isTeacher') || 'false');
}

public get isStudent(): boolean {
  return JSON.parse(localStorage.getItem('isStudent') || 'false');
}


    private isAdminSource = new BehaviorSubject<boolean>(false);
    private isTeacherSource = new BehaviorSubject<boolean>(false);
    private isStudentSource = new BehaviorSubject<boolean>(false);
    private isUserSource = new BehaviorSubject<boolean>(false);

    // Expose les observables pour chaque rôle
    isAdmin$ = this.isAdminSource.asObservable();
    isTeacher$ = this.isTeacherSource.asObservable();
    isStudent$ = this.isStudentSource.asObservable();
    isUser$ = this.isUserSource.asObservable();

    resetState() {
      this.isAdminSource.next(false);
      this.isTeacherSource.next(false);
      this.isStudentSource.next(false);
      this.isUserSource.next(false);

      // Vous pouvez également réinitialiser d'autres états ici, comme les informations de l'utilisateur
    }


    updateUserRoleState(roles: string[]): void {
      // Met à jour chaque BehaviorSubject en fonction de la présence du rôle dans le tableau des rôles
      this.isAdminSource.next(roles.includes('ADMINISTRATOR'));
      this.isTeacherSource.next(roles.includes('TEACHER'));
      this.isStudentSource.next(roles.includes('STUDENT'));
      this.isUserSource.next(roles.includes('USER'));
      localStorage.setItem('roles', JSON.stringify(roles));

      // Log roles using console.debug for less intrusive logging (optional)
      console.debug('Updated user roles:', roles);
    }

    //tedem ama men response
   /* getUserInfo() {
      return {
        firstName: localStorage.getItem('firstName'),
        lastName: localStorage.getItem('lastName'),
        email : localStorage.getItem('email'),
        idUser :localStorage.getItem('idUser')


      };}*/
//mel response
//period mech dima ijiyou les donner a jour
private userInfoSource = new BehaviorSubject<any>(this.loadInitialData());
  public userInfo$ = this.userInfoSource.asObservable();

  private loadInitialData() {
    return {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      dateOfBirth: localStorage.getItem('dateOfBirth'),
      nationality: localStorage.getItem('nationality'),
      phone: localStorage.getItem('phone'),
      profilePicture: localStorage.getItem('profilePicture')
    };
  }/*

fetchUserInfoPeriodically() {
  interval(1000) // Exécute la fonction toutes les 20 secondes
    .subscribe(() => {
      const token = localStorage.getItem('token');
      if (token) {
        // Récupérer les informations de l'utilisateur à partir du token
        this.fetchUserInfo(token).subscribe(userInfo => {
          // Mettre à jour les informations stockées localement
          this.storeUserInfo(userInfo);
        });
      }
    });
}
*/
//louta ajad ou temchi

/*
fetchUserInfoPeriodically() {
  interval(10000)  // Peut-être envisager un intervalle plus long, comme 10 secondes (10000 ms).
    .subscribe(() => {
      const token = localStorage.getItem('token');
      if (token) {
        this.fetchUserInfo(token).subscribe(
          userInfo => {
            this.storeUserInfo(userInfo);
          },
          error => {
            console.error('Erreur lors de la récupération des informations utilisateur', error);
            // Ajoutez une gestion d'erreur pour arrêter l'intervalle si nécessaire
          }
        );
      }
    });
}
*/private fetchUserInfoSubscription: Subscription = new Subscription();


fetchUserInfoPeriodically() {
  // Utilisez le gestionnaire d'abonnements pour arrêter l'intervalle proprement
  this.fetchUserInfoSubscription = interval(100000000000).subscribe(() => {
    const token = localStorage.getItem('token');
    if (token) {
      this.fetchUserInfo(token).subscribe(
        userInfo => {
          this.storeUserInfo(userInfo);
          this.userInfoSource.next(userInfo);  // Mettre à jour BehaviorSubject avec les nouvelles données
        },
        error => {
          console.error('Erreur lors de la récupération des informations utilisateur', error);
        }
      );
    }
  });
}



 /* modifyClasse(classe: any): Observable<any> {
    const url = `${this.baseUrl}/modify-classe`;
    return this.authService.requestWithToken('PUT', url, classe);
  }*/

fetchUserInfo(token: string) {
  const userId = this.decodeJwt(token).userId;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = this.getuserinfo.replace('{idUser}', userId);

  return this.http.get<any>(url, { headers }).pipe(
    tap(userInfo => {
      //this.clearLocalStorageExceptToken();
      // Gestion de stockage dans le localStorage
      Object.keys(userInfo).forEach(key => {
        if (isPlatformBrowser(this.platformId)) {
        if (userInfo[key] != null) {

          console.log(`Storing ${key}: ${userInfo[key]}`);
           // Log pour débogage
          localStorage.setItem(key, userInfo[key]);
        } else {
          localStorage.removeItem(key);
        }
      }});
    }),
    catchError(error => {
      console.error('Error fetching user info', error);
      throw error;
    })
  );
}
//louta temchhi
/*fetchUserInfo(token: string): Observable<UserInfoResponse> {
  const userId = this.decodeJwt(token).userId;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  const url = this.getuserinfo.replace('{idUser}', userId);  // Ensure the userId is being inserted into the URL
  return this.http.get<any>(url, { headers }).pipe(
    tap(userInfo => {
      this.storeUserInfo(userInfo);
    })
  );
 // return this.http.get<UserInfoResponse>(url, { headers });
}*/

ngOnDestroy() {
  if (this.fetchUserInfoSubscription) {
    this.fetchUserInfoSubscription.unsubscribe();
  }
}
updateimageurl ='http://localhost:8085/courszello/api/auth/update-image'

updateProfilePicture(file: File, token: string) {
  const formData = new FormData();
  formData.append('image', file);

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.put(this.updateimageurl, formData, { headers, responseType: 'text' })
    .pipe(
      tap(response => console.log('Upload success: ', response)),
      catchError(error => {
        console.error('Upload failed: ', error);
        return throwError(() => new Error('Failed to upload image'));
      })
    );
}


  requestWithToken(method: string, url: string, body?: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getJwtToken()}`
    });

    return this.http.request(method, url, {
      body,
      headers
    });
  }
//

 /* removeUser(id: string): Observable<any> {
    const url = `${this.baseUrl}/remove-user/${id}`;
    return this.requestWithToken('DELETE', url, { responseType: 'text' });
  }*/

 /* removeUser(id: String): Observable<any> {

    return this.http.delete(`${this.baseUrl}/remove-user/${id}`,{ responseType: 'text' });

  }*/


getUserInfo(): any {
  if (isPlatformBrowser(this.platformId)) {
  return {


    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    email: localStorage.getItem('email'),
    dateOfBirth: localStorage.getItem('dateOfBirth'),
    nationality: localStorage.getItem('nationality'),
    phone: localStorage.getItem('phone'),
    profilePicture: localStorage.getItem('profilePicture')
  }};
}
/*updateUserInfo() {
  const userInfo = fetchUserInfo(); // Simule une requête API
  storeUserInfo(userInfo);
}
*/
  clearLocalStorageExceptToken() {
    const token = localStorage.getItem('token');
    localStorage.clear();
    if (token) {
      localStorage.setItem('token', token);
    }
  }

storeUserInfo(userInfo: any): void {
  Object.keys(userInfo).forEach(key => {

    if (isPlatformBrowser(this.platformId)) {
    if (userInfo[key] != null) {
      console.log(`Storing ${key}: ${userInfo[key]}`);  // Log pour débogage
      localStorage.setItem(key, userInfo[key]);
    } else {
      localStorage.removeItem(key);
    }
  }});
  this.userInfoSource.next({...this.getUserInfo()});
}


 /*storeUserInfoo(userInfo:any) {
  localStorage.setItem('firstName', userInfo.firstName);
  localStorage.setItem('lastName', userInfo.lastName);
  localStorage.setItem('email', userInfo.email);
  localStorage.setItem('dateOfBirth', userInfo.dateOfBirth);
  localStorage.setItem('nationality', userInfo.nationality);
  localStorage.setItem('phone', userInfo.phone);
  localStorage.setItem('profilePicture', userInfo.profilePicture);
}*/


    /*  setUserInfo(token: string): void {
        const userInfo = this.decodeJwt(token);
        Object.keys(userInfo).forEach(key => {
          localStorage.setItem(key, userInfo[key]);
        });
      }*/


/*getUserInfoJWT(): any {
  const token = localStorage.getItem('token');
  if (token) {
    const userInfo = this.decodeJwt(token);
    // Vérifier d'abord si les informations sont déjà dans le local storage
    if (!localStorage.getItem('firstName')) {
      // Si les informations ne sont pas présentes, les sauvegarder dans le local storage
      Object.keys(userInfo).forEach(key => {
        localStorage.setItem(key, userInfo[key]);
      });
    }
    // Retourner les informations à partir du local storage
    return {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      idUser: localStorage.getItem('userId'),
      phone: localStorage.getItem('phone'),
      nationality: localStorage.getItem('nationality'),
      dateOfBirth: localStorage.getItem('dateOfBirth'),
      profilePicture: localStorage.getItem('profilePicture')
      // Ajoutez d'autres propriétés si nécessaire
    };
  } else {
    // Retourner null si aucun token n'est présent dans le local storage
    return null;
  }
}
*/
login(email: string, password: string): Observable<any> {
  return this.http.post(this.seconnecterurl, { email, password }).pipe(
    tap((response: any) => {

     if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);}
              const decodedToken = this.decodeJwt(response.token);
            const roles = decodedToken.roles || [];
      // Autres traitements nécessaires avec le token
    }),
    switchMap(response => {
      // Ici, vous utilisez switchMap pour continuer avec la récupération des informations de l'utilisateur
      return this.fetchUserInfo(response.token).pipe(
        tap(userInfo => {
          if (isPlatformBrowser(this.platformId)) {

          this.storeUserInfo(userInfo);  // Stockage des informations de l'utilisateur

          const decodedToken = this.decodeJwt(response.token);
            const roles = decodedToken.roles || [];
            localStorage.setItem('roles', JSON.stringify(roles));
          this.updateUserRoleState(roles);
     } }),
        catchError(error => {
          console.error('Failed to fetch user info', error);
          return of(null);  // Gérer l'erreur éventuellement autrement
        })
      );
    }),
    catchError(error => {
      console.error('Login failed', error);
      return of(null);  // Gérer l'erreur de connexion
    })
  );
}
/*
    loginn(email: string, password: string): Observable<any> {
      return this.http.post(this.seconnecterurl, {email, password}).pipe(
        tap((response: any) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            //localStorage.setItem('firstName', response.firstName);
            //localStorage.setItem('lastName', response.lastName);
            //localStorage.setItem('email', response.email);
           // localStorage.setItem('idUser',response.idUser);
//fouk jawou bahi mech njareb haja o5ra
            //
            // Decode token to get roles
            const decodedToken = this.decodeJwt(response.token);
            const roles = decodedToken.roles || [];
            // Stockez les rôles dans le localStorage ou dans un état géré par un service
            //cv
           this.fetchUserInfo(response.token);
            localStorage.setItem('roles', JSON.stringify(roles));
       //    this.setUserInfo(response.token);
            //mtaa role el fouk cb
            // Mettre à jour l'état de l'application pour refléter le rôle de l'utilisateur
            this.updateUserRoleState(roles); // Implémentez cette méthode dans votre service
          //  this.updateUserData(response.firstName, response.lastName, response.email);

          }
        })
      );
    }
*/
    // exchangeGoogleCodeForToken(code: string): Observable<any> {
    //   const payload = { code }; // L'objet que votre backend attend
    //   return this.http.post(`${this.jwtbaseurl}/google`, payload).pipe(
    //     tap((response: any) => {
    //       if (isPlatformBrowser(this.platformId)) {
    //         localStorage.setItem('token', response.token);
    //         this.updateIsAdminStatus(); // Mettre à jour le statut d'administrateur
    //       }
    //     })
    //   );
    // }

    exchangeGoogleCodeForToken(code: string): Observable<any> {
      const payload = { code }; // L'objet que votre backend attend
      return this.http.post(`${this.jwtbaseurl}/google`, payload).pipe(

        tap((response: any) => {

          if (isPlatformBrowser(this.platformId)) {
            // Stocker les informations retournées par le backend
            localStorage.setItem('token', response.token);
            localStorage.setItem('firstName', response.firstName);
            localStorage.setItem('lastName', response.lastName);
            localStorage.setItem('email', response.email);
            localStorage.setItem('idUser', response.idUser);

            this.updateIsAdminStatus(); // Mettre à jour le statut d'administrateur si nécessaire
            // Vous devrez peut-être ajouter une logique supplémentaire pour déterminer si l'utilisateur est un admin
          }
        })
      );
    }


    loginWithGoogle() {
      // Changez cette URL par l'URL configurée dans votre backend Spring Boot
      window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    }

    // Sauvegarde le token d'accès et redirige vers une page de l'application
    saveTokenGoogle(token: string) {
      if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('access_token', token);
      this.router.navigate(['/evaluation']); // Redirigez l'utilisateur vers la page d'accueil après l'authentification
        }  }





/*
    login(email: string, password: string): Observable<any> {
      return this.http.post(`${this.jwtbaseurl}/authenticate`, {email, password},{ responseType: 'text' }).pipe(
        tap((response: any) => {
          if (isPlatformBrowser(this.platformId)) {

            if (response.token) {
            //localStorage.setItem('token', response.token);
            this.isLoggedInSubject.next(true); // Mettez à jour le statut de connexion
        localStorage.setItem('token',response.token);
            this.saveToken(response.token);
            console.log(response.message);
            // Supposons que updateIsAdminStatus et updateUserStatus sont d'autres logiques que vous avez implémentées
            this.updateIsAdminStatus(); // Mettre à jour le statut d'administrateur
            this.updateUserStatus('ONLINE').subscribe();
          }}
        }),
        catchError((error) => {
          console.error('Login error:', error);
          this.isLoggedInSubject.next(false); // Si erreur, considérer comme non connecté
          return throwError(() => new Error('Failed to login')); // Vous pouvez personnaliser le message d'erreur si nécessaire
        })
      );
    }


    */



    updateUserStatus(status: 'ONLINE' | 'INACTIVE' | 'OFFLINE'): Observable<any> {
      const token = this.getJwtToken(); // Suppose que vous avez cette méthode pour récupérer le JWT
      if (!token) {
        console.error("No JWT token found. Unable to update user status.");
        return throwError(() => new Error('No JWT token found'));
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      // Envoyer une requête au serveur pour mettre à jour l'état de connexion avec le JWT dans les headers
      return this.http.post(`${this.jwtbaseurl}/update-status`, { status }, { headers});
    }

    private urladdEvaluation = 'http://localhost:8080/api/add/eval';
    addEvaluation(evaluation: any): Observable<any> { // Ajustez le type d'`evaluation` selon votre modèle
      return this.http.post<any>(this.urladdEvaluation, evaluation, {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.getJwtToken()}`
        })
      });
    }


    private isAdminSubject = new BehaviorSubject<boolean>(false);
  // public isAdmin$ = this.isAdminSubject.asObservable();


    // getJwtToken(): string | null {
    //   if (isPlatformBrowser(this.platformId)&& typeof window !== 'undefined') {
    //     return localStorage.getItem(this.TOKEN_KEY);
    //   }
    //   return null; // ou gérer autrement pour SSR
    // }
    // public checkAndUpdateIsAdminStatus(): void {
    //   this.updateIsAdminStatus(); // This forces an update based on the current token.
    // }

    getJwtToken(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem('token');
      }
      return null; // ou gérer autrement pour SSR
    }
    public checkAndUpdateIsAdminStatus(): void {
      this.updateIsAdminStatus(); // This forces an update based on the current token.
    }

//     updateIsAdminStatus(): void {
//       const token = this.getJwtToken();
//       if (token) {
//         try {
//           const decoded = this.decodeJwt(token);
//           const isAdmin = decoded.roles.includes('ADMINISTRATEUR');
//           this.isAdminSubject.next(isAdmin);


// console.log(`isAdmin updated to: ${isAdmin}`);
//         } catch (error) {
//           console.error('Error decoding token:', error);
//           this.isAdminSubject.next(false);
//         }
//       } else {
//         this.isAdminSubject.next(false);
//       }
//     }

/*hasRole(requiredRole: string): boolean {
  if (isPlatformBrowser(this.platformId)) {
  const token = localStorage.getItem('token'); // ou localStorage, selon où vous stockez le token
  if (token) {
    const decodedToken = this.decodeJwt(token);
    return decodedToken.roles.includes(requiredRole);
  }
}
  return false;
}*/
  hasRole(requiredRole: string): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = this.decodeJwt(token); // Using any type, ideally define an interface
          return decodedToken.roles && decodedToken.roles.includes(requiredRole);
        } catch (error) {
          console.error('Error decoding token:', error);
          return false;
        }
      }
    }
    return false;
  }

updateIsAdminStatus(): void {
  const token = this.getJwtToken();
  if (!token) {
    this.isAdminSubject.next(false);
    return;
  }

  try {
    const decoded = this.decodeJwt(token);
    // Assuming 'roles' is a string. Check if it matches 'ADMINISTRATOR'.
    const isAdmin = decoded.roles === 'ADMINISTRATOR';
    this.isAdminSubject.next(isAdmin);
  } catch (error) {
    console.error('Error decoding token:', error);
    this.isAdminSubject.next(false);
  }
}

    requestPasswordReset(email: string): Observable<any> {
      return this.http.post(`${this.jwtbaseurl}/forgot-password`, { email }, { responseType: 'text' });
    }

    // verifyResetCode(email: string, resetToken: string): Observable<any> {
    //   // Vous devez avoir un endpoint pour vérifier le code
    //   return this.http.post(`${this.jwtbaseurl}/verify-reset-code`, { email,resetToken }, { responseType: 'text' });
    // }

    private resetCodeVerified: boolean = false;

// Call this method once the reset code is successfully verified
setResetCodeVerified(verified: boolean): void {
  this.resetCodeVerified = verified;
}

// Method to check if the reset code has been verified
isResetCodeVerified(): boolean {
  return this.resetCodeVerified;
}


    verifyResetCode(email: string, resetToken: string): Observable<any> {
      let params = new HttpParams().set('email', email).set('resetToken',resetToken);
      return this.http.post(`${this.jwtbaseurl}/verify-reset-code`, {email,resetToken}, { params: params, responseType: 'text' });
    }

    private email: string = '';

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  clear() {
    this.email = '';
  }

  updateUserPassword(email: string, newPassword: string): Observable<any> {
    const endpoint = `${this.jwtbaseurl}/update-password-after-reset`;
    return this.http.post(endpoint, { email, newPassword },{ responseType: 'text' });
  }

  modifyUserCN(user: any): Observable<any> {
    const url = `${this.jwtbaseurl}/modifyInfoUserConnected`;
    return this.requestWithTokenn('PUT', url,user, { responseType: 'text' });
  //  return this.http.put(url, user);
  }

  removeUser(id: string): Observable<any> {
    const url = `${this.baseUrl}/remove-user/${id}`;
    return this.requestWithToken('DELETE', url, { responseType: 'text' });
  }
  // Dans votre service Angular
  requestWithTokenn<T extends 'text' | 'arraybuffer' | 'blob' | 'json' = 'json'>(
    method: string,
    url: string,
    body?: any,
    options?: { responseType: T }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getJwtToken()}`
    });

    const httpOptions = {
      headers: headers,
      body: body,
      responseType: options?.responseType || 'json'
    };

    return this.http.request<T>(method, url, httpOptions as any);
  }
  requestWithToke3<T extends 'text' | 'arraybuffer' | 'blob' | 'json' = 'json'>(
    method: string,
    url: string,
    params?: any,
    options?: { responseType: T }
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getJwtToken()}`
    });

    const httpOptions = {
      headers: headers,
      params: params,
      responseType: options?.responseType || 'json'
    };

    return this.http.request<T>(method, url, httpOptions as any);
  }

  affecterRole(userEmail: string, newRole: string): Observable<any> {
    const params = { userEmail: userEmail, userRole: newRole };
    const url ='http://localhost:8085/courszello/api/auth/affecterRole';
    return this.requestWithToke3('PUT', url, params);
  }


  updateBanStatus(userEmail: string, status: boolean): Observable<any> {
    // Construct the URL with query parameters
    const params = { userEmail: userEmail, status: status };
    //const url = `/api/users/updateStatus?email=${encodeURIComponent(email)}&status=${status}`;
    const url = `http://localhost:8085/courszello/api/auth/updateStatus`;

    return this.requestWithToke3('PUT', url, params);
  }


  requestWithToke1<T extends 'text' | 'arraybuffer' | 'blob' | 'json' = 'json'>(
    method: string,
    url: string,
    body?: any,
    options?: { responseType: T, headers?: HttpHeaders }
  ): Observable<any> {
    let headers = options?.headers || new HttpHeaders();
    if (body instanceof FormData) {
      headers = headers.set('Content-Type', 'multipart/form-data');
    }
    const httpOptions = {
      headers: headers,
      body: body,
      responseType: options?.responseType || 'json'
    };
    return this.http.request<T>(method, url, httpOptions as any);
  }


  modifyUser1(idUser: string, user: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('imageFile', imageFile, imageFile.name);
    }
    const url = `${this.baseUrl}/update/${idUser}`;
    return this.requestWithToke1('PUT', url, formData, { responseType: 'text' });
  }




  /*modifyUser1(idUser: string, user: any, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('userJson', JSON.stringify(user));
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }
    const url = `${this.baseUrl}/update/${idUser}`;
    return this.requestWithTokenn('PUT', url, formData, { responseType: 'text' });
  }*/

  updateadminUSER(idUser: string, user: any, imageFile: File): Observable<any> {
    const url = `${this.baseUrl}/modify-user/${idUser}`;

    // Création d'un FormData pour inclure les données JSON et le fichier image
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
    formData.append('imageFile', imageFile);

    return this.requestWithTokenn('PUT', url, formData, { responseType: 'text' });
  }


  getUsers(): Observable<any[]> {
  const url =`${this.baseUrl}/retrieve-all-users`;
  return this.requestWithToken('GET', url, { responseType: 'text' });
}

 /* ajouterFoyerEtAffecterAUniversite(classe: any, idSpecialite: string): Observable<any> {
    const url = `${this.baseUrl}/ajouter-affecter/${idSpecialite}`;
    return this.authService.requestWithToken('POST', url, classe);
  }*/

  }


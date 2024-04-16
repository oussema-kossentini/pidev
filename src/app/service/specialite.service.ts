import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, catchError, throwError, tap} from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private baseUrl = 'http://localhost:8085/courszello/api/specilite';

  private baseSh = 'http://localhost:8085/courszello/api/schedule'

 private session = 'http://localhost:8085/courszello/api/session'
//private  addspecialti =' http://localhost:8085/courszello/api/specilite/add/specialite';
  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) {} // Injectez HttpClient ici

  // getTitels(): Observable<any[]> {
  //   // Utilisez des backticks pour la chaîne de template
  //   return this.http.get<any[]>(`${this.baseUrl}/title`);
  // }

 // Méthode pour ajouter une classe

/*  addspecialite(classeDatas: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/add/specialite`, classeDatas);
}

*//*
  addspecialite(classeDatas: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.baseUrl}/add/specialite`, classeDatas, { headers ,responseType: 'text'})
      .pipe(
        catchError(error => {
          console.error('Failed to add specialite: ', error);
          return throwError(() => new Error('Failed to add specialite'));
        })
      );
  }
*/
  addspecialite(specialiteData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/add/specialite`, specialiteData, {headers, responseType: 'text'})
      .pipe(
        catchError(error => {
          console.error('Failed to add specialite: ', error);
          return throwError(() => new Error('Failed to add specialite'));
        })
      );
  }
  // //scheduel to classe
  // addShToClasse(Scheduel: any, idClasse: string): Observable<any> {
  //   const url = (`${this.baseSh}/add-S-C/${idClasse}`);
  //   return this.http.post(url, Scheduel);
  // }


  // //subject to session
  // addShToSession(Session: any, idScheduel: string): Observable<any> {
  //   const url = (`${this.session}/add-S-SH/${idScheduel}`);
  //   return this.http.post(url, Session);
  // }




//  // All scheduel
//  getAllSchedules(): Observable<any> {
//   // Utilisation correcte de l'URL de base avec le chemin spécifique pour récupérer tous les horaires
//   return this.http.get(`${this.baseSh}/retrieve-all-scheduels`);
// }


//Methode affichage
  /*
getAllSpecialite(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/retrieve-all-specialities`);
}

*/
  getAllSpecialite(token: string): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.baseUrl}/retrieve-all-specialities`, { headers })
      .pipe(
        catchError(error => {
          console.error('Failed to retrieve all specialities: ', error);
          return throwError(() => new Error('Failed to retrieve all specialities'));
        })
      );
  }




 /*
  deleteSpecialit(id: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/remove-specialite/${id}`, { responseType: 'text' })

}

*/
  deleteSpecialite(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/remove-specialite/${id}`, { headers, responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Failed to delete specialite: ', error);
          return throwError(() => new Error('Failed to delete specialite'));
        })
      );
  }

//modification mta3 classe
// editClass(id: string, classData: any): Observable<any> {
//   return this.http.put(`${this.baseUrl}/modify-classe/${id}`, classData, { responseType: 'json' });
// }

modifySpecialite(specialite: any): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/modify-specialite`, specialite);
}
getObjetById(id: string): Observable<any> {
  return this.http.get(`${this.baseUrl}${id}`); // Assurez-vous que le chemin correspond à celui défini dans votre contrôleur Spring Boot
}


gettingSpecialite(id: any): Observable<any> {
  return this.http.get(`${this.baseUrl}${id}`); // Assurez-vous que le chemin correspond à celui défini dans votre contrôleur Spring Boot
}


//Methode affichage par classes detailer
getSpecialiteById2(id:any): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/getclasseBySpecialite/${id}`);
}


statEtudiantParSpecialite(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/statEtudiantParSpecialite`);
}
  statEnseignatParSpecialite(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/statProfesseurParSpecialite`);
  }

  getAllTitles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/titles`);

  }
}

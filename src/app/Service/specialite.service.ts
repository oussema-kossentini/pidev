import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private baseUrl = 'http://localhost:8085/api/specilite';

  constructor(private http: HttpClient) { } // Injectez HttpClient ici

  // getTitels(): Observable<any[]> {
  //   // Utilisez des backticks pour la chaîne de template
  //   return this.http.get<any[]>(`${this.baseUrl}/title`);
  // }

 // Méthode pour ajouter une classe
 addspecialite(classeDatas: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/add/specialite`, classeDatas);
}

//Methode affichage
getAllSpecialite(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/retrieve-all-specialities`);
}


deleteSpecialit(id: string): Observable<any> {
  return this.http.delete(`${this.baseUrl}/remove-specialite/${id}`, { responseType: 'text' })

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

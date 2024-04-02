import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Classe } from '../classe';
//import { Classe } from 'src/app/classe.model'; // Corrigez le chemin si nécessaire
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private baseUrl = 'http://localhost:8085/api/classes';

  constructor(private http: HttpClient) { } // Injectez HttpClient ici

  getLevel(): Observable<any[]> {
    // Utilisez des backticks pour la chaîne de template
    return this.http.get<any[]>(`${this.baseUrl}/level`);
  }

 


  getClassesByUserId(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes/${id}`);
  }

  addClasse(classe: any, idSpecialite: string): Observable<any> {
    // Assuming your backend expects the schedule ID as a query parameter
    const url = `${this.baseUrl}add/classe?idSpecialite=${idSpecialite}`;
    return this.http.post(url, classe);
  }

  ajouterFoyerEtAffecterAUniversite(classe: any, idSpecialite: string): Observable<any> {
    // Assuming your backend expects the schedule ID as a query parameter
    const url = `${this.baseUrl}/ajouter-affecter/${idSpecialite}`;
    return this.http.post(url, classe);
  }

  //Methode affichage
  getAllClasse(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/retrieve-all-classe`);
  }

  /********************************Delete Contrat************************************/
  // deleteContrat(id:number):Observable<any>{
  // return this.http.delete(`${this.baseUrl+"deleteById"}/${id}`, {responseType: 'text'});
  // }

  // *********************************************************

  deleteClass(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-classes/${id}`, { responseType: 'text' })

  }


  //modification mta3 classe
  // editClass(id: string, classData: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/modify-classe/${id}`, classData, { responseType: 'json' });
  // }

  modifyClasse(classe: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modify-classe`, classe);
  }
  getObjetById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`); // Assurez-vous que le chemin correspond à celui défini dans votre contrôleur Spring Boot
  }

  // getById(id: any): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  //     }

  // affectationSpecialite(formData: any, idSpecialite: string): Observable<any> {
  //   // Créez un objet avec les données de classeData et idSpecialite
  //   const updatedClasseData = {
  //     ...formData,
  //     idSpecialite: idSpecialite
  //   };

  //   // Envoyez une requête POST à l'URL spécifiée avec les données mises à jour
  //   return this.http.post<any>(`${this.baseUrl}/ajouter-affecter`, updatedClasseData).pipe(
  //     catchError(error => {
  //       console.error('Une erreur s\'est produite lors de la requête:', error);
  //       throw error; // Renvoie l'erreur pour qu'elle soit gérée par le code appelant
  //     })
  //   );
  // }


  //Methode affichage par classes detailer
  getEtudiantFromClass(idClasse: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEtudiantFromClass/${idClasse}`);
  }
  getProfessorFromClass(idClasse: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getProfessorFromClass/${idClasse}`);
  }

  affecterUserInClass(idUser: any, idClasse: any): Observable<any> {
    // Assuming your backend expects the schedule ID as a query parameter
    const url = `${this.baseUrl}/affecterUserInClass/${idUser}/${idClasse}`;
    return this.http.post(url, null);
  }

  //Methode affichage par classes detailer
  getEtudiant(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEtudiant`);
  }

  getEnseignat(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getEnsignat`);
  }

  deleteClasseParSpecialite(idClasse: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteAndUnassignSpecialite/${idClasse}`, { responseType: 'text' })

  }

  exportUniversitesPdf(): Observable<Blob> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }),
      responseType: 'blob' as 'json' // Spécifiez le type de réponse en tant que blob
    };

    return this.http.get<Blob>(this.baseUrl + '/pdf', httpOptions);
  }

}

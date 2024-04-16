import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  private baseUrl = 'http://localhost:8085/courszello/api/classes';

  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) {}

  getLevel(): Observable<any[]> {
    const url = `${this.baseUrl}/level`;
    return this.authService.requestWithToken('GET', url);
  }

  getClassesByUserId(id: any): Observable<any> {
    const url = `${this.baseUrl}/classes/${id}`;
    return this.authService.requestWithToken('GET', url);
  }

  addClasse(classe: any, idSpecialite: string): Observable<any> {
    const url = `${this.baseUrl}/add/classe?idSpecialite=${idSpecialite}`;
    return this.authService.requestWithToken('POST', url, classe);
  }

  ajouterFoyerEtAffecterAUniversite(classe: any, idSpecialite: string): Observable<any> {
    const url = `${this.baseUrl}/ajouter-affecter/${idSpecialite}`;
    return this.authService.requestWithToken('POST', url, classe);
  }

  getAllClasse(): Observable<any[]> {
    const url = `${this.baseUrl}/retrieve-all-classe`;
    return this.authService.requestWithToken('GET', url);
  }

  deleteClass(id: string): Observable<any> {
    const url = `${this.baseUrl}/remove-classes/${id}`;
    return this.authService.requestWithToken('DELETE', url);
  }

  modifyClasse(classe: any): Observable<any> {
    const url = `${this.baseUrl}/modify-classe`;
    return this.authService.requestWithToken('PUT', url, classe);
  }

  getObjetById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.authService.requestWithToken('GET', url);
  }

  getEtudiantFromClass(idClasse: any): Observable<any[]> {
    const url = `${this.baseUrl}/getEtudiantFromClass/${idClasse}`;
    return this.authService.requestWithToken('GET', url);
  }

  getProfessorFromClass(idClasse: any): Observable<any[]> {
    const url = `${this.baseUrl}/getProfessorFromClass/${idClasse}`;
    return this.authService.requestWithToken('GET', url);
  }

  affecterUserInClass(idUser: any, idClasse: any): Observable<any> {
    const url = `${this.baseUrl}/affecterUserInClass/${idUser}/${idClasse}`;
    return this.authService.requestWithToken('POST', url);
  }


  //Methode affichage par classes détaillé
  getEtudiant(): Observable<any[]> {
    const url = `${this.baseUrl}/getEtudiant`;
    return this.authService.requestWithToken('GET', url);
  }

  getEnseignant(): Observable<any[]> {
    const url = `${this.baseUrl}/getEnsignat`;
    return this.authService.requestWithToken('GET', url);
  }


  deleteClasseParSpecialite(idClasse: string): Observable<any> {
    const url = `${this.baseUrl}/deleteAndUnassignSpecialite/${idClasse}`;
    return this.authService.requestWithToken('DELETE', url);
  }

  exportUniversitesPdf(): Observable<Blob> {
    const url = `${this.baseUrl}/pdf`;
    return this.authService.requestWithToken('GET', url, { responseType: 'blob' as 'json' });
  }
}

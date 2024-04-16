import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from 'inspector';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';



@Injectable({
  providedIn: 'root'
})
//
export class ScheduleServiceServiceService {

  private baseApiUrl = 'http://localhost:8085/courszello/api/schedule'; // URL de base pour les API de gestion des horaires
  private baseApiUrli = 'http://localhost:8085/courszello/api/session';
  private baseUrl = 'http://localhost:8085/courszello/api/users';
  private classe = 'http://localhost:8085/courszello/api/classes';
  private subject = 'http://localhost:8085/courszello/api';
  private profuser = 'http://localhost:8085/courszello/api/specilite';



  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) {}

  getByIdClass(idClasse: any): Observable<any> {
    const url = `${this.classe}/retrieve-all-classe/${idClasse}`;
    return this.authService.requestWithToken('GET', url);
  }

  addStoClasse(session: any, idClasse: string): Observable<any> {
    const url = `${this.baseApiUrl}/add-to-classe/${idClasse}`;
    return this.authService.requestWithToken('POST', url, session);
  }

  getAllSchedules(): Observable<any> {
    const url = `${this.baseApiUrl}/retrieve-all-scheduels`;
    return this.authService.requestWithToken('GET', url);
  }

  deleteSched(idScheduel: string): Observable<any> {
    const url = `${this.baseApiUrl}/remove-scheduel/${idScheduel}`;
    return this.authService.requestWithToken('DELETE', url);
  }

  update(id: any, data: any): Observable<any> {
    const url = `${this.baseApiUrl}/modify-scheduel/${id}`;
    return this.authService.requestWithToken('PUT', url, data);
  }

  getByIdScheduel(id: any): Observable<any> {
    const url = `${this.baseApiUrl}/${id}`;
    return this.authService.requestWithToken('GET', url);
  }

  addSchedSS(session: any, idScheduel: string, idCourse: string): Observable<any> {
    const url = `${this.baseApiUrli}/add/session?idScheduel=${idScheduel}&idCourse=${idCourse}`;
    return this.authService.requestWithToken('POST', url, session);
  }


  getAllSessions(): Observable<any> {
    const url = `${this.baseApiUrli}/retrieve-all-Session`;
    return this.authService.requestWithToken('GET', url);
  }

  getByIdSS(idSession: any): Observable<any> {
    const url = `${this.baseApiUrli}/${idSession}`;
    return this.authService.requestWithToken('GET', url);
  }

  deleteSession(idSession: string): Observable<any> {
    const url = `${this.baseApiUrli}/remove-session/${idSession}`;
    return this.authService.requestWithToken('DELETE', url);
  }

  updateSession(id: any, data: any): Observable<any> {
    const url = `${this.baseApiUrli}/modify-session/${id}`;
    return this.authService.requestWithToken('PUT', url, data);
  }

  getAllClasses(): Observable<any> {
    const url = `${this.classe}/retrieve-all-classe`;
    return this.authService.requestWithToken('GET', url);
  }

  addSubjecttosession(session: any, idSubject: string): Observable<any> {
    const url = `${this.baseApiUrli}/add-to-subject/${idSubject}`;
    return this.authService.requestWithToken('POST', url, session);
  }

  addShToClasse(Scheduel: any, idClasse: string): Observable<any> {
    const url = `${this.baseApiUrl}/add-S-C/${idClasse}`;
    return this.authService.requestWithToken('POST', url, Scheduel);
  }

  addShToSession(Session: any, idScheduel: string): Observable<any> {
    const url = `${this.baseApiUrli}/add-S-SH/${idScheduel}`;
    return this.authService.requestWithToken('POST', url, Session);
  }

  getAllSubject(): Observable<any> {
    const url = `${this.subject}/courses/retrieve-all-courses`;
    return this.authService.requestWithToken('GET', url);
  }

  getByIdSubject(courseId: any): Observable<any> {
    const url = `${this.subject}/courses/${courseId}`; // Utilise l'URL correcte pour accéder aux cours
    return this.authService.requestWithToken('GET', url);
  }

  getUserById(idUser: string): Observable<any> {
    const url = `${this.baseUrl}/${idUser}`;
    return this.authService.requestWithToken('GET', url);
  }

  getSpecialiteAndClasseFromProfesseur(idUser: string): Observable<any> {
    const url = `${this.profuser}/getSpecialiteAndClasseFromProfesseur/${idUser}`;
    return this.authService.requestWithToken('GET', url);
  }


}

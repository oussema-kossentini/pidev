import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from 'inspector';



@Injectable({
  providedIn: 'root'
})
export class ScheduleServiceServiceService {

  private baseApiUrl = 'http://localhost:8085/api/schedule'; // URL de base pour les API de gestion des horaires
  private baseApiUrli = 'http://localhost:8085/api/session';
  private baseUrl = 'http://localhost:8085/api/users';
  private classe = 'http://localhost:8085/api/classes';
  private subject = 'http://localhost:8085/api';
  private profuser = 'http://localhost:8085/api/specilite';



  constructor(private http: HttpClient) { }

  getByIdClass(idClasse: any): Observable<any> {
    return this.http.get(`${this.classe}/retrieve-all-classe/${idClasse}`);
  }





  //affecter classe au scheduel
  addStoClasseaa(session: any, idClasse: string): Observable<any> {
    // Utilisez idClasse comme partie du chemin de l'URL, pas comme un paramètre de requête
    const url = (`${this.baseApiUrl}/add-S-C/${idClasse}`);
    return this.http.post(url, session);
  }
  addStoClasse(session: any, idClasse: string): Observable<any> {
    // Utilisez idClasse comme partie du chemin de l'URL, pas comme un paramètre de requête
    const url = (`${this.baseApiUrl}/add-to-classe/${idClasse}`);
    return this.http.post(url, session);
  }

  getAllSchedules(): Observable<any> {
 
    return this.http.get(`${this.baseApiUrl}/retrieve-all-scheduels`);
  }

  //delete Scheduel
  deleteSched(idScheduel: string): Observable<any> {

    return this.http.delete(`${this.baseApiUrl}/remove-scheduel/${idScheduel}`);
  }

  //update
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseApiUrl}/modify-scheduel/${id}`, data);
  }

  // getbyId scheduel
  getByIdScheduel(id: any): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/${id}`);
  }

  //*********/


  addSchedSS(session: any, idScheduel: string, idSubject: string): Observable<any> {
    // Ajout du paramètre idSubject à l'URL
    const url = `${this.baseApiUrli}/add/session?idScheduel=${idScheduel}&idSubject=${idSubject}`;
    return this.http.post(url, session);
  }




  //all session
  getAllSessions(): Observable<any> {
    // Utilisation correcte de l'URL de base avec le chemin spécifique pour récupérer tous les horaires
    return this.http.get(`${this.baseApiUrli}/retrieve-all-Session`);
  }

  //getbyid session
  getByIdSS(idSession: any): Observable<any> {
    return this.http.get(`${this.baseApiUrli}/${idSession}`);
  }
  //delete session
  deleteSession(idSession: string): Observable<any> {

    return this.http.delete(`${this.baseApiUrli}/remove-session/${idSession}`);
  }
  //update session
  updateSession(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseApiUrli}/modify-session/${id}`, data);
  }

  //getbyid classe


  //getall clases
  getAllClasses(): Observable<any> {
    // Utilisation correcte de l'URL de base avec le chemin spécifique pour récupérer tous les horaires
    return this.http.get(`${this.classe}/retrieve-all-classe`);
  }

  //subject to session
  addSubjecttosession(session: any, idSubject: string): Observable<any> {
    // Utilisez idClasse comme partie du chemin de l'URL, pas comme un paramètre de requête
    const url = (`${this.baseApiUrli}/add-to-subject/${idSubject}`);
    return this.http.post(url, session);
  }








  //scheduel to classe
  addShToClasse(Scheduel: any, idClasse: string): Observable<any> {
    const url = (`${this.baseApiUrl}/add-S-C/${idClasse}`);
    return this.http.post(url, Scheduel);
  }


  //subject to session
  addShToSession(Session: any, idScheduel: string): Observable<any> {
    const url = (`${this.baseApiUrli}/add-S-SH/${idScheduel}`);
    return this.http.post(url, Session);
  }







  getAllSubject(): Observable<any> {
    // Utilisation correcte de l'URL de base avec le chemin spécifique pour récupérer tous les horaires
    return this.http.get(`${this.subject}/subject/retrieve-all-subjects`);
  }
  getByIdSubject(idSubject: any): Observable<any> {
    return this.http.get(`${this.subject}/${idSubject}`);
  }






  getUserById(idUser: string): Observable<any> {
    const url = `${this.baseUrl}/${idUser}`;
    return this.http.get<any>(url);
  }



  getSpecialiteAndClasseFromProfesseur(idUser: string): Observable<any> {
    return this.http.get(`${this.profuser}/getSpecialiteAndClasseFromProfesseur/${idUser}`);
  }



}

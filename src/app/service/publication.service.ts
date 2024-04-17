// src/app/services/publication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publication} from '../components/publicationn/publication.model';
import { FormGroup } from '@angular/forms';
import {ServiceFazzetregisterService} from "./service-fazzetregister-service.service";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:8085/courszello/api/publications';
  dataForm !: FormGroup; // Définissez la propriété dataForm
  host :string = "http://localhost:8085/courszello/";

  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) {}
  choixmenu : string  = 'A';

  addPublication(publication: Publication): Observable<any> {
    const url = `${this.apiUrl}/add`;
    return this.authService.requestWithToken('POST', url, publication);
  }

  // Créer des données
  createData(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/add`;
    return this.authService.requestWithToken('POST', url, formData);
  }

  // Sauvegarder un jeton d'image
  saveImageToken(imageToken: string): Observable<any> {
    const url = `${this.apiUrl}/save-image-token`;
    return this.authService.requestWithToken('POST', url, { imageToken });
  }

  // Lire toutes les publications
  getPublications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve`);
  }

  // Supprimer une publication
  removePublication(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-publication/${id}`, { responseType: 'text' });
  }

  // Modifier une publication
  modifyPublication(publication: Publication): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-publication`, publication);
  }

  // Obtenir une publication par ID
  getPublicationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get?publication-id=${id}`);
  }

  // Obtenir l'URL d'une image à partir de son jeton

  getImageUrl(imageToken: string): string {
    return `http://localhost:8085/courszello/api/images/${imageToken}`;
  }

  // Télécharger un fichier
  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const url = `${this.apiUrl}/add`;
    const req = new HttpRequest('POST', url, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.authService.requestWithToken('POST', url, formdata);
  }

  // Rechercher des publications par titre
  searchPublicationsByTitle(title: string): Observable<Publication[]> {
    const params = new HttpParams().set('title', title);
    return this.http.get<Publication[]>(`${this.apiUrl}/search`, { params });
  }

  // Partager une publication
  sharePublication(publicationId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/share/${publicationId}`, {});
  }

  // Sujet BehaviorSubject pour diffuser les publications
  private publicationSubject = new BehaviorSubject<Publication | null>(null);
  publication$ = this.publicationSubject.asObservable();

  // Mettre à jour la publication actuellement sélectionnée
  setPublication(publication: Publication | null): void {
    this.publicationSubject.next(publication);
  }

}

// src/app/services/publication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publication} from '../models/publication.model';

import { FormGroup } from '@angular/forms';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:8085/courszello/api/publications';
  dataForm !: FormGroup; // Définissez la propriété dataForm
  host :string = "http://localhost:8085/courszello";

  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) {}
  choixmenu : string  = 'A';

  addPublication(publication: Publication): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, publication);
  }
  private baseUrl = 'http://localhost:8085/courszello/api/publications/add'; // Assurez-vous que cette URL est correcte
  createPublication(publication: any, file: File) {
    const formData: FormData = new FormData();
    formData.append('publication', JSON.stringify(publication));
    formData.append('file', file);

    // Vous n'avez pas besoin de définir le 'Content-Type' dans les en-têtes car le navigateur le fera automatiquement avec FormData
    return this.http.post(this.baseUrl, formData).toPromise();
  }
  createData(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/add`;
    return this.authService.requestWithToken('POST', url, formData);
  }


  saveImageToken(imageToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-image-token`, { imageToken });
  }

  getPublications(): Observable<any[]> {
    const url = `${this.apiUrl}/retrieve`;
    return this.authService.requestWithToken('GET', url);
  }
  getPublication(): Promise<any[] | undefined> {
    const url = `${this.apiUrl}/retrieve`;
    return this.http.get<any[]>(url).toPromise().catch(error => {
      console.error('Erreur lors de la récupération des publications : ', error);
      return undefined;
    });
  }



  removePublication(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove-publication/${id}`, { responseType: 'text' });
  }

  modifyPublication(publication: Publication): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-publication`, publication);
  }

  getPublicationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get?publication-id=${id}`);
  }

  searchPublicationsByTitle(title: string): Observable<Publication[]> {
    const params = new HttpParams().set('title', title);
    return this.http.get<Publication[]>(`${this.apiUrl}/search`, { params });
  }

  sharePublication(publicationId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/share/${publicationId}`, {});
  }

  private publicationSubject = new BehaviorSubject<Publication | null>(null);
  public publication$ = this.publicationSubject.asObservable();

  setPublication(publication: Publication | null): void {
    this.publicationSubject.next(publication);
  }

}

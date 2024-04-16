// src/app/services/publication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publication} from '../components/publicationn/publication.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:8080/api/publications';
  dataForm !: FormGroup; // Définissez la propriété dataForm
  host :string = "http://localhost:8080";

  constructor(private http: HttpClient) {}
  choixmenu : string  = 'A';

  addPublication(publication: Publication): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, publication);
  }
  createData(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, formData);
  }

  saveImageToken(imageToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-image-token`, { imageToken });
  }
    // Read
    getPublications(): Observable<any[]> {

      return this.http.get<any[]>(`${this.apiUrl}/retrieve`);

    }
    removePublication(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/remove-publication/${id}`, { responseType: 'text' })

    }
    modifyPublication( publication: Publication): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/modify-publication`, publication);
    }

    getPublicationById(id: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/get?publication-id=${id}`);
    }
  getImageUrl(imageToken: string): string {
  // Construire l'URL de l'image en utilisant le token
  return `http://localhost:8080/api/images/${imageToken}`;
}
uploadFile(file: File): Observable<HttpEvent<{}>> {
  const formdata: FormData = new FormData();
  formdata.append('file', file);
  const req = new HttpRequest('POST', `${this.apiUrl}/add`, formdata, {
    reportProgress: true,
    responseType: 'text'
  });
  return this.http.request(req);
}
searchPublicationsByTitle(title: string): Observable<Publication[]> {
  const params = new HttpParams().set('title', title);
  return this.http.get<Publication[]>(`${this.apiUrl}/search`, { params });
}

sharePublication(publicationId: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/share/${publicationId}`, {});
}
private publicationSubject = new BehaviorSubject<Publication | null>(null);
publication$ = this.publicationSubject.asObservable();



setPublication(publication: Publication | null): void {
  this.publicationSubject.next(publication);
}

}

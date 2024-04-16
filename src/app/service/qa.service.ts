import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QA } from '../Models/qa.model';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';

@Injectable({
  providedIn: 'root'
})
export class QaService {
  private baseUrl = 'http://localhost:8085/courszello/api/qa'; // Ajustez selon votre configuration

  // Définition des options HTTP, notamment le type de contenu.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) {}

  addQA(qa: QA): Observable<QA> {
    const url = `${this.baseUrl}/add`;
    return this.authService.requestWithToken('POST', url, qa)
      .pipe(
        catchError(this.handleError)
      );
  }

  retrieveAllQA(): Observable<QA[]> {
    const url = `${this.baseUrl}/retrieve-all-qa`;
    return this.authService.requestWithToken('GET', url)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeQA(qaId: string): Observable<any> {
    const url = `${this.baseUrl}/remove-qa/${qaId}`;
    return this.authService.requestWithToken('DELETE', url)
      .pipe(
        catchError(this.handleError)
      );
  }

  modifyQA(id: string, qa: QA): Observable<QA> {
    const url = `${this.baseUrl}/modify-qa/${id}`;
    return this.authService.requestWithToken('PUT', url, qa)
      .pipe(
        catchError(this.handleError)
      );
  }

  assignQaToEvaluation(idQa: string, evaluationId: any): Observable<any> {
    const url = `${this.baseUrl}/assign-QA-Evaluation/${idQa}/${evaluationId}`;
    return this.authService.requestWithToken('PUT', url, null) // null as body if no specific data needed
      .pipe(
        catchError(this.handleError)
      );
  }

  getQaById(evaluationId: any): Observable<any[]> {
    const url = `${this.baseUrl}/getQaByEvaluationId/${evaluationId}`;
    return this.authService.requestWithToken('GET', url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Centralized error handling method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

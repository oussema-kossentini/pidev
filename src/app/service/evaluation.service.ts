import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Evaluation } from '../Models/evaluation.model';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';
@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:8085/courszello/api/evaluations';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) {} // Injectez HttpClient ici

  getEvaluations(): Observable<Evaluation[]> {
    const url = `${this.apiUrl}/retrieve-all-evaluations`;
    return this.authService.requestWithToken('GET', url);
  }

  getEvaluation(id: number | string): Observable<Evaluation> {
    const url = `${this.apiUrl}/${id}`;
    return this.authService.requestWithToken('GET', url);
  }

  addEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    const url = `${this.apiUrl}/addeval`;
    return this.authService.requestWithToken('POST', url, evaluation)
      .pipe(
        catchError((error: any) => {
          console.error('Une erreur est survenue :', error);
          return throwError(error.message || error);
        })
      );
  }

  updateEvaluation(id: number | string, evaluation: Evaluation): Observable<any> {
    const url = `${this.apiUrl}/modify-evaluation/${id}`;
    return this.authService.requestWithToken('PUT', url, evaluation);
  }

  deleteEvaluation(id: number | string): Observable<any> {
    const url = `${this.apiUrl}/remove-evaluation/${id}`;
    return this.authService.requestWithToken('DELETE', url);
  }

  assignEvaluationToUser(userId: any, evaluationId: any): Observable<any> {
    const url = `${this.apiUrl}/assign-evaluation-to-user/${userId}/${evaluationId}`;
    return this.authService.requestWithToken('POST', url, null);
  }
  addEvaluationAttempt(userId: any, evaluationId: any, score: any): Observable<any> {
    const url = `${this.apiUrl}/addEvaluationAttempt?userId=${userId}&evaluationId=${evaluationId}&score=${score}`;
    return this.authService.requestWithToken('POST', url, null);
  }

  getEvaluationAttemptsByUserId(idu: any): Observable<any[]> {
    const url = `${this.apiUrl}/getEvaluationAttemptsByUserId/${idu}`;
    return this.authService.requestWithToken('GET', url);
  }

  assignEvaluationtoClasse(idClasse: any, evaluationId: any): Observable<any> {
    const url = `${this.apiUrl}/assign-evaluation-to-class/${idClasse}/${evaluationId}`;
    return this.authService.requestWithToken('POST', url, null);
  }

}

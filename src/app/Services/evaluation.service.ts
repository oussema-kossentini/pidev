import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Evaluation } from '../Models/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:8081/api/evaluations';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    constructor(private http: HttpClient) { }

  getEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}/retrieve-all-evaluations`)
      .pipe(catchError(this.handleError));
  }

  getEvaluation(id: number | string): Observable<Evaluation> {
    return this.http.get<Evaluation>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(`${this.apiUrl}/addeval`, evaluation, this.httpOptions)
      .pipe(catchError(this.handleError));
      console.log(evaluation);
  }

  updateEvaluation(id: number | string, evaluation: Evaluation): Observable<any> {
    return this.http.put(`${this.apiUrl}/modify-evaluation/${id}`, evaluation, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteEvaluation(id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-evaluation/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

assignEvaluationToUser(userId:any,evaluationId:any){
      return this.http.post(`${this.apiUrl}/assign-evaluation-to-user/${userId}/${evaluationId}`,null)
}

countEvaluationsByCategory(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/count-evaluations-by-category`)
    .pipe(catchError(this.handleError));
}
}

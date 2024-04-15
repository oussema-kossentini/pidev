import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QA } from '../Models/qa.model';

@Injectable({
  providedIn: 'root'
})
export class QaService {
  private baseUrl = 'http://localhost:8081/api/qa'; // Ajustez selon votre configuration

  // Définition des options HTTP, notamment le type de contenu.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addQA(qa: QA): Observable<QA> {
    return this.http.post<QA>(`${this.baseUrl}/add`, qa, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  retrieveAllQA(): Observable<QA[]> {
    return this.http.get<QA[]>(`${this.baseUrl}/retrieve-all-qa`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  removeQA(qaId: string): Observable<any> {
    // Assurez-vous que l'URL est correctement formée.
    return this.http.delete(`${this.baseUrl}/remove-qa/${qaId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  modifyQA(id: string, qa: QA): Observable<QA> {
    return this.http.put<QA>(`${this.baseUrl}/modify-qa/${id}`, qa, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Méthode pour gérer les erreurs.
  private handleError(error: any) {
    // Ici, vous pouvez ajouter une meilleure gestion des erreurs.
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  assignQaToEvaluation(idQa: string, evaluationI: any) {
    return this.http.put(`${this.baseUrl}/assign-QA-Evaluation/${idQa}/${evaluationI}`,null)
  }

  getQaById(evaluationId: any):Observable<any[]> {
    return this.http.get<QA[]>(`${this.baseUrl}/getQaByEvaluationId/${evaluationId}`)
  }
}

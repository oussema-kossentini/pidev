import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Grade } from '../Models/grade.model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private baseUrl = 'http://localhost:8081/api/grades';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addGrade(grade: Grade): Observable<Grade> {
    return this.http.post<Grade>(`${this.baseUrl}/add/grade`, grade, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.baseUrl}/retrieve-all-grades`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteGrade(idGrade: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-grade/${idGrade}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateGrade(id: string, grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.baseUrl}/modify-grade/${id}`, grade, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Une erreur est survenue', error);
    return throwError(() => new Error('Une erreur est survenue; veuillez réessayer plus tard.'));
  }
}

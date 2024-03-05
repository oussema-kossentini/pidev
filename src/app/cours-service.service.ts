import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:8089/api/courses';
  private emailUrl = 'http://localhost:8089/send-email'; // Assuming your Spring Boot backend runs on port 8089

  constructor(private http: HttpClient) { }

  // Create
  addCourse(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add/course`, course)
      .pipe(
        tap(() => {
          this.sendEmail().subscribe(
            () => console.log('Email sent successfully'), 
            error => console.error('Error sending email:', error)
          );
        })
      );
  }

  // Send Email
  private sendEmail(): Observable<any> {
    return this.http.post<any>(this.emailUrl, {});
  }

  // Read
  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-all-courses`);
  }

  getCourseById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update
  updateCourse(id: any, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-cours/${id}`, course);
  }

  // Delete
  deleteCourse(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-Course/${id}`);
  }
}

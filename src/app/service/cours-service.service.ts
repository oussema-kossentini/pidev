import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8085/courszello/api/courses'; // URL pour les cours
  private apiUrll = 'http://localhost:8085/courszello/api/Content'; // URL pour les contenus
  private emailUrl = 'http://localhost:8085/courszello/send-email';
  constructor(private http: HttpClient, private authService: ServiceFazzetregisterService) {}

  addCourse(course: any): Observable<any> {
    const url = `${this.apiUrl}/add/course`;
    return this.authService.requestWithToken('POST', url, course).pipe(
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
    const url = `${this.apiUrl}/send-email`; // Assurez-vous que cette URL est correcte
    return this.authService.requestWithToken('POST', url, {});
  }

  // Read cours
  getAllCourses(): Observable<any[]> {
    const url = `${this.apiUrl}/retrieve-all-courses`;
    return this.authService.requestWithToken('GET', url);
  }

  getCourseById(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.authService.requestWithToken('GET', url);
  }

  // Update cours
  updateCourse(id: any, course: any): Observable<any> {
    const url = `${this.apiUrl}/modify-cours/${id}`;
    return this.authService.requestWithToken('PUT', url, course);
  }

  // Delete cours
  deleteCourse(id: any): Observable<any> {
    const url = `${this.apiUrl}/remove-Course/${id}`;
    return this.authService.requestWithToken('DELETE', url);
  }

  //Add Content
  addContenu(contenu: any): Observable<any> {
    const url = `${this.apiUrll}/add/Content`;
    return this.authService.requestWithToken('POST', url, contenu);
  }

  // Get content
  getAllContent(): Observable<any[]> {
    const url = `${this.apiUrll}/retrieve-all-contents`;
    return this.authService.requestWithToken('GET', url);
  }

  // Delete contenu
  deleteContenu(id: any): Observable<any> {
    const url = `${this.apiUrll}/remove-contents/${id}`;
    return this.authService.requestWithToken('DELETE', url);
  }

  // Update contenu
  updateContenu(id: any, contenu: any): Observable<any> {
    const url = `${this.apiUrll}/modify-content/${id}`;
    return this.authService.requestWithToken('PUT', url, contenu);
  }

  //get contenu by id
  getContenuById(id: any): Observable<any> {
    const url = `${this.apiUrll}/${id}`;
    return this.authService.requestWithToken('GET', url);
  }
}

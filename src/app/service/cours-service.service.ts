import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:8089/api/courses';
  private emailUrl = 'http://localhost:8089/send-email';
  private apiUrll = 'http://localhost:8089/api/Content';

  constructor(private http: HttpClient) { }
///njareb fi faza
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

  // Read cours
  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieve-all-courses`);
  }

  getCourseById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update cours
  updateCourse(id: any, course: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modify-cours/${id}`, course);
  }

  // Delete cours
  deleteCourse(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/remove-Course/${id}`);
  }


  //Add Content
  addContenu(course: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrll}/add/Content`, course);
  }
 // get content
  getAllContent(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrll}/retrieve-all-contents`);
  }
  // Delete cintenu
  deleteContenu(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrll}/remove-contents/${id}`);
  }
   // Update contenu
   updateContenu(id: any, contenu: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrll}/modify-content/${id}`, contenu);
  }
   //get contenu by id
  getContenuById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrll}/${id}`);
  }

}

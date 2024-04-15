import { Component } from '@angular/core';
import { CourseService } from '../../service/cours-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.component.html',
  styleUrl: './cours-details.component.scss'
})
export class CoursDetailsComponent {
  courses: any[] = [];

  constructor(private courseService: CourseService , private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getAllCourses()
      .subscribe(
        (data: any[]) => {
          this.courses = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  redirectToUpdateForm(courseId: any): void {
    if (courseId) { // Check if courseId is defined
      // Navigate to the modification form for the selected course
      this.router.navigate(['/coursUpdate', courseId]);
    } else {
      console.error('Course ID is undefined.');
    }
  }
  deleteCourse(courseId: any): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId)
        .subscribe(
          () => {
            // Filter out the deleted course from the courses array
            this.courses = this.courses.filter(course => course.id !== courseId);
            // Reload the component data
            this.getCourses();
          },
          (error) => {
            console.error('Error deleting course:', error);
          }
        );
    }
  }

  redirectToContenu() {
    // Redirect to '/add cours'
    this.router.navigate(['/contenuCours']);
  }



}

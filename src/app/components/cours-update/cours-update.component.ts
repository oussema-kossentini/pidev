import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../cours-service.service';

@Component({
  selector: 'app-cours-update',
  templateUrl: './cours-update.component.html',
  styleUrl: './cours-update.component.scss'
})
export class CoursUpdateComponent {

  courseId!: any;
  course: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['id']; // Ensure 'id' is not converted to a number
      this.loadCourse(this.courseId);
    });
  }

  loadCourse(id: any): void {
    // Make sure id is in the correct format expected by your API
    this.courseService.getCourseById(id).subscribe(
      (data) => {
        this.course = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateCourse(): void {
    this.courseService.updateCourse(this.courseId, this.course).subscribe(
      (data) => {
        console.log('Course updated successfully', data);
        // Redirect to course details page or any other page after update
        // For example:
        // this.router.navigate(['/courses', this.courseId]);
      },
      (error) => {
        console.log('Error updating course:', error);
      }
    );
    this.router.navigate(['/coursDetails']);
  }

  
  

}

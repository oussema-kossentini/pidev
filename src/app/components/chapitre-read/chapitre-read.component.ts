import { Component } from '@angular/core';
import { CourseService } from '../../service/cours-service.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chapitre-read',
  templateUrl: './chapitre-read.component.html',
  styleUrl: './chapitre-read.component.scss'
})
export class ChapitreReadComponent {
  content: any;
  contentId!: any;


  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contentId = params['id']; // Ensure 'id' is not converted to a number
      this.loadCourse(this.contentId);
    });
  }

  getContentById(): void {
    // Get the ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');

    // Fetch content by ID using the service
    if (id) {
      this.courseService.getContenuById(id).subscribe(
        (data) => {
          this.content = data;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('ID not provided in route parameters');
    }
  }

  loadCourse(id: any): void {
    // Make sure id is in the correct format expected by your API
    this.courseService.getContenuById(id).subscribe(
      (data) => {
        this.content = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

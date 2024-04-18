import { Component } from '@angular/core';
import { CourseService } from '../../service/cours-service.service';
import {ActivatedRoute, Router} from "@angular/router";
import { jsPDF } from 'jspdf';

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
  downloadAsPdf(): void {
    const doc = new jsPDF();

    // Add content title and body to the PDF
    doc.text(this.content.title, 10, 10); // (text, x, y)
    doc.text(this.content.body, 10, 20); // Adjust x, y positions as needed

    // Trigger PDF download
    doc.save(`${this.content.title}.pdf`);
  }

}

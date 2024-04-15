import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../service/cours-service.service';

@Component({
  selector: 'app-update-content',
  templateUrl: './update-content.component.html',
  styleUrl: './update-content.component.scss'
})
export class UpdateContentComponent {
  contentId!: any;
  Contenu: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contentId = params['id']; // Ensure 'id' is not converted to a number
      this.loadCourse(this.contentId);
    });
  }

  loadCourse(id: any): void {
    // Make sure id is in the correct format expected by your API
    this.courseService.getContenuById(id).subscribe(
      (data) => {
        this.Contenu = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateContent(): void {
    this.courseService.updateContenu(this.contentId, this.Contenu).subscribe(
      (data) => {
        console.log('content updated successfully', data);

      },
      (error) => {
        console.log('Error updating content:', error);
      }
    );
    this.router.navigate(['/contenuCours']);
  }



}

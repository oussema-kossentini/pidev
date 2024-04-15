import { Component } from '@angular/core';
import { CourseService } from '../../cours-service.service';
import { Router } from '@angular/router';
import { Contenu } from '../../contenu';
@Component({
  selector: 'app-add-contenu',
  templateUrl: './add-contenu.component.html',
  styleUrl: './add-contenu.component.scss'
})
export class AddContenuComponent {
  courses: any[] = [];

  
  Contenu = new Contenu();
  showAlert = false;
  constructor(private CourseService: CourseService , private router: Router) { }

  ngOnInit() {
    this.getCourses();
  }

  closeAlert() {
    this.showAlert = false;
  }
  saveStudent() {
    this.CourseService.addContenu(this.Contenu).subscribe((response) => {
      console.log(response);
      this.showAlert = true;
      this.Contenu = new Contenu();
      this.router.navigate(['/contenuCours']);
    });
  }

  getCourses(): void {
    this.CourseService.getAllCourses()
      .subscribe(
        (data: any[]) => {
          this.courses = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }


}

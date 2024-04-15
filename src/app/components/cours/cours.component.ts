import { Component } from '@angular/core';
import { Cours } from '../../cours';
import { CourseService } from '../../service/cours-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.scss'
})
export class CoursComponent {

  Cours = new Cours();
  showAlert = false;
  constructor(private CourseService: CourseService , private router: Router) { }

  ngOnInit() {
  }

  closeAlert() {
    this.showAlert = false;
  }
  saveStudent() {
    this.CourseService.addCourse(this.Cours).subscribe((response) => {
      console.log(response);
      this.showAlert = true;
      this.Cours = new Cours();
      this.router.navigate(['/coursDetails']);
    });
  }


}

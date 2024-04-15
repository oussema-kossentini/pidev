import { Component,OnInit ,ViewChild} from '@angular/core';
import { ClasseService } from '../../Service/classe.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classe-list',
  templateUrl: './classe-list.component.html',
  styleUrls: ['./classe-list.component.scss']
})
export class ClasseListComponent implements OnInit {
  ClassList: any[] = [];
  errorMessage: string = '';
  classe:any[] = [];
  levels: any[] = [];

  constructor(
    private classeService: ClasseService,
    private formBuilder: FormBuilder,
    private router: Router  
  ) {
    this.loadClass(); 
    this.loadLevels(); 
  }

  editClass(classId: string) {
    this.router.navigate(['/edit-classe', classId]);
  }
  ngOnInit(): void {
    this.loadClass();

  }

  loadClass() {
    this.classeService.getAllClasse().subscribe(
      data => {
        this.ClassList = data;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des classes: ' + error.message;
      }
    );
  }

  deleteClass(id: string) {
    if(confirm('Are you sure to delete this class?')) {
      this.classeService.deleteClass(id).subscribe(
        () => {
          console.log('Class deleted successfully');
          this.loadClass();
        },
        error => console.log('Error during class deletion', error)
      );
    }
  }

  
  editClasse(classe: any): void {
    classe.editing = true; // Activate edit mode for the user
    alert(`Editing class: ${classe.name}`); 
  }
  

  saveChanges(classe: any): void {
    classe.editing = false; // Deactivate edit mode for the user
    this.classeService.modifyClasse(classe).subscribe({
      next: (response) => {
        console.log('class modified successfully:', response);
        // Handle successful response, e.g., display confirmation message
      },
      error: (error) => {
        console.error('Error modifying :', error);
        // Handle error, e.g., display error message to user
      }
    });
  }
  loadLevels() {
    this.classeService.getLevel().subscribe(
      data => {
        this.levels = data;
      },
      error => console.log('Erreur lors du chargement des classes', error)
    );
  }
}

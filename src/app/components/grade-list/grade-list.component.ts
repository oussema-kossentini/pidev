import { Component, OnInit } from '@angular/core';
import { GradeService } from '../../Services/grade.service';
import { MatDialog } from '@angular/material/dialog';
import { Grade } from '../../Models/grade.model';
import Swal from 'sweetalert2';
import { AddGradeComponent } from '../add-grade/add-grade.component'; // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {
  grades: Grade[] = [];

  constructor(private gradeService: GradeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.gradeService.getAllGrades().subscribe({
      next: (grades) => {
        this.grades = grades;
      },
      error: (err) => console.error(err)
    });
  }

  deleteGrade(idGrade: string): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.gradeService.deleteGrade(idGrade).subscribe(() => {
          Swal.fire('Supprimé!', 'La note a été supprimée avec succès.', 'success');
          this.loadGrades();
        });
      }
    });
  }

  editGrade(grade: Grade): void {
    const dialogRef = this.dialog.open(AddGradeComponent, {
      width: '500px',
      data: { grade: grade }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadGrades();
    });
  }
}

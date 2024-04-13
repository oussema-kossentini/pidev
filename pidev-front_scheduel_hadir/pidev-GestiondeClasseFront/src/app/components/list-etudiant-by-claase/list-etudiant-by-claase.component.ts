import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../Service/classe.service';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-etudiant-by-claase',
  templateUrl: './list-etudiant-by-claase.component.html',
  styleUrl: './list-etudiant-by-claase.component.scss'
})
export class ListEtudiantByClaaseComponent implements OnInit {
  EtudianList: any[] = [];
  idClasse:any;
  errorMessage: string = '';
  constructor(
    private classeService:ClasseService,
    private formBuilder: FormBuilder ,
   private router: Router,
   private route:ActivatedRoute
  ) {
    this.loadClass();
    // this.loadTitels();
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idClasse = params['idClasse'];
    this.loadClass();

  });
}

  loadClass() {
    this.classeService.getEtudiantFromClass(this.idClasse).subscribe(
      data => {
        this.EtudianList = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des etudiants dans classe: ' + error.message;
      }
    );
  }

  goTOEtudiantAff():void {
    console.log();
    this.router.navigate(['/list-etudiant-to-affect/',this.idClasse])

    }



}

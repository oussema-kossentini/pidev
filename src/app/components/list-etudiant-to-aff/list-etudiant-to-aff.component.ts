import { Component } from '@angular/core';
import { ClasseService } from '../../Service/classe.service';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-etudiant-to-aff',
  templateUrl: './list-etudiant-to-aff.component.html',
  styleUrl: './list-etudiant-to-aff.component.scss'
})
export class ListEtudiantToAffComponent {
  EtudianLists:any []=[];
  errorMessage:any;
  idClasse:any;
  constructor(
    private classeService:ClasseService,
    private formBuilder: FormBuilder,
   private router: Router ,
  private route:ActivatedRoute
  ) 
  {
    this.loadlistEtudiants(); 
    // this.loadTitels();
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idClasse = params['idClasse'];
      this.loadlistEtudiants();
  });
}

  loadlistEtudiants() {
    this.classeService.getEtudiant().subscribe(
      data => {
        this.EtudianLists = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des etudiants dans classe: ' + error.message;
      }
    );
  }

  
  affectationEtudiant(idUser:any) {
    this.classeService.affecterUserInClass(idUser,this.idClasse).subscribe();
    this.router.navigate(['/list-etudiant-by-claase/',this.idClasse]);
  }
}

import { Component } from '@angular/core';
import { ClasseService } from '../../Service/classe.service';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-enseignat-to-aff',
  templateUrl: './list-enseignat-to-aff.component.html',
  styleUrl: './list-enseignat-to-aff.component.scss'
})
export class ListEnseignatToAffComponent {
  EnseignatLists: any[] = [];
  errorMessage: any;
  idUser: any;
  idClasse: any;
  constructor(
    private classeService: ClasseService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadlistEnseignats();

    // this.loadTitels();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idClasse = params['idClasse'];
      this.loadlistEnseignats();

    });
  }

  loadlistEnseignats() {
    this.classeService.getEnseignat().subscribe(
      data => {
        this.EnseignatLists = data;
        console.log(data, "ttttttttttttttttttttttttttttttttt");
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des etudiants dans classe: ' + error.message;
      }
    );
  }


  affectationEnseignat(idUser: any) {
    this.classeService.affecterUserInClass(idUser, this.idClasse).subscribe();
    this.router.navigate(['/list-ensignat-by-claase/', this.idClasse]);
  }
}

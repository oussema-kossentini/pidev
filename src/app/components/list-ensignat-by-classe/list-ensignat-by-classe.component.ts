import { Component } from '@angular/core';
import { ClasseService } from '../../Service/classe.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ensignat-by-classe',
  templateUrl: './list-ensignat-by-classe.component.html',
  styleUrl: './list-ensignat-by-classe.component.scss'
})
export class ListEnsignatByClasseComponent {
  ProfList: any[] = [];
  idClasse:any;
  errorMessage: string = '';
  constructor(
    private classeService:ClasseService,
    private formBuilder: FormBuilder,
   private router: Router ,
   private route:ActivatedRoute
  ) {
    this.loadEnsignat(); 
    // this.loadTitels();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idClasse = params['idClasse'];
    this.loadEnsignat();

  });
}
naviguerAvecUrlActuelle() {
  // Extrait l'ID de l'URL actuelle. Adaptez le chemin si nécessaire.
  const idClasse = this.route.snapshot.paramMap.get('idClasse');

  // Construit la nouvelle URL en utilisant l'ID extrait.
  // Modifiez '/nouveauChemin/' par le chemin souhaité.
  const nouvelleUrl = `/ajouterEtoS/${idClasse}`;

  // Navigue vers la nouvelle URL.
  this.router.navigateByUrl(nouvelleUrl);
}
  loadEnsignat() {
    this.classeService.getProfessorFromClass(this.idClasse).subscribe(
      data => {
        this.ProfList = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des etudiants dans classe: ' + error.message;
      }
    );
  }

  goTOEnseigAff():void {
    console.log();
    this.router.navigate(['/list-enseignat-to-aff/',this.idClasse])

    }
    affectationEnseignat():void{


    }

}

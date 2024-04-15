import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../Service/classe.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecialiteService } from '../../Service/specialite.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {Classe} from "../../classe";

@Component({
  selector: 'app-show-classe-sp',
  templateUrl: './show-classe-sp.component.html',
  styleUrl: './show-classe-sp.component.scss'
})
export class ShowClasseSpComponent  implements OnInit{

  ClassList: any[] = [];
  errorMessage: string = '';
  classe:any[] = [];
  levels: any[] = [];
  LlistClass:Classe[]=[];
  id:any ;

  constructor(
    private classeService: ClasseService,
    private specialiteService:SpecialiteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router:Router

   // private router: Router
  ) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.loadClass();

  }

  loadClass() {
    this.specialiteService.getSpecialiteById2(this.id).subscribe(
      data => {
        this.ClassList = data;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des classes: ' + error.message;
      }
    );
  }

  goTOEtudiant(idClasse:any):void {
    console.log(idClasse);
    this.router.navigate(['/list-etudiant-by-claase/',idClasse])

    }


    goTOEnsignat(idClasse:any):void {
      console.log(idClasse);
      this.router.navigate(['/list-ensignat-by-claase/',idClasse])
      }

  deleteClasse(idClasse: string) {
    if(confirm('Are you sure to delete this class?')) {
      this.classeService.deleteClasseParSpecialite(idClasse).subscribe(
        () => {
          console.log('Class deleted successfully');
          this.loadClass();
        },
        error => console.log('Error during class deletion', error)
      );
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase(); // Trim and convert input to lowercase

    if (filterValue !== "") {
      // Filter the list based on the input value
      this.ClassList = this.ClassList.filter(item => item.nameClasse.toLowerCase().startsWith(filterValue));
    } else {
      // If the input is empty, reset the list (e.g., fetch data again)
      this.ngOnInit();
    }
  }


}

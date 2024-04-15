import { Component } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Route, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {SpecialiteService} from "../../Service/specialite.service";

@Component({
  selector: 'app-nav-etudiant-spec',
  templateUrl: './nav-etudiant-spec.component.html',
  styleUrl: './nav-etudiant-spec.component.scss'
})
export class NavEtudiantSpecComponent {
  SpecList: any[] = [];
  errorMessage: string = '';
  titels: any[] = [];
  specialite:any[] = [];
  constructor(
    private specialiteService: SpecialiteService,
    private formBuilder: FormBuilder ,
    private router: Router
  ) {
    this.loadSpecialite();
    // this.loadTitels();
  }
  ngOnInit(): void {
    this.loadSpecialite();

  }
  loadSpecialite() {
    this.specialiteService.getAllSpecialite().subscribe(
      data => {
        this.SpecList = data;
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des classes: ' + error.message;
      }
    );
  }

}

import { Component } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {SpecialiteService} from "../../Service/specialite.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {ClasseService} from "../../Service/classe.service";

@Component({
  selector: 'app-specialitynavetudiant',
  templateUrl: './specialitynavetudiant.component.html',
  styleUrl: './specialitynavetudiant.component.scss'
})
export class SpecialitynavetudiantComponent {
  SpecList: any[] = [];
  errorMessage: string = '';
  titels: any[] = [];
  specialite:any[] = [];
  constructor(
    private specialiteService: SpecialiteService,
    private ClasseService:ClasseService,
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

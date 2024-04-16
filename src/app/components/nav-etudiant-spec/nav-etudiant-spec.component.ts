import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Route, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {SpecialiteService} from "../../service/specialite.service";
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import {isPlatformBrowser} from "@angular/common";
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
  isBrowser :Boolean;
  constructor(
    private specialiteService: SpecialiteService,
    private formBuilder: FormBuilder ,
    public authService: ServiceFazzetregisterService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.loadSpecialite();
    // this.loadTitels();
    this.isBrowser = isPlatformBrowser(platformId);
  }
  ngOnInit(): void {
    this.loadSpecialite();

  }
  loadSpecialite() {
    // Reset errorMessage each time the method is called
    this.errorMessage = '';

    // Récupération du token JWT via le service d'authentification
    const token = this.authService.getJwtToken();

    if (token == null) {
      this.errorMessage = 'Token not found';
      console.error(this.errorMessage);
      return;  // Arrêter le chargement si le token n'est pas trouvé
    }

    this.specialiteService.getAllSpecialite(token).subscribe({
      next: (data) => {
        this.SpecList = data;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Une erreur s\'est produite lors du chargement des spécialités: ' + error.message;
        console.error(this.errorMessage);
      }
    });
  }

}

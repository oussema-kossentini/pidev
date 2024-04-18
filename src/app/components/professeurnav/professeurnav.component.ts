import {Component, OnInit} from '@angular/core';
import {SpecialiteService} from "../../service/specialite.service";
import { SpecialiteDto } from "../../models/SpecialiteDto";
import { ServiceFazzetregisterService } from "../../service/service-fazzetregister-service.service";

@Component({
  selector: 'app-professeurnav',
  templateUrl: './professeurnav.component.html',
  styleUrl: './professeurnav.component.scss'
})
export class ProfesseurnavComponent implements OnInit{
  specialites: SpecialiteDto[] = [];
  error: string | null = null;

  constructor(private specialiteService: SpecialiteService, public authService: ServiceFazzetregisterService) { }
//ibtiii
  ngOnInit(): void {
    const x = localStorage.getItem("token");
    if (x) {
      const userId = this.authService.decodeJwt(x).userId;
      this.loadSpecialites(userId);
    }
  }

  loadSpecialites(userId: string): void {
    this.specialiteService.getSpecialiteAndClasseFromProfesseur(userId).subscribe({
      next: (data) => this.specialites = data,
      error: (err) => this.error = 'Failed to load specialities: ' + err
    });
  }

}

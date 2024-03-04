import { Component,OnInit } from '@angular/core';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { Init } from 'v8';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isAdmin: boolean = false;

constructor(public authService: ServiceFazzetregisterService) {
  this.authService.isAdmin$.subscribe(isAdmin => {
    this.isAdmin = isAdmin;
    console.log(`Received isAdmin status: ${isAdmin}`);
  });
}

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.authService.decodeJwt(token); // Mettez à jour l'état d'authentification basé sur le token
      this.authService.updateIsAdminStatus(); // Actualisez le statut admin
    }
  }

}

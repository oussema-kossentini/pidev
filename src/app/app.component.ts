import { Component } from '@angular/core';
import { ServiceFazzetregisterService } from './service/service-fazzetregister-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'testALpha';

  constructor(public authService: ServiceFazzetregisterService) {
    // L'initialisation de l'état d'authentification est gérée par AuthService
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {





  constructor(private authService: ServiceFazzetregisterService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Si l'utilisateur est déjà connecté, redirigez vers la page d'accueil
      this.router.navigate(['/evaluation']); // Remplacez '/home' par la route de votre page d'accueil
      return false;
    }
    return true;
  }
}



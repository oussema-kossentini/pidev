import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate {
  constructor(private authService: ServiceFazzetregisterService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn()) {
      // Si l'utilisateur est déjà connecté et tente d'accéder à la page de connexion ou d'inscription,
      // redirigez-le vers la page d'accueil ou une autre page.
      if (url.includes('/login') || url.includes('/register')) {
        this.router.navigate(['/home']); // Ajustez selon votre route d'accueil
        return false;
      }
      return true;
    } else {
      // Si l'utilisateur n'est pas connecté et tente d'accéder à une page nécessitant l'authentification,
      // redirigez-le vers la page de connexion.
      if (url.includes('/account-settings') || url.includes('/evaluation')) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: url } }); // Ajoutez `returnUrl` pour potentiellement rediriger l'utilisateur après la connexion
        return false;
      }
      // Pour les pages accessibles sans authentification, permettez l'accès
      return true;
    }
  }
}

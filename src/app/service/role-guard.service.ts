import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authService: ServiceFazzetregisterService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;
    if (this.authService.isLoggedIn() && requiredRoles.some(role => this.authService.hasRole(role))) {
      return true;
    }
    this.router.navigate(['/evaluation']);
    return false;
  }
}

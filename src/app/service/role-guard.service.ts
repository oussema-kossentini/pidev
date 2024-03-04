import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';
@Injectable({
  providedIn: 'root'
})
export class RoleGuardService  implements CanActivate{


  constructor(private authService: ServiceFazzetregisterService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}



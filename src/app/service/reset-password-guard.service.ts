import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ServiceFazzetregisterService } from './service-fazzetregister-service.service'; // Assurez-vous que le chemin d'importation est correct

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuardService implements CanActivate {
  constructor(private passwordResetService: ServiceFazzetregisterService, private router: Router) {}

  canActivate(): boolean {
    if (this.passwordResetService.isResetCodeVerified()) {
      // Si le code de réinitialisation a été vérifié, autorise l'accès
      return true;
    } else {
      // Sinon, redirige vers la page de demande de réinitialisation de mot de passe
      this.router.navigate(['/forget-password']); // Assurez-vous que le chemin est correct
      return false;
    }
  }
}

import { Component } from '@angular/core';
import zxcvbn from 'zxcvbn';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  userEmail: string = '';
  passwordStrength: number = 0;
  someThreshold: number = 70;

  constructor(private authService: ServiceFazzetregisterService) {
    this.userEmail = this.authService.getEmail();
  }

  updatePassword() {
    if (this.newPassword !== this.confirmPassword) {
      console.error("Les mots de passe ne correspondent pas.");
      return;
    }

    if (this.passwordStrength < this.someThreshold) {
      console.error("Le mot de passe n'est pas assez fort.");
      return;
    }

    this.authService.updateUserPassword(this.userEmail, this.newPassword).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error('Error:', error)
    });
  }
  getStrengthClass(score: number): string {
    if (score <= 20) return 'very-weak'; // 0-20%
    if (score > 20 && score <= 40) return 'weak'; // 21-40%
    if (score > 40 && score <= 60) return 'medium'; // 41-60%
    if (score > 60 && score <= 80) return 'strong'; // 61-80%
    if (score > 80) return 'very-strong'; // 81-100%
    return ''; // Retour par défaut si nécessaire
  }


  getStrengthText(score: number): string {
    // Convertit le score de zxcvbn (0 à 4) en texte descriptif
    switch(true) {
      case (score <= 20):
        return 'Très faible';
      case (score > 20 && score <= 40):
        return 'Faible';
      case (score > 40 && score <= 60):
        return 'Moyen';
      case (score > 60 && score <= 80):
        return 'Fort';
      case (score > 80):
        return 'Très fort';
      default:
        return 'Indéterminé';
    }
  }

  onInputChange() {
    if (this.newPassword) {
      const results = zxcvbn(this.newPassword);
      this.passwordStrength = results.score * 20; // Convertit en pourcentage pour le modèle
    }
  }
}

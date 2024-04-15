import { Component } from '@angular/core';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  email: string = '';
  resetToken: string = '';
  showCodeInput: boolean = false;
  showResendButton: boolean = false;

  constructor(private passwordResetService: ServiceFazzetregisterService, private router: Router) {}

  requestPasswordReset() {
    this.passwordResetService.requestPasswordReset(this.email).subscribe({
      next: (response) => {
        console.log(response);
        this.passwordResetService.setEmail(this.email);
        this.showCodeInput = true;
        this.showResendButton = false; // Hide the resend button immediately after clicking
        setTimeout(() => this.showResendButton = true, 10000); // 10 seconds delay for resend button
      },
      error: (error) => console.error('Error:', error)
    });
  }

  /*verifyResetCode() {


    this.passwordResetService.verifyResetCode(this.email, this.resetToken).subscribe({
      next: (response) => {
        console.log(response);
      this.router.navigate(['/change-password']); // Redirect to change password page
      },
      error: (error) => console.error('Error:', error)
    });

  }*/

  verifyResetCode() {
    this.passwordResetService.verifyResetCode(this.email, this.resetToken).subscribe({
      next: (response) => {
        console.log(response);
        // Update the reset code verified status on successful verification
        this.passwordResetService.setResetCodeVerified(true);
        this.router.navigate(['/change-password']); // Redirect to change password page
      },
      error: (error) => {
        console.error('Error:', error);
        // Optionally reset the verified status or handle the error
        this.passwordResetService.setResetCodeVerified(false);
        console.log('Reset code verification failed');
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { environment } from './environment';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  loginForm: FormGroup;
  passwordVisible = false;
  isBrowser :Boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: ServiceFazzetregisterService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  )

  {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  loginWithGoogle() {
    // URL pour la demande d'authentification Google OAuth2
    const googleLoginURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.googleClientId}&redirect_uri=${environment.redirectUri}&response_type=code&scope=email profile&access_type=online`;

    window.location.href = googleLoginURL;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        data => {
          // handle successful login here
        //  this.router.navigate(['/evaluation']);
        // Après connexion réussie
const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/evaluation';
this.router.navigateByUrl(returnUrl);

        },
        error => {
          // handle error here
        }
      );
    }
  }


  handleReset() {
    console.log('reCAPTCHA reset');
  }

  handleExpire() {
    console.log('reCAPTCHA expired');
  }

  handleLoad() {
    console.log('reCAPTCHA loaded');
  }

  handleSuccess(event: string) {
    console.log('reCAPTCHA success', event);
  }
}

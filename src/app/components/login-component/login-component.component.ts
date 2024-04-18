import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { environment } from './environment';
import { HttpClient } from '@angular/common/http';

declare const FB: any;
declare global {
  interface Window {
    handleCredentialResponse: any;
  }
}
@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit,AfterViewInit  {
  loginForm: FormGroup;
  passwordVisible = false;
  isBrowser :Boolean;

  constructor(
    private http: HttpClient,
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


  ngAfterViewInit() {
    window.handleCredentialResponse = this.handleCredentialResponse.bind(this);
  }


  handleCredentialResponse(response: any) {
    // Log the entire response object
    console.log('Google Sign-In Response:', response.credential);
    // Extract the ID token from the response
    const token = response.credential;

    // Now, you can send this token to your backend for authentication
    this.sendTokenToBackend(token);
  }

  sendTokenFacebookToBackend(token: string) {
    this.http.post(`http://localhost:8085/courszello/api/auth/facebook`,  token ).subscribe(
      (data:any) => {
        // handle successful response here
        console.log(data);
        const email = data.email;
        this.authService.siginWithGoogle(email).subscribe(
          data => {
            // handle successful login here
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account-settings';
            this.router.navigateByUrl(returnUrl);
          },
          error => {
            // handle error here
          }
        );
      }
    );
  }

  sendTokenToBackend(token: string) {

    this.http.post('http://localhost:8085/courszello/api/auth/google', token)
      .subscribe(
      (data:any) => {
        // handle successful response here


        console.log(data);
        const email = data.email;
        this.authService.siginWithGoogle(email).subscribe(
          data => {
            // handle successful login here
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account-settings';
            this.router.navigateByUrl(returnUrl);
          },
          error => {
            // handle error here
          }
        );
      }
    );
  }
  ngOnInit(): void {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '304807085822295',
        cookie     : true,
        xfbml      : true,
        version    : 'v13.0'
      });
    };
  }



  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }



  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        data => {
          // handle successful login here
          //  this.router.navigate(['/evaluation']);
          // Après connexion réussie
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account-settings';
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

  loginWithFacebook(){
    FB.login((response: any) => {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        const accessToken = response.authResponse.accessToken;

        console.log(accessToken);
        this.sendTokenFacebookToBackend(accessToken);
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });

  }
}

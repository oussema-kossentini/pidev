import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-google-callback',
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.scss'
})
export class GoogleCallbackComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: ServiceFazzetregisterService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object

  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params['code'];
      console.log('Code from query params:', code);
      if (code) {
        this.authService.exchangeGoogleCodeForToken(code).subscribe({
          next: (response) => {
            if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem('jwtToken', response.jwtToken);
            this.router.navigate(['/evaluation']);
            }
          },
          error: (error) => {
            console.error('Error exchanging Google code for token:', error);
            // Handle error
          },
        });
      }
    });
  }
}

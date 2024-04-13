// google-callback.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-google-callback',
  templateUrl: './google-callback.component.html',
  styleUrls: ['./google-callback.component.scss']
})
export class GoogleCallbackComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: ServiceFazzetregisterService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    this.processOAuth2Redirect();
  }

  processOAuth2Redirect() {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    if (token && isPlatformBrowser(this.platformId)) {
      this.authService.saveToken(token);

      const userInfo = this.authService.decodeJwt(token);
      if (userInfo) {
        localStorage.setItem('firstName', userInfo.firstName);
        localStorage.setItem('lastName', userInfo.lastName);
        localStorage.setItem('email', userInfo.email);
        localStorage.setItem('idUser', userInfo.idUser);
        // Redirigez l'utilisateur vers une page appropriée après l'enregistrement des informations
        this.router.navigate(['/evaluation']);
      } else {
        // Gérer l'erreur de décodage du token
        console.log('Invalid token');
      }
    }
  }
}

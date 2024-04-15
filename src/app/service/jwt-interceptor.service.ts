import { ServiceFazzetregisterService } from './service-fazzetregister-service.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
constructor(private authService: ServiceFazzetregisterService, private router: Router,){}


  intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
    // Vérifiez si la réponse est une erreur 401 (non autorisée)
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403 || error.status === 0)  {

          this.authService.logoutUser().subscribe(() => {
            // Redirection vers la page de connexion
            
            this.router.navigate(['/login']);
          });

         // this.authService.removeToken();
         // this.authService.isLoggedIn;
         // this.router.navigate(['/login']);
          //return throwError(() => new Error('Session expired. Please login again.'));
        }
        throw error;
      })
    );
  }
}


import { Injectable,Inject,PLATFORM_ID } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
2
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Vérifier si on est dans un navigateur avant d'accéder à sessionStorage
    if (isPlatformBrowser(this.platformId)) {
      const jwtToken = sessionStorage.getItem('token'); // L'accès à sessionStorage se fait ici

      if (jwtToken) {
        const cloned = req.clone({
          headers: req.headers.set("Authorization", `Bearer ${jwtToken}`)
        });

        return next.handle(cloned);
      } else {
        return next.handle(req);
      }
    } else {
      // Si ce n'est pas un navigateur, simplement passer la requête sans modifier
      return next.handle(req);
    }
  }
  }


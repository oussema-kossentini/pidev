import { Component } from '@angular/core';
import { ServiceFazzetregisterService } from '../../service/service-fazzetregister-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {




  isAdmin: boolean = false;

constructor(public authService: ServiceFazzetregisterService,public router :Router) {
  this.authService.isAdmin$.subscribe(isAdmin => {
    this.isAdmin = isAdmin;
    console.log(`Received isAdmin status: ${isAdmin}`);
  });
}


ngOnInit(): void {
  this.authService.checkAndUpdateIsAdminStatus();
}
logout() {
  // Supprime le token de session
  this.authService.logoutUser();

   this.router.navigate(['/login']);

}

}

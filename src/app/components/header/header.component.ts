import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor( private router: Router) { }


  redirectToAddRoute() {
    // Redirect to '/add cours'
    this.router.navigate(['/addCours']);
  }

  redirectToListRoute() {
    // Redirect to '/list cours'
    this.router.navigate(['/coursDetails']);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-prof',
  templateUrl: './final-prof.component.html',
  styleUrls: ['./final-prof.component.scss'] // Corrigez 'styleUrl' en 'styleUrls'
})
export class FinalProfComponent implements OnInit {
  hadirs: any[] = [];
  constructor() { }

  ngOnInit(): void {
    // Code d'initialisation ici
  }
}

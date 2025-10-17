import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Totvs Fintech Products';
  currentYear: number; // Adicione esta linha

  constructor() {
    this.currentYear = new Date().getFullYear(); // Inicialize no construtor
  }
}
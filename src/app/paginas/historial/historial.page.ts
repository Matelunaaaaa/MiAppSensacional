import { Component } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage {
  translationHistory: string[] = [];

  constructor() {
    this.loadHistory();
  }

  // Cargar el historial desde localStorage
  loadHistory() {
    const storedHistory = localStorage.getItem('translationHistory');
    if (storedHistory) {
      this.translationHistory = JSON.parse(storedHistory);
    }
  }
}

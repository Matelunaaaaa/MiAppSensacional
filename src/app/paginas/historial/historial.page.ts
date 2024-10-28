import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  translationHistory: { input: string; translation: string; idioma: string }[] = [];
  idiomaGuardado: string = '';

  ngOnInit() {
    this.loadHistory();
    this.idiomaGuardado = localStorage.getItem('idiomadetraduccion') || '';
  }

  loadHistory() {
    const history = localStorage.getItem('translationHistory');
    if (history) {
      this.translationHistory = JSON.parse(history);
    }
  }
}

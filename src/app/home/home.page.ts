import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../servicios/translation.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  inputText: string = '';
  targetLang: string = 'auto';
  translatedText: string = '';
  translationHistory: string[] = []; // Historial de textos ingresados

  constructor(private translationService: TranslationService, private router: Router) {
    this.loadHistory(); // Cargar el historial al iniciar
  }

  // Método para traducir el texto
  async translate(text: string, targetLang: string) {
    if (!text || text.trim() === '') {
      alert('Por favor, ingrese un texto para traducir.');
      return;
    }

    try {
      const response = await firstValueFrom(this.translationService.translateText(text, targetLang));
      this.translatedText = response.translatedText;

      // Guardar el texto en el historial
      this.saveToHistory(text);
    } catch (error) {
      console.log('Error al traducir:', error);
      alert('Error al traducir: ' + error);
    }
  }

  // Método para guardar el texto ingresado en el historial
  saveToHistory(text: string) {
    if (text.trim()) {
      this.translationHistory.push(text);
      localStorage.setItem('translationHistory', JSON.stringify(this.translationHistory)); // Guardar en localStorage
    }
  }

  // Cargar el historial guardado desde localStorage
  loadHistory() {
    const storedHistory = localStorage.getItem('translationHistory');
    if (storedHistory) {
      this.translationHistory = JSON.parse(storedHistory);
    }
  }

  // Método para navegar a la página del historial
  navigateToHistorial() {
    this.router.navigate(['/historial']);
  }
}

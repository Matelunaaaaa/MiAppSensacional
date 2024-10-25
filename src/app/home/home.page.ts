// home.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../servicios/translation.service';
import { firstValueFrom } from 'rxjs';

// Define la interfaz de la respuesta de la API
interface TranslationResponse {
  translations: Array<{ text: string }>;
}

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
    this.loadHistory();
  }

  // Método para traducir el texto
  async translate(text: string, targetLang: string) {
    if (!text || text.trim() === '') {
      alert('Por favor, ingrese un texto para traducir.');
      return;
    }

    try {
      // Asegúrate de que la respuesta sea del tipo TranslationResponse
      const response: TranslationResponse = await firstValueFrom(this.translationService.translateText(text, targetLang));

      // Verificar y asignar la traducción
      if (response && response.translations && Array.isArray(response.translations) && response.translations.length > 0) {
        this.translatedText = response.translations[0].text;
      } else {
        alert('No se recibió la traducción esperada.');
      }

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
    const history = localStorage.getItem('translationHistory');
    if (history) {
      this.translationHistory = JSON.parse(history);
    }
  }
}

import { Component } from '@angular/core';
import { TranslationService } from '../servicios/translation.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  inputText: string = ''; // Para capturar el texto del usuario
  targetLang: string = 'auto'; // Idioma de destino para la traducción
  translatedText: string = ''; // Texto traducido
  translationHistory: string[] = []; // Historial de los textos ingresados

  constructor(private translationService: TranslationService) {}

  async translate(text: string, targetLang: string) {
    if (!text || text.trim() === '') {
      alert('Por favor, ingrese un texto para traducir.');
      return;
    }

    // Guardar el texto ingresado en el historial antes de traducir
    this.saveToHistory(text);

    try {
      const response = await firstValueFrom(this.translationService.translateText(text, targetLang));
      this.translatedText = response.translatedText;
    } catch (error) {
      console.error('Error al traducir:', error);
      alert('Error al traducir: ' + error);
    }
  }

  // Método para guardar el texto ingresado en el historial
  saveToHistory(text: string) {
    if (text.trim()) {
      this.translationHistory.push(text); // Guarda el texto en el historial
      console.log('Historial actualizado:', this.translationHistory); // Para verificar que se guarda correctamente
    }
  }
}

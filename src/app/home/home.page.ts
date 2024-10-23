import { Component } from '@angular/core';
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

  constructor(private translationService: TranslationService) {}

  async translate(text: string, targetLang: string) {
    if (!text || text.trim() === '') {
      alert('Por favor, ingrese un texto para traducir.');
      return;
    }
  
    try {
      const response = await firstValueFrom(this.translationService.translateText(text, targetLang));
      this.translatedText = response.translatedText;
    } catch (error) {
      console.error('Error al traducir:', error);
      alert('Error al traducir: ' + error);
    }
  }
}
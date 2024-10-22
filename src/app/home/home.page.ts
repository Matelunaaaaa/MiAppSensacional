import { Component } from '@angular/core';
import { TranslationService } from '../servicios/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  inputText: string = '';
  targetLang: string = 'es';  // Código de idioma para español
  translatedText: string = '';

  constructor(private translationService: TranslationService) {}

  translate(text: string, targetLang: string) {
    this.translationService.translateText(text, targetLang).subscribe(
      (response) => {
        this.translatedText = response.translatedText;
      },
      (error) => {
        console.error('Error al traducir:', error);
        alert('Error al traducir: ' + error.message); // Para mostrar el error al usuario
      }
    );
  }
}

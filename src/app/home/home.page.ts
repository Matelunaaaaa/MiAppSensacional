import { Component } from '@angular/core';
import { TranslationService } from '../servicios/translation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  translatedText: string = '';
  inputText: string = '';
  targetLang: string = 'ES';
  translateText: string = '';

  constructor(private translationService: TranslationService) {}

  translate(text: string, targetLang: string) {
    this.translationService.translateText(text, targetLang).subscribe(
      (response) => {
        this.translatedText = response.translations[0].text;
      },
      (error) => {
        console.error('Error al traducir:', error);
      }
    );
  }
}

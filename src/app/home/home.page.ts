import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/servicios/translation.service';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { firstValueFrom } from 'rxjs';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  inputText: string = '';
  targetLang: string = 'en';
  translatedText: string = '';
  translationHistory: { input: string; translation: string; idioma: string }[] = [];
  recording = false;
  idiomadetraduccion: string = '';
  db = getFirestore();

  constructor(
    private translationService: TranslationService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.loadHistory();
    SpeechRecognition.requestPermissions();
  }

  async startRecognition() {
    const { available } = await SpeechRecognition.available();

    if (available) {
      this.recording = true;
      SpeechRecognition.start({
        popup: false,
        partialResults: true,
        language: 'es-ES',
      });

      SpeechRecognition.addListener('partialResults', (data: any) => {
        console.log('Resultados parciales', data.matches);
        this.inputText = data.matches[0];
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  async stopRecognition() {
    this.recording = false;
    await SpeechRecognition.stop();
  }

  async translate(text: string, targetLang: string) {
    if (!text || text.trim() === '') {
      alert('Por favor, ingrese un texto para traducir.');
      return;
    }

    try {
      const languageNames: { [key: string]: string } = {
        en: 'Inglés',
        fr: 'Francés',
        de: 'Alemán',
        pt: 'Portugués',
        it: 'Italiano',
        ru: 'Ruso'
      };

      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(this.db, 'users', user.uid);
        const languageToSave = languageNames[targetLang];
        await updateDoc(userDocRef, { idioma: languageToSave });
        console.log('Idioma guardado en Firestore:', languageToSave);
      } else {
        console.log('No hay usuario autenticado');
      }

      this.translatedText = await firstValueFrom(this.translationService.translateText(text, targetLang));
      this.idiomadetraduccion = languageNames[targetLang];
      localStorage.setItem('idiomadetraduccion', this.idiomadetraduccion);

      // Llama a saveToHistory con el idioma específico
      this.saveToHistory(this.inputText, this.translatedText, this.idiomadetraduccion);

    } catch (error) {
      console.error('Error al traducir o guardar el idioma:', error);
      alert('Ocurrió un error al traducir el texto.');
    }
  }

  // Método para guardar el texto ingresado en el historial, incluyendo el idioma
  saveToHistory(input: string, translation: string, idioma: string) {
    if (input && translation) {
      this.translationHistory.push({ input, translation, idioma });
      localStorage.setItem('translationHistory', JSON.stringify(this.translationHistory));
    } else {
      console.warn('Input o translation está vacío, no se guardará en el historial.');
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
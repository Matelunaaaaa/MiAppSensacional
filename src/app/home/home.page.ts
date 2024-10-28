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
  translationHistory: string[] = []; // Historial de textos ingresados
  myText: string = 'Hola Mundo!';
  recording = false;
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
        this.inputText = data.matches[0]; // Actualiza el texto de entrada con los resultados parciales
        this.changeDetectorRef.detectChanges(); // Detecta cambios para actualizar la vista
      });
    }
  }

  async stopRecognition() {
    this.recording = false;
    await SpeechRecognition.stop();
  }

  // Método para traducir el texto y guardar el idioma en Firestore
  async translate(text: string, targetLang: string) {
    if (!text || text.trim() === '') {
      alert('Por favor, ingrese un texto para traducir.');
      return;
    }
    
    // Guardar el idioma en Firestore solo si el usuario está autenticado
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
        await updateDoc(userDocRef, {
          idioma: languageToSave
        });
        console.log('Idioma guardado en Firestore:', languageToSave);
      } else {
        console.log('No hay usuario autenticado');
      }

      // Realizar la traducción
      this.translatedText = await firstValueFrom(this.translationService.translateText(text, targetLang));
    } catch (error) {
      console.error('Error al traducir o guardar el idioma:', error);
      alert('Ocurrió un error al traducir el texto.');
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

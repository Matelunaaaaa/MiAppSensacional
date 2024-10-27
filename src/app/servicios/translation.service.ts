import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface TranslationResponse {
  responseData: {
    translatedText: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  
  private apiUrl = 'https://api.mymemory.translated.net/get';

  constructor(private http: HttpClient) { }

  translateText(text: string, targetLang: string): Observable<string> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(text)}&langpair=es|${targetLang}`;
    
    return this.http.get<TranslationResponse>(url).pipe(
      map(response => {
        console.log('Respuesta completa de la API:', response);
        const translatedText = response.responseData.translatedText;
        console.log('Texto traducido:', translatedText);
        return translatedText; 
      })
    );
  }
}

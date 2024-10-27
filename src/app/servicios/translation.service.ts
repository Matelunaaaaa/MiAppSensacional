import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  
  private apiUrl = 'https://api.mymemory.translated.net/get';

  constructor(private http: HttpClient) { }

  translateText(text: string, targetLang: string): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(text)}&langpair=es|${targetLang}`;
    
    return this.http.get<any>(url).pipe(
      tap(response => {
        console.log('Respuesta completa de la API:', response);
        console.log('Texto traducido:', response.responseData.translatedText);
      })
    );
  }
}

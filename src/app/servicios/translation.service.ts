import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private apiUrl = 'https://libretranslate.com/translate';

  constructor(private http: HttpClient) { }

  translateText(text: string, targetLang: string): Observable<any> {
    const body = {
      q: text,
      source: 'auto', 
      target: targetLang,
      format: 'text'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      tap(response => {
        console.log('Respuesta de la API:', response); // Imprimir la respuesta aquí
      })
    );
  }
}

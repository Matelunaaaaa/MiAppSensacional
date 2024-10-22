import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private apiUrl = 'https://libretranslate.com/translate';

  constructor(private http: HttpClient) {}

  translateText(text: string, targetLang: string): Observable<any> {
    const body = {
      q: text,
      source: 'es',
      target: targetLang,
      format: 'text',
    };

    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}

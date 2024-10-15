import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private apiUrl = 'https://api-free.deepl.com/v2/translate';
  private apiKey = '4a94e3fe-b83d-4e95-aef8-6e74303f1063:fx'; //codigo de api

  constructor(private http: HttpClient) { }

  translateText(text: string, targetLang: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `DeepL-Auth-Key ${this.apiKey}`
    });

    const body = new URLSearchParams();
    body.set('text', text);
    body.set('target_lang', targetLang);

    return this.http.post(this.apiUrl, body.toString(), { headers });
  }
}

// translation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// Define la interfaz de la respuesta de la API
interface TranslationResponse {
  translations: Array<{ text: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = '/api/v2/translate';

  constructor(private http: HttpClient) {}

  translateText(text: string, targetLang: string): Observable<TranslationResponse> { // Asegúrate de que el método retorne el tipo Observable<TranslationResponse>
    const headers = new HttpHeaders({
      'Authorization': `DeepL-Auth-Key ${environment}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `text=${encodeURIComponent(text)}&target_lang=${targetLang}`;

    return this.http.post<TranslationResponse>(this.apiUrl, body, { headers }); // Asegúrate de que aquí se especifique el tipo
  }
}

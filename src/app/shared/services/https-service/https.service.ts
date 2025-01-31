import { EnvironmentInjector, inject, Injectable, runInInjectionContext, Signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {

  private injector = inject(EnvironmentInjector);

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }
    return headers;
  }

  post<T>(url: string, body: any): Observable<T> {
    console.log('POST request to:', url, body);
    return this.http.post<T>(url, body, { headers: this.getHeaders() });
  }


}

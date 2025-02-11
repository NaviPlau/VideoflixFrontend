import { EnvironmentInjector, inject, Injectable, runInInjectionContext, Signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpsService {

  constructor(private http: HttpClient) {}

   getToken(): string | null {
    return sessionStorage.getItem('token') || localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (token) {
      headers = headers.set('Authorization', `Token ${token}`);
    }
    return headers;
  }

  post<T>(url: string, body: any): Observable<T> {
    console.log('POST request to:', url, body);
    return this.http.post<T>(url, body, { headers: this.getHeaders() });
  }

  patch<T>(url: string, body: any): Observable<T> {
    console.log('PATCH request to:', url, body);
    return this.http.patch<T>(url, body, { headers: this.getHeaders() });
  }

  get<T>(url: string): Observable<T> {
    console.log('GET request to:', url);
    return this.http.get<T>(url, { headers: this.getHeaders() });
  }

}

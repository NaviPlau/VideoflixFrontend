import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  landingEmail = signal('');
  constructor() { }


  login() {
    
  }
}

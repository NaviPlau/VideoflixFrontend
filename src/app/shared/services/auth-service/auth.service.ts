import { Injectable, signal } from '@angular/core';
import { LoginInterface } from '../../interfaces/login-interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  landingEmail = signal('');
  loginData = signal<LoginInterface>({
    email: '',
    password: ''
  });

  
  constructor() { }


  login() {
    
  }
}

import { Injectable, signal } from '@angular/core';
import { LoginInterface } from '../../interfaces/login-interface';
import { RegisterInterface } from '../../interfaces/register-interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  landingEmail = signal('');
  forgotEmail = signal('');
  loginData = signal<LoginInterface>({
    email: '',
    password: ''
  });

  registerData = signal<RegisterInterface>({
    email: '',
    password: '',
    repeated_password: ''
  });

  
  constructor() { }


  login() {
    
  }

  register() {
    
  }

  sendResetPasswordEmail() {
    
  }
}

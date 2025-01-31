import { effect, inject, Injectable, signal } from '@angular/core';
import { LoginInterface } from '../../interfaces/login-interface';
import { RegisterInterface } from '../../interfaces/register-interface';
import { NavigationService } from '../navigation-service/navigation.service';
import { ToastService } from '../toast-message/toast.service';
import { HttpsService } from '../https-service/https.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASE_URL = 'http://127.0.0.1:8000/videoflix/api';
  navigator = inject(NavigationService)
  toastService = inject(ToastService)
  httpsService = inject(HttpsService)

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
    this.httpsService.post<{ token: string; message: string }>( `${this.BASE_URL}/login/`, this.loginData())
     .subscribe({
      next: (response) => {
        if (response.token) {
            sessionStorage.setItem('token', response.token);
            this.toastService.setPositiveMessage('Logged in successfully.');
            this.navigator.navigateTo('/');
          } else {
            this.toastService.setNegativeMessage('Invalid login response.');
        }
      },
      error: (error) => {
        const errorMessage = error.error.message || 'Login failed. Please try again.';
        this.toastService.setNegativeMessage(errorMessage);
      }
    });
  }
  

  guestLogin() {
    this.toastService.setPositiveMessage('Logged in as guest');
    setTimeout(() => {
      this.navigator.navigateTo('/');
    }, 3000);
  }

  register() {
    
  }

  sendResetPasswordEmail() {
    
  }
}

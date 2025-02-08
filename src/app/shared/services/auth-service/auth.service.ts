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
  resetToken = signal('')
  landingEmail = signal('');
  forgotEmail = signal('');
  rememberMe = signal(false);
  successful = signal(false);
  loginData = signal<LoginInterface>({
    email: '',
    password: ''
  });

  registerData = signal<RegisterInterface>({
    email: '',
    password: '',
    repeated_password: ''
  });

  resetData = signal({})

  
  constructor() { }


  login() {
    this.httpsService.post<{ token: string; message: string }>( `${this.BASE_URL}/login/`, this.loginData())
     .subscribe({
      next: (response) => {
        if (response.token) {
            if(this.rememberMe()) {
              localStorage.setItem('token', response.token);
            }else{
              sessionStorage.setItem('token', response.token);
            }
            
            this.toastService.setPositiveMessage('Logged in successfully.');
            this.navigator.navigateTo('/videos');
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

  rememberedLogin() {
    let remembertoken = localStorage.getItem('token');
    if (remembertoken) {
      this.toastService.setPositiveMessage('Logged in successfully.');
      this.httpsService.post<{ token: string; message: string }>( `${this.BASE_URL}/remember-login/`, { token: remembertoken })
      .subscribe({
        next: (response) => {
          if (response.token) {
              this.toastService.setPositiveMessage('Logged in successfully.');
              this.navigator.navigateTo('/videos');
            } else {
              this.toastService.setNegativeMessage('Invalid login response.');
          }
        },
        error: (error) => {
          const errorMessage = error.error.message || 'Login failed. Please try again.';
          this.toastService.setNegativeMessage(errorMessage);
        }
      })
    }
  }
  

  guestLogin() {
    this.loginData.set({
      email: 'videoflix@guest.de',
      password: 'guest123Guest'
    })
    this.login();
  }

  register() {
    this.httpsService.post<{ message: string }>(`${this.BASE_URL}/register/`, this.registerData())
      .subscribe({
        next: (response) => {
          this.toastService.setPositiveMessage(response.message);
          this.successful.set(true);
        },
        error: (error) => {
          const errorMessage = error.error.message || 'Registration failed. Please try again.';
          this.toastService.setNegativeMessage(errorMessage);
        }
    })
  }

  sendResetPasswordEmail() {
    this.httpsService.post<{ message: string }>(`${this.BASE_URL}/reset-password/`, { email: this.forgotEmail() })
      .subscribe({
        next: () => {
          this.successful.set(true);
          this.forgotEmail.set('');
        },
        error: () => {
          this.successful.set(true);
          this.forgotEmail.set('');
        }
      });
  }

  resetPassword() {
    this.httpsService.post<{ message: string }>(`${this.BASE_URL}/reset-password/confirm/${this.resetToken()}/`, this.resetData())
      .subscribe({
        next: (response) => {
          this.toastService.setPositiveMessage(response.message);
          this.successful.set(true);
        },
        error: (error) => {
          const errorMessage = error.error.error || 'Password reset email failed. Please try again.';
          this.toastService.setNegativeMessage(errorMessage);
        }   
    })
  } 

  logout() { 
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.navigator.navigateTo('/login');
  }
}

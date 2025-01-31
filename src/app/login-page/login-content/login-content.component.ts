import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginInterface } from '../../shared/interfaces/login-interface';
import { NavigationService } from '../../shared/services/navigation-service/navigation.service';

@Component({
  selector: 'app-login-content',
  imports: [MatIcon, CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './login-content.component.html',
  styleUrl: './login-content.component.scss'
})
export class LoginContentComponent {
  authService = inject(AuthService);
  navigator = inject(NavigationService);
  showPassword: boolean = false;
  loginForm: FormGroup = new FormGroup({});
  rememberMe = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]]
    });
  }

  login(){
    if (this.loginForm.valid){
    this.authService.loginData.set(this.loginForm.value as LoginInterface);
    this.authService.login();
    console.log(this.authService.loginData());
    }
  }

  get emailControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }
}

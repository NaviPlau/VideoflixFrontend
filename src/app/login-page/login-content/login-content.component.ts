import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginInterface } from '../../shared/interfaces/login-interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-content',
  imports: [MatIcon, CommonModule, ReactiveFormsModule, RouterLink, FormsModule ],
  templateUrl: './login-content.component.html',
  styleUrl: './login-content.component.scss'
})
export class LoginContentComponent {
  authService = inject(AuthService);
  showPassword: boolean = false;
  loginForm: FormGroup = new FormGroup({});
  rememberMe = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', Validators.required]
    });
  }

  login(){
    this.authService.loginData.set(this.loginForm.value as LoginInterface);
    console.log(this.authService.loginData());
  }
}

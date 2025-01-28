import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginInterface } from '../../shared/interfaces/login-interface';

@Component({
  selector: 'app-login-content',
  imports: [MatIcon, CommonModule, ReactiveFormsModule ],
  templateUrl: './login-content.component.html',
  styleUrl: './login-content.component.scss'
})
export class LoginContentComponent {
  authService = inject(AuthService);
  loginForm: FormGroup = new FormGroup({});

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

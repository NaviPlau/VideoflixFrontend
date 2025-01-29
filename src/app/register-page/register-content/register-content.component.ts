import { Component, inject } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation-service/navigation.service';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { RegisterInterface } from '../../shared/interfaces/register-interface';

@Component({
  selector: 'app-register-content',
  imports: [CommonModule, MatIcon, ReactiveFormsModule],
  templateUrl: './register-content.component.html',
  styleUrl: './register-content.component.scss'
})
export class RegisterContentComponent {
  authService = inject(AuthService);
  navigator = inject(NavigationService);
  showPassword: boolean = false;
  showRepeatedPassword: boolean = false;

  registerForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      password: ['', Validators.required],
      repeated_password: ['', Validators.required]
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.registerData.set(this.registerForm.value as RegisterInterface);
      console.log(this.authService.registerData());
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation-service/navigation.service';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { RegisterInterface } from '../../shared/interfaces/register-interface';

@Component({
  selector: 'app-register-content',
  imports: [CommonModule, MatIcon, ReactiveFormsModule],
  templateUrl: './register-content.component.html',
  styleUrl: './register-content.component.scss'
})
export class RegisterContentComponent implements OnInit {
  authService = inject(AuthService);
  navigator = inject(NavigationService);
  showPassword: boolean = false;
  showRepeatedPassword: boolean = false;

  registerForm: FormGroup = new FormGroup({});

  ngOnInit(){
    this.authService.successful.set(false);
  }

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group(
      {
        email: [this.authService.landingEmail(), [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]],
        repeated_password: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.registerData.set(this.registerForm.value as RegisterInterface);
      this.authService.register();
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const repeatedPassword = control.get('repeated_password')?.value;
  
      return password === repeatedPassword ? null : { passwordMismatch: true };
    };
  }

  get emailControl() {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.registerForm.get('password') as FormControl;
  }



}

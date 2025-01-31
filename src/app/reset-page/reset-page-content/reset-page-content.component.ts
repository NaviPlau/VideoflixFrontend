import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NavigationService } from '../../shared/services/navigation-service/navigation.service';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-page-content',
  imports: [CommonModule, MatIcon, ReactiveFormsModule],
  templateUrl: './reset-page-content.component.html',
  styleUrl: './reset-page-content.component.scss'
})
export class ResetPageContentComponent {
  authService = inject(AuthService);
  navigator = inject(NavigationService);
  showPassword: boolean = false;
  showRepeatedPassword: boolean = false;

  resetPasswordForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
    this.resetPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)]],
        repeated_password: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  passwordMatchValidator(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password')?.value;
        const repeatedPassword = control.get('repeated_password')?.value;
    
        return password === repeatedPassword ? null : { passwordMismatch: true };
      };
    }

  get passwordControl() {
      return this.resetPasswordForm.get('password') as FormControl;
    }
}

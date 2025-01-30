import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { NavigationService } from '../../shared/services/navigation-service/navigation.service';

@Component({
  selector: 'app-forgot-content',
  imports: [CommonModule, MatIcon, FormsModule, ReactiveFormsModule],
  templateUrl: './forgot-content.component.html',
  styleUrl: './forgot-content.component.scss'
})
export class ForgotContentComponent {
  authService = inject(AuthService);
  navigator = inject(NavigationService);

  emailForm = new FormGroup({
    email: new FormControl(this.authService.forgotEmail(), [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)])
  });

  get emailControl() {
    return this.emailForm.get('email') as FormControl;
  }

  updateLandingEmail() {
    this.authService.forgotEmail.set(this.emailForm.get('email')?.value || '');
    console.log(this.authService.forgotEmail());

  }
}

import { Component, effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../shared/services/auth-service/auth.service';
import { NavigationService } from '../../shared/services/navigation-service/navigation.service';

@Component({
  selector: 'app-landing-info',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './landing-info.component.html',
  styleUrl: './landing-info.component.scss',
})
export class LandingInfoComponent {
  authService = inject(AuthService);
  navigator = inject(NavigationService);

  emailForm = new FormGroup({
    email: new FormControl(this.authService.landingEmail(), Validators.pattern(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    )),
  });

  get emailControl() {
    return this.emailForm.get('email') as FormControl;
  }

  updateLandingEmail() {
    this.authService.landingEmail.set(this.emailForm.get('email')?.value || '');
    console.log(this.authService.landingEmail());
    
  }
}

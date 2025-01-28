import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackgroundImageService } from '../shared/services/bg-image-service/background-image.service';
import { LandingHeaderComponent } from "../shared/components/landing-header/landing-header.component";
import { LoginContentComponent } from "./login-content/login-content.component";

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, LandingHeaderComponent, LoginContentComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  animationClass = 'fade-in';

  constructor(public backgroundService: BackgroundImageService) {}
}

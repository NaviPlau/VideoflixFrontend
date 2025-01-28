import { Component, effect } from '@angular/core';
import { BackgroundImageService } from '../shared/services/bg-image-service/background-image.service';
import { CommonModule } from '@angular/common';
import { LandingHeaderComponent } from "../shared/components/landing-header/landing-header.component";
import { LandingInfoComponent } from "./landing-info/landing-info.component";

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, LandingHeaderComponent, LandingInfoComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  animationClass = 'fade-in';
  constructor(
    public backgroundService: BackgroundImageService,
  ) {}
  
 

}


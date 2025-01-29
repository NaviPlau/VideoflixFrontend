import { Component, effect } from '@angular/core';
import { BackgroundImageService } from '../shared/services/bg-image-service/background-image.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../shared/components/header/header.component";
import { LandingInfoComponent } from "./landing-info/landing-info.component";
import { FooterComponent } from "../shared/components/footer/footer.component";

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, HeaderComponent, LandingInfoComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  animationClass = 'fade-in';
  constructor(
    public backgroundService: BackgroundImageService,
  ) {}
  
 

}


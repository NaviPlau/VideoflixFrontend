import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NavigationService } from '../../services/navigation-service/navigation.service';

@Component({
  selector: 'app-landing-header',
  imports: [MatIcon],
  templateUrl: './landing-header.component.html',
  styleUrl: './landing-header.component.scss'
})
export class LandingHeaderComponent {
  actualRoute: string;
  navigator = inject(NavigationService);

  constructor(private router: Router){
    this.actualRoute = this.router.url;
  }

}

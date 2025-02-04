import { Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation-service/navigation.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  actualRoute: string;
  navigator = inject(NavigationService);

  constructor(private router: Router) {
    this.actualRoute = this.router.url;
  }
}

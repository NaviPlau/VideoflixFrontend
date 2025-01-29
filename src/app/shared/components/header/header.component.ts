import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { NavigationService } from '../../services/navigation-service/navigation.service';

@Component({
  selector: 'app-header',
  imports: [MatIcon],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  actualRoute: string;
  navigator = inject(NavigationService);

  constructor(private router: Router){
    this.actualRoute = this.router.url;
  }

}

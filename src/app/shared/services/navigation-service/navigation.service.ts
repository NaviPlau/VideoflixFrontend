import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private location: Location) {}

  navigateTo(path: string, queryParams?: Record<string, any>) {
    this.router.navigate([path], { queryParams });
  }

  goBack() {
    this.location.back();
  }
}


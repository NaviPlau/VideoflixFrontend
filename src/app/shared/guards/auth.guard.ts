import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavigationService } from '../services/navigation-service/navigation.service';
export const authGuard: CanActivateFn = (route, state) => {
  let navigator = inject(NavigationService);
  let token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) {navigator.navigateTo('/login'); return false;}
  return true;
};

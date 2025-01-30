import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ForgotPageComponent } from './forgot-page/forgot-page.component';

export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'imprint', component: LandingPageComponent},
  {path: 'privacy', component: LandingPageComponent},
  {path: 'forgot-password', component: ForgotPageComponent},
];

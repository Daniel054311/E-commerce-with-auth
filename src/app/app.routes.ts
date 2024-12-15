import { Routes } from '@angular/router';
import { HomeComponent } from './features/products/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { SellersDashboardComponent } from './features/products/dashboard/sellers-dashboard/sellers-dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    canActivate: [authGuard]
  }, {
    path: 'auth/login',
  component:LoginComponent,
  },
  {
    path: 'auth/register',
    component:RegisterComponent,
  },
  {
    path: 'dashboard/sellers',
    component:SellersDashboardComponent

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }

];

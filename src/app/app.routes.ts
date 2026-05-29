import {ProfileComponent} from './features/auth/profile/profile.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import {BookingComponent} from './features/booking/booking.component';
import {MainLayoutComponent} from './features/main-layout/main-layout.component';
import {LoginComponent} from './features/auth/login/login.component';
import {authGuard} from './core/guards/auth.guard';
import {Routes} from '@angular/router';
import {ServiceListComponent} from './features/services/service-list/service-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'bookings', component: BookingComponent },
      { path: 'services', component: ServiceListComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }  // ✅ ici
];

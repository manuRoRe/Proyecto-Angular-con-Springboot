// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { AdminGuard } from './guards/is-admin.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (m) => m.RegistroComponent
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [GuestGuard],
  },
  {
    path: 'inscripcion',
    loadComponent: () =>
      import('./components/inscripcion/inscripcion.component').then(
        (m) => m.InscripcionComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'backup',
    loadComponent: () =>
      import('./components/backup/backup.component').then(
        (m) => m.BackupComponent
      ),
    canActivate: [AdminGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

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
  {
    path: 'editar-usuario/:id',
    loadComponent: () =>
      import(
        './components/editar-insertar-usuario/editar-insertar-usuario.component'
      ).then((m) => m.EditarInsertarUsuarioComponent),
    canActivate: [AdminGuard],
  },
  {
    path: 'editarInsertar-curso/:id',
    loadComponent: () =>
      import(
        './components/editar-insertar-curso/editar-insertar-curso.component'
      ).then((m) => m.EditarInsertarCursoComponent),
    canActivate: [AdminGuard],
  },
  {
    path: 'editarInsertar-centro/:id',
    loadComponent: () =>
      import(
        './components/editar-insertar-centro/editar-insertar-centro.component'
      ).then((m) => m.EditarInsertarCentroComponent),
    canActivate: [AdminGuard],
  },
  {
    path: 'editarInsertar-inscripcion/:id',
    loadComponent: () =>
      import(
        './components/editar-insertar-inscripcion/editar-insertar-inscripcion.component'
      ).then((m) => m.EditarInsertarInscripcionComponent),
    canActivate: [AdminGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

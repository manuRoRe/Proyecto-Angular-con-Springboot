import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = localStorage.getItem('token') !== null; // Simulación de autenticación
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirigir si no está autenticado
      return false;
    }
    return true;
  }
}

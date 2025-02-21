import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('jwt')) {
      return true; // Permite el acceso si está autenticado
    }
    this.router.navigate(['/login']);
    alert('Debes Iniciar Sesion');
    return false;
  }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('jwt')) {
      this.router.navigate(['/home']); // Redirige si está logueado
      return false;
    }
    return true; // Permite el acceso si NO está logueado
  }

  canDeactivate(): boolean {
    if (typeof window !== 'undefined' && !localStorage.getItem('jwt')) {
      this.router.navigate(['/home']); // Redirige si NO está logueado
      return false;
    }
    return true; // Permite el acceso si está logueado
  }
}

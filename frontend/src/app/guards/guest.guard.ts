import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && !localStorage.getItem('jwt')) {
      return true; // Permite el acceso si NO está autenticado
    }
    this.router.navigate(['/dashboard']);
    return false;
  }
}

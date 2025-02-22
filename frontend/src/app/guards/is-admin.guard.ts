import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { BDService } from '../services/bd.service'; // Asegúrate de tener un servicio que controle la autenticación
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private bdService: BDService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Verifica si el usuario está autenticado y es administrador
    if (typeof window !== 'undefined' && localStorage.getItem('jwt')) {
      // Si hay un JWT, obtener los datos del usuario
      return this.bdService.getAuthenticatedUser().pipe(
        map((data) => {
          if (data.result === 'success' && data.admin === 1) {
            return true; // Si es administrador, permite el acceso
          } else {
            this.router.navigate(['/home']); // Redirige si no es admin
            return false; // Deniega el acceso
          }
        }),
        catchError((error) => {
          console.error('Error obteniendo usuario', error);
          this.router.navigate(['/home']); // Redirige en caso de error
          return [false]; // Deniega el acceso
        })
      );
    }

    // Si no hay JWT en el localStorage, redirige
    this.router.navigate(['/home']);
    return new Observable<boolean>((observer) => observer.next(false)); // Deniega el acceso
  }
}

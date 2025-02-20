import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BDService } from '../../services/bd.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  usuario: any = null; // Inicializa como null

  constructor(private router: Router, private authService: BDService) {}

  ngOnInit() {
    // Verificar si hay un usuario autenticado en localStorage
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('jwt')) {
        // Si hay un JWT, obtener los datos del usuario
        this.authService.getAuthenticatedUser().subscribe(
          (data) => {
            if (data.result === 'success') {
              this.usuario = data; // Establecer usuario si autenticado
            }
          },
          (error) => {
            console.error('Error obteniendo usuario', error);
          }
        );
      }
    }
  }

  cerrarSesion() {
    // Eliminar usuario de localStorage y recargar la página
    localStorage.removeItem('jwt');
    this.usuario = null; // Restablecer estado del usuario
    this.router.navigate(['/home']);
  }
}

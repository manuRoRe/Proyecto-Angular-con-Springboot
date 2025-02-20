import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { BDService } from '../../services/bd.service';
@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  usuario: any = {};

  constructor(private router: Router, private authService: BDService) {}

  ngOnInit() {
    // Verificar si hay un usuario autenticado en localStorage
    if (typeof window !== 'undefined') {
      this.authService.getAuthenticatedUser().subscribe(
        (data) => {
          if (data.result === 'success') {
            this.usuario = data;
          }
        },
        (error) => {
          console.error('Error obteniendo usuario', error);
        }
      );
    }
  }

  cerrarSesion() {
    // Eliminar usuario de localStorage y recargar la página
    localStorage.removeItem('jwt');
    this.usuario = null;
    this.router.navigate(['/home']);
  }
}

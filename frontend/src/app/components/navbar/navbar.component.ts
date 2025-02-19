import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
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
  usuario: string | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar si hay un usuario autenticado en localStorage
    if (typeof window !== 'undefined') {
      this.usuario = localStorage.getItem('usuario');
    }
  }

  cerrarSesion() {
    // Eliminar usuario de localStorage y recargar la página
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.router.navigate(['/home']);
  }
}

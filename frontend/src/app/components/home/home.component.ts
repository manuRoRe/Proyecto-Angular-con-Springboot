import { Component, OnInit } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { UsuariasListComponent } from '../usuarias-list/usuarias-list.component';
import { CursosComponent } from '../cursos/cursos.component';
import { BDService } from '../../services/bd.service';

@Component({
  selector: 'app-home',
  imports: [CursosComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  usuario: any = {};

  constructor(private authService: BDService) {}

  ngOnInit(): void {
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

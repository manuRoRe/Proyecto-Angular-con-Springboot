import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarias-list',
  imports: [NgFor, CommonModule],
  templateUrl: './usuarias-list.component.html',
  styleUrl: './usuarias-list.component.css',
  standalone: true,
})
export class UsuariasListComponent implements OnInit {
  usuarias: Usuario[] = [];
  errorMessage: string = '';

  constructor(private usuariaService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarias();
  }

  obtenerUsuarias(): void {
    this.usuariaService.obtenerListaEmpleados().subscribe({
      next: (data) => {
        this.usuarias = data;
      },
      error: (err) => {
        this.errorMessage = 'Error al obtener las usuarias';
        console.error(err);
      },
    });
  }
}

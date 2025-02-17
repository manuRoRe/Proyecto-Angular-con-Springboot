import { Component, OnInit, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // Para paginación
import { MatSortModule } from '@angular/material/sort'; // Para ordenar
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { BDService } from '../../services/bd.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuarias-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    NgFor,
    CommonModule,
  ],
  templateUrl: './usuarias-list.component.html',
  styleUrl: './usuarias-list.component.css',
  standalone: true,
})
export class UsuariasListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'email',
    'nombre',
    'apellidos',
    'sexo',
    'password',
    'aficiones',
    'pais',
    'admin',
  ];
  dataSource = new MatTableDataSource<Usuario>([]); // Inicializamos con un array vacío

  errorMessage: string = '';

  constructor(private usuariaService: BDService) {}

  ngOnInit(): void {
    this.obtenerUsuarias();
  }

  obtenerUsuarias(): void {
    this.usuariaService.obtenerListaEmpleados().subscribe({
      next: (data) => {
        this.dataSource.data = data; // Asignamos los datos obtenidos al dataSource
      },
      error: (err) => {
        this.errorMessage = 'Error al obtener las usuarias';
        console.error(err);
      },
    });
  }
}

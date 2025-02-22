import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { BDService } from '../../services/bd.service';
import { Usuario } from '../../interfaces/usuario';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // Para paginación
import { MatSortModule } from '@angular/material/sort'; // Para ordenar
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usuarias-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
  ],
  templateUrl: './usuarias-list.component.html',
  styleUrls: ['./usuarias-list.component.css'],
})
export class UsuariasListComponent implements OnInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'email',
    'apellidos',
    'sexo',
    'password',
    'pais',
    'aficiones',
    'admin',
    'acciones',
  ]; // Las columnas de la tabla
  dataSource = new MatTableDataSource<Usuario>(this.usuarios); // MatTableDataSource para la tabla

  constructor(private usuariaService: BDService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarias();
  }

  obtenerUsuarias(): void {
    this.usuariaService.obtenerListaEmpleados().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.dataSource.data = this.usuarios; // Actualiza los datos en el MatTableDataSource
        console.log('Usuarios guardadas:', this.usuarios);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
    });
  }

  editarUsuario(usuario: Usuario): void {
    this.router.navigate([`/editar-usuario/${usuario.id}`]);
  }

  borrarUsuario(usuario: Usuario): void {
    /*
    if (confirm(`¿Estás seguro de que quieres eliminar a ${usuario.nombre}?`)) {
      this.usuariaService.borrarUsuario(usuario.id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter((u) => u.id !== usuario.id); // Eliminar de la lista local
          this.dataSource.data = this.usuarios; // Actualizar la tabla
          console.log('Usuario eliminado:', usuario);
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        },
      });
    }*/
  }
}

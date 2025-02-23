import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { BDService } from '../../services/bd.service';
import { Usuario } from '../../interfaces/usuario';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // Para paginación
import { MatSortModule } from '@angular/material/sort'; // Para ordenar
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from '../../interfaces/curso';

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
  displayedColumnsUsuario: string[] = [
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

  constructor(private bdService: BDService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarias();
    this.obtenerCursos();
  }

  obtenerUsuarias(): void {
    this.bdService.obtenerListaEmpleados().subscribe({
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

  insertarUsuario(): void {
    this.router.navigate([`/editar-usuario/0`]);
  }

  borrarUsuario(usuario: Usuario): void {
    this.bdService.borrarUsuario(usuario.id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter((u) => u.id !== usuario.id); // Eliminar de la lista local
        this.dataSource.data = this.usuarios; // Actualizar la tabla
        console.log('Usuario eliminado:', usuario);
        alert('Usuario eliminado');
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
      },
    });
  }

  cursos: Curso[] = [];
  displayedColumnsCurso: string[] = [
    'id',
    'nombre',
    'descripcion',
    'imagen',
    'idCentro',
    'acciones',
  ];

  dataSources = new MatTableDataSource<Curso>(this.cursos);

  obtenerCursos(): void {
    this.bdService.obtenerCursos().subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        this.dataSources.data = this.cursos; // Actualiza los datos en el MatTableDataSource
        console.log('Cursos guardadas:', this.cursos);
      },
      error: (error) => {
        console.error('Error al obtener Cursos:', error);
      },
    });
  }

  editarCurso(curso: Curso): void {
    this.router.navigate([`/editarInsertar-curso/${curso.id}`]);
  }

  borrarCurso(curso: Curso): void {}

  insertarCurso(): void {
    console.log('Insertar curso');
  }
}

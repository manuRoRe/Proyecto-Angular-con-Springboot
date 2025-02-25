import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { BDService } from '../../services/bd.service';
import { Usuario } from '../../interfaces/usuario';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; // Para paginación
import { MatSortModule } from '@angular/material/sort'; // Para ordenar
import {
  MatButtonModule,
  MatIconAnchor,
  MatIconButton,
} from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from '../../interfaces/curso';
import { Centro } from '../../interfaces/centro';
import { Inscripcion } from '../../interfaces/inscripcion';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-usuarias-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatCard,
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

  cursos: Curso[] = [];
  displayedColumnsCurso: string[] = [
    'id',
    'nombre',
    'descripcion',
    'imagen',
    'idCentro',
    'acciones',
  ];

  dataSourceCurso = new MatTableDataSource<Curso>(this.cursos);

  centros: Centro[] = [];
  displayedColumnsCentro: string[] = [
    'id',
    'nombre',
    'direccion',
    'sitio_web',
    'imagen',
    'acciones',
  ];

  dataSourceCentro = new MatTableDataSource<Centro>(this.centros);

  inscripciones: Inscripcion[] = [];
  displayedColumnsInscripcion: string[] = [
    'id',
    'fecha_inscripcion',
    'id_curso',
    'id_usuario',
    'acciones',
  ];

  dataSourceInscripcion = new MatTableDataSource<Inscripcion>(
    this.inscripciones
  );

  constructor(private bdService: BDService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarias();
    this.obtenerCursos();
    this.obtenerCentros();
    this.obtenerInscripciones();
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

  obtenerCursos(): void {
    this.bdService.obtenerCursos().subscribe((data) => {
      this.cursos = data.map((curso) => ({
        ...curso,
        imagen: curso.imagen.startsWith('data:image')
          ? curso.imagen
          : `data:image/jpeg;base64,${curso.imagen}`,
      }));
      this.dataSourceCurso.data = this.cursos;
    });
  }

  editarCurso(curso: Curso): void {
    this.router.navigate([`/editarInsertar-curso/${curso.id}`]);
  }

  borrarCurso(curso: Curso): void {
    this.bdService.borrarCurso(curso.id).subscribe({
      next: () => {
        this.cursos = this.cursos.filter((c) => c.id !== curso.id); // Eliminar de la lista local
        this.dataSourceCurso.data = this.cursos; // Actualizar la tabla
        console.log('Curso eliminado:', curso);
        alert('Curso eliminado');
      },
      error: (error) => {
        console.error('Error al eliminar curso:', error);
      },
    });
  }

  insertarCurso(): void {
    this.router.navigate([`/editarInsertar-curso/0`]);
  }

  obtenerCentros(): void {
    this.bdService.obtenerCentros().subscribe((data) => {
      this.centros = data.map((centro) => ({
        ...centro,
        imagen: centro.imagen.startsWith('data:image')
          ? centro.imagen
          : `data:image/jpeg;base64,${centro.imagen}`,
      }));
      this.dataSourceCentro.data = this.centros;
    });
  }

  editarCentro(centro: Centro): void {
    this.router.navigate([`/editarInsertar-centro/${centro.id}`]);
  }

  borrarCentro(centro: Centro): void {
    this.bdService.borrarCentro(centro.id).subscribe({
      next: () => {
        this.centros = this.centros.filter((c) => c.id !== centro.id); // Eliminar de la lista local
        this.dataSourceCentro.data = this.centros; // Actualizar la tabla
        console.log('Centro eliminado:', centro);
        alert('Centro eliminado');
      },
      error: (error) => {
        console.error('Error al eliminar centro:', error);
      },
    });
  }

  insertarCentro(): void {
    this.router.navigate([`/editarInsertar-centro/0`]);
  }

  obtenerInscripciones(): void {
    this.bdService.obtenerInscripciones().subscribe({
      next: (inscripciones) => {
        this.inscripciones = inscripciones;
        this.dataSourceInscripcion.data = this.inscripciones; // Actualiza los datos en el MatTableDataSource
        console.log('Inscripciones guardadas:', this.inscripciones);
      },
      error: (error) => {
        console.error('Error al obtener inscripciones:', error);
      },
    });
  }

  editarInscripcion(inscripcion: Inscripcion): void {
    this.router.navigate([`/editarInsertar-inscripcion/${inscripcion.id}`]);
  }

  borrarInscripcion(inscripcion: Inscripcion): void {
    this.bdService.borrarInscripcion(inscripcion.id).subscribe({
      next: () => {
        this.inscripciones = this.inscripciones.filter(
          (i) => i.id !== inscripcion.id
        ); // Eliminar de la lista local
        this.dataSourceInscripcion.data = this.inscripciones; // Actualizar la tabla
        console.log('Inscripcion eliminada:', inscripcion);
        alert('Inscripcion eliminada');
      },
      error: (error) => {
        console.error('Error al eliminar inscripcion:', error);
      },
    });
  }

  insertarInscripcion(): void {
    this.router.navigate([`/editarInsertar-inscripcion/0`]);
  }
}

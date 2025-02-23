import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Curso } from '../../interfaces/curso';
import { BDService } from '../../services/bd.service';
import { Router } from 'express';

@Component({
  selector: 'app-cursos-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
  ],
  templateUrl: './cursos-list.component.html',
  styleUrl: './cursos-list.component.css',
})
export class CursosListComponent implements OnInit {
  cursos: Curso[] = [];
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'imagen',
    'idCentro',
    'acciones',
  ];

  dataSources = new MatTableDataSource<Curso>(this.cursos);

  constructor(private bdService: BDService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCursos();
  }

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
    console.log(curso);
  }

  borrarCurso(curso: Curso): void {
    console.log(curso);
  }

  insertarCurso(): void {
    console.log('Insertar curso');
  }
}

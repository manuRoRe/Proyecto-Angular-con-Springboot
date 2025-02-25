import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Importa FormsModule
import { Curso } from '../../interfaces/curso';
import { Centro } from '../../interfaces/centro';
import { Inscripcion } from '../../interfaces/inscripcion';
import { BDService } from '../../services/bd.service';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Agrega FormsModule aquí
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  centros: Centro[] = [];
  inscripciones: Inscripcion[] = [];
  usuario: any = {};
  filtroSeleccionado: string = 'todos';

  constructor(private bdService: BDService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        this.bdService.getAuthenticatedUser().subscribe(
          (data) => {
            if (data.result === 'success') {
              this.usuario = data;
              this.cargarInscripcionesUsuario();
            }
          },
          (error) => {
            console.error('Error obteniendo usuario', error);
          }
        );
      }
    }
    this.obtenerCursos();
    this.obtenerCentros();
  }

  obtenerCursos(): void {
    this.bdService.obtenerCursos().subscribe((data) => {
      this.cursos = data.map((curso) => ({
        ...curso,
        imagen: curso.imagen.startsWith('data:image')
          ? curso.imagen
          : `data:image/jpeg;base64,${curso.imagen}`,
      }));
    });
  }

  obtenerCentros(): void {
    this.bdService.obtenerCentros().subscribe((data) => {
      this.centros = data.map((curso) => ({
        ...curso,
        imagen: curso.imagen.startsWith('data:image')
          ? curso.imagen
          : `data:image/jpeg;base64,${curso.imagen}`,
      }));
    });
  }

  cargarInscripcionesUsuario(): void {
    if (this.usuario.id) {
      this.bdService.getInscripcionesPorUsuario(this.usuario.id).subscribe({
        next: (inscripciones) => {
          this.inscripciones = inscripciones;
          console.log('Inscripciones guardadas:', this.inscripciones);
        },
        error: (error) => {
          console.error('Error al obtener inscripciones:', error);
        },
      });
    }
  }

  verificarInscripcion(idCurso: number): boolean {
    return this.inscripciones.some(
      (inscripcion) => inscripcion.id_curso === idCurso
    );
  }

  filtrarCursos(): Curso[] {
    if (this.filtroSeleccionado === 'misCursos') {
      return this.cursos.filter((curso) => this.verificarInscripcion(curso.id));
    } else if (this.filtroSeleccionado === 'otros') {
      return this.cursos.filter(
        (curso) => !this.verificarInscripcion(curso.id)
      );
    }
    return this.cursos;
  }
}

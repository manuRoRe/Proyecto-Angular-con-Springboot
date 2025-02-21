import { Component, OnInit } from '@angular/core';
import { BDService } from '../../services/bd.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Curso } from '../../interfaces/curso';
import { Centro } from '../../interfaces/centro';

@Component({
  selector: 'app-inscripcion',
  imports: [CommonModule],
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.css',
})
export class InscripcionComponent implements OnInit {
  curso: Curso = {
    id: 0,
    nombre: '',
    descripcion: '',
    imagen: '',
    idCentro: 0,
  };
  centro: Centro = {
    id: 0,
    nombre: '',
    direccion: '',
    sitio_web: '',
    imagen: '',
  };
  idCurso: number | null = null;

  constructor(private route: ActivatedRoute, private cursoService: BDService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idCurso = Number(params['idCurso']);
      console.log('ID del curso recibido:', this.idCurso);
    });
    if (this.idCurso) {
      this.cursoService.getCursoById(this.idCurso).subscribe(
        (data) => {
          console.log('Curso recibido'); // 🔍 Verifica si el backend devuelve el curso
          this.curso = data;
          this.curso = {
            ...data, // Suponiendo que `data` es el curso recibido
            imagen: data.imagen.startsWith('data:image')
              ? data.imagen
              : `data:image/jpeg;base64,${data.imagen}`,
          };
          this.cursoService
            .getCentroById(this.curso.idCentro)
            .subscribe((data) => {
              console.log('Centro recibido'); // 🔍 Verifica si el backend devuelve el centro
              this.centro = data;
              this.centro = {
                ...data, // Suponiendo que `data` es el curso recibido
                imagen: data.imagen.startsWith('data:image')
                  ? data.imagen
                  : `data:image/jpeg;base64,${data.imagen}`,
              };
            });
        },
        (error) => console.error('Error al obtener el curso:', error)
      );
    }
  }

  obtenerCurso(): void {
    if (this.idCurso) {
      this.cursoService.getCursoById(this.idCurso).subscribe(
        (data) => (this.curso = data),
        (error) => console.error('Error al obtener el curso', error)
      );
    }
  }
}

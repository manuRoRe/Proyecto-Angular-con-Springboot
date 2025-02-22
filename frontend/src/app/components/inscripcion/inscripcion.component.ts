import { Component, OnInit } from '@angular/core';
import { BDService } from '../../services/bd.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatosAltaInscripcion } from '../../interfaces/datosAltaInscripcion';
import { Inscripcion } from '../../interfaces/inscripcion';

@Component({
  selector: 'app-inscripcion',
  imports: [CommonModule],
  templateUrl: './inscripcion.component.html',
  styleUrl: './inscripcion.component.css',
})
export class InscripcionComponent implements OnInit {
  curso: any = {};
  centro: any = {};
  inscripciones: Inscripcion[] = [];
  mensaje: string = '';
  usuario: any = {};
  idCurso: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private bdService: BDService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idCurso = Number(params['idCurso']);
      console.log('ID del curso recibido:', this.idCurso);

      if (this.idCurso) {
        this.cargarCurso();
        this.cargarUsuario();
      }
    });
  }

  cargarCurso(): void {
    this.bdService.getCursoById(this.idCurso!).subscribe(
      (data) => {
        console.log('Curso recibido', data);
        this.curso = {
          ...data,
          imagen: data.imagen.startsWith('data:image')
            ? data.imagen
            : `data:image/jpeg;base64,${data.imagen}`,
        };
        this.bdService.getCentroById(this.curso.idCentro).subscribe((data) => {
          console.log('Centro recibido', data);
          this.centro = {
            ...data,
            imagen: data.imagen.startsWith('data:image')
              ? data.imagen
              : `data:image/jpeg;base64,${data.imagen}`,
          };
        });
      },
      (error) => console.error('Error al obtener el curso:', error)
    );
  }

  cargarUsuario(): void {
    if (typeof window !== 'undefined') {
      // Verifica si el jwt existe en localStorage
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        this.bdService.getAuthenticatedUser().subscribe(
          (data) => {
            if (data.result === 'success') {
              this.usuario = data;
              console.log(this.usuario);
              this.cargarInscripcionesUsuario();
            }
          },
          (error) => {
            console.error('Error obteniendo usuario', error);
          }
        );
      }
    }
  }

  inscribirse(event: Event) {
    event.preventDefault(); // Evita cualquier comportamiento por defecto
    const fecha = new Date();
    const datos: DatosAltaInscripcion = {
      id_curso: this.curso.id,
      id_usuario: this.usuario.id,
      fecha_inscripcion: new Date(),
    };

    console.log('Datos enviados a la API:', datos); // Verifica en la consola del navegador

    this.bdService.crearInscripcion(datos).subscribe({
      next: (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
        this.mensaje = respuesta.result;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al inscribir:', error);
        this.mensaje = error.error?.result || 'Error al inscribir';
      },
    });
  }

  cargarInscripcionesUsuario(): void {
    if (this.usuario.id) {
      this.bdService.getInscripcionesPorUsuario(this.usuario.id).subscribe({
        next: (inscripciones) => {
          this.inscripciones = inscripciones; // ✅ Guarda las inscripciones
          console.log('Inscripciones guardadas:', this.inscripciones);
        },
        error: (error) => {
          console.error('Error al obtener inscripciones:', error);
        },
      });
    }
  }
  verificarInscripcion(): boolean {
    return this.inscripciones.some(
      (inscripcion) => inscripcion.id_curso === this.curso.id
    );
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Inscripcion } from '../../interfaces/inscripcion';
import { ActivatedRoute, Router } from '@angular/router';
import { BDService } from '../../services/bd.service';
import { Curso } from '../../interfaces/curso';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-editar-insertar-inscripcion',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-insertar-inscripcion.component.html',
  styleUrl: './editar-insertar-inscripcion.component.css',
})
export class EditarInsertarInscripcionComponent implements OnInit {
  inscripcionForm: FormGroup;
  cur: number = 0;
  imagenPreview: string | null = null;
  cursos: Curso[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bdService: BDService
  ) {
    // Definir la estructura del formulario
    this.inscripcionForm = new FormGroup({
      fecha_inscripcion: new FormControl('', Validators.required),
      id_curso: new FormControl('', Validators.required),
      id_usuario: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    // Extraer el id de la ruta
    this.cur = +this.route.snapshot.paramMap.get('id')!; // Convertir a número
    this.cargarInscripcion();
    this.cargarCursos();
    this.cargarUsuarios();
  }

  cargarCursos(): void {
    this.bdService.obtenerCursos().subscribe((data) => {
      this.cursos = data;
    });
  }

  cargarUsuarios(): void {
    this.bdService.obtenerListaEmpleados().subscribe((data) => {
      this.usuarios = data;
    });
  }

  cargarInscripcion(): void {
    if (this.cur !== 0) {
      this.bdService.getInscripcionById(this.cur).subscribe({
        next: (inscripcion: Inscripcion) => {
          console.log('Inscripcion recibida:', inscripcion);

          this.inscripcionForm.setValue({
            fecha_inscripcion: inscripcion.fecha_inscripcion,
            id_curso: inscripcion.id_curso,
            id_usuario: inscripcion.id_usuario,
          });
        },
        error: (err) => {
          console.error('Error al cargar el curso:', err);
          alert('Error al cargar los datos del curso');
        },
      });
    }
  }

  onSubmit(): void {
    if (this.inscripcionForm.valid) {
      console.log('Datos enviados:', this.inscripcionForm.value);

      if (this.cur === 0) {
        this.bdService.crearInscripcion(this.inscripcionForm.value).subscribe({
          next: () => this.router.navigate(['/backup']),
          error: (err) => {
            console.error('Error al registrar usuario:', err);
            alert('Error al registrar el usuario');
          },
        });
      } else {
        this.bdService
          .actualizarInscripcion(this.cur, this.inscripcionForm.value)
          .subscribe({
            next: () => this.router.navigate(['/backup']),
            error: (err) => {
              console.error('Error al actualizar usuario:', err);
              alert('Error al actualizar el usuario');
            },
          });
      }
    }
  }

  insertar() {
    return this.cur === 0;
  }
}

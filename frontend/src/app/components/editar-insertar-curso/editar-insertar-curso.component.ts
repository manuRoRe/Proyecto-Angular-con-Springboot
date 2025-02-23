import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BDService } from '../../services/bd.service';
import { Curso } from '../../interfaces/curso';
import { Centro } from '../../interfaces/centro';

@Component({
  selector: 'app-editar-insertar-curso',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-insertar-curso.component.html',
  styleUrl: './editar-insertar-curso.component.css',
})
export class EditarInsertarCursoComponent implements OnInit {
  cursoForm: FormGroup;
  cur: number = 0;
  imagenPreview: string | null = null;
  centros: Centro[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bdService: BDService
  ) {
    // Definir la estructura del formulario
    this.cursoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
      imagen: new FormControl(''),
      id_centro: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // Extraer el id de la ruta
    this.cur = +this.route.snapshot.paramMap.get('id')!; // Convertir a número
    this.cargarCurso();
    this.cargarCentros();
  }

  cargarCentros(): void {
    this.bdService.obtenerCentros().subscribe((data) => {
      this.centros = data.map((curso) => ({
        ...curso,
        imagen: curso.imagen.startsWith('data:image')
          ? curso.imagen
          : `data:image/jpeg;base64,${curso.imagen}`,
      }));
    });
  }

  cargarCurso(): void {
    if (this.cur !== 0) {
      this.bdService.getCursoById(this.cur).subscribe({
        next: (curso: Curso) => {
          console.log('Curso recibido:', curso);

          // Si la imagen ya está en Base64, la mostramos directamente
          this.imagenPreview = String(curso.imagen).startsWith('data:image')
            ? String(curso.imagen)
            : `data:image/jpeg;base64,${String(curso.imagen)}`;

          this.cursoForm.setValue({
            nombre: curso.nombre,
            descripcion: curso.descripcion,
            id_centro: curso.idCentro,
            imagen: '', // Se limpia para evitar problemas
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
    if (this.cursoForm.valid) {
      console.log('Datos enviados:', this.cursoForm.value);

      // Si la imagen está en la vista previa, la enviamos
      if (this.imagenPreview) {
        this.cursoForm.patchValue({
          imagen: this.imagenPreview.split(',')[1] || '', // Eliminar el prefijo "data:image..."
        });
      }

      if (this.cur === 0) {
        this.bdService.registrarUsuario(this.cursoForm.value).subscribe({
          next: () => this.router.navigate(['/backup']),
          error: (err) => {
            console.error('Error al registrar usuario:', err);
            alert('Error al registrar el usuario');
          },
        });
      } else {
        this.bdService
          .actualizarCurso(this.cur, this.cursoForm.value)
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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string; // Mostrar la vista previa
        this.cursoForm.patchValue({
          imagen: this.imagenPreview.split(',')[1] || '', // Guardar en Base64 sin prefijo
        });
      };
      reader.readAsDataURL(file);
    }
  }

  insertar() {
    return this.cur === 0;
  }
}

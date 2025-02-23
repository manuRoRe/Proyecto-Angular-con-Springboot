import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Centro } from '../../interfaces/centro';
import { ActivatedRoute, Router } from '@angular/router';
import { BDService } from '../../services/bd.service';

@Component({
  selector: 'app-editar-insertar-centro',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-insertar-centro.component.html',
  styleUrl: './editar-insertar-centro.component.css',
})
export class EditarInsertarCentroComponent implements OnInit {
  centroForm: FormGroup;
  cur: number = 0;
  imagenPreview: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bdService: BDService
  ) {
    // Definir la estructura del formulario
    this.centroForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      direccion: new FormControl(''),
      imagen: new FormControl('imagen.jpeg'),
      sitio_web: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // Extraer el id de la ruta
    this.cur = +this.route.snapshot.paramMap.get('id')!; // Convertir a número
    this.cargarCentro();
  }

  cargarCentro(): void {
    if (this.cur !== 0) {
      this.bdService.getCentroById(this.cur).subscribe({
        next: (centro: Centro) => {
          console.log('Centro recibido:', centro);

          // Si la imagen ya está en Base64, la mostramos directamente
          this.imagenPreview = String(centro.imagen).startsWith('data:image')
            ? String(centro.imagen)
            : `data:image/jpeg;base64,${String(centro.imagen)}`;

          this.centroForm.setValue({
            nombre: centro.nombre,
            direccion: centro.direccion,
            sitio_web: centro.sitio_web,
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
    if (this.centroForm.valid) {
      console.log('Datos enviados:', this.centroForm.value);

      // Si la imagen está en la vista previa, la enviamos
      if (this.imagenPreview) {
        this.centroForm.patchValue({
          imagen: this.imagenPreview.split(',')[1] || '', // Eliminar el prefijo "data:image..."
        });
      }

      if (this.cur === 0) {
        this.bdService.insertarCentro(this.centroForm.value).subscribe({
          next: () => this.router.navigate(['/backup']),
          error: (err) => {
            console.error('Error al registrar usuario:', err);
            alert('Error al registrar el usuario');
          },
        });
      } else {
        this.bdService
          .actualizarCentro(this.cur, this.centroForm.value)
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
        this.centroForm.patchValue({
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

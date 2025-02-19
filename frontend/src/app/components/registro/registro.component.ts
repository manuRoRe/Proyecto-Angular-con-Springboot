import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { BDService } from '../../services/bd.service';
import { DatosAltaUsuario } from '../../interfaces/datosAltaUsuario';
import { Router } from '@angular/router';

// 📌 Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registroService: BDService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      admin: [0],
      aficiones: [''],
      apellidos: [''],
      pais: [''],
      sexo: [''],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      // Convertir valores vacíos en null
      const formValue = this.registroForm.value;

      const usuario: DatosAltaUsuario = {
        email: formValue.email || null,
        nombre: formValue.nombre || null,
        apellidos: formValue.apellidos || null,
        sexo: formValue.sexo || null,
        password: formValue.password || null,
        aficiones: formValue.aficiones || null,
        pais: formValue.pais || null,
        admin: formValue.admin || 0, // Valor predeterminado para admin
      };

      this.registroService.registrarUsuario(usuario).subscribe({
        next: () => {
          console.log('Usuario registrado exitosamente');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error al registrar el usuario:', err);
          alert('Error al registrar el usuario');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}

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

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private registroService: BDService) {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      admin: [false], // Añade cualquier otro campo necesario
      aficiones: [''],
      apellidos: [''],
      pais: [''],
      sexo: [''],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const usuario: DatosAltaUsuario = this.registroForm.value;
      this.registroService.registrarUsuario(usuario).subscribe({
        next: () => {
          console.log('Usuario registrado exitosamente');
          // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje
        },
        error: (err) => {
          console.error('Error al registrar el usuario:', err);
          // Maneja el error según sea necesario
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}

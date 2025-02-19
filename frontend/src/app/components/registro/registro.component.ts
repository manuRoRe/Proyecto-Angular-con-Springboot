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
      aficiones: ['Natación, Viajes'],
      apellidos: ['rr'],
      pais: ['España'],
      sexo: ['Masculino'],
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const usuario: DatosAltaUsuario = this.registroForm.value;
      this.registroService.registrarUsuario(usuario).subscribe({
        next: () => {
          console.log('Usuario registrado exitosamente');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error al registrar el usuario:', err);
          alert('Error al registrar el usuario: ');
        },
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}

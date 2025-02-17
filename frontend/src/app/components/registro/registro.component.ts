import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Para trabajar con formularios reactivos
import { Router } from '@angular/router'; // Para redirigir a otra página
import { BDService } from '../../services/bd.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegistroComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private bdService: BDService
  ) {
    // Crear el formulario con validaciones
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
    });
  }

  // Método para enviar el formulario de registro
  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.bdService.aniadirUser(userData).subscribe(
        (response) => {
          console.log('Usuario registrado con éxito', response);
          this.router.navigate(['/login']); // Redirigir al login tras el registro exitoso
        },
        (error) => {
          console.error('Error al registrar usuario', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}

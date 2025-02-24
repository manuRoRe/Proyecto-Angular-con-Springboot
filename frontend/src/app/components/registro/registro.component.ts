import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BDService } from '../../services/bd.service';
import { DatosAltaUsuario } from '../../interfaces/datosAltaUsuario';
import { Router } from '@angular/router';
import { DatosAutenticaUsuario } from '../../interfaces/datosAutenticaUsuario';
import { Observable, debounceTime, switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;

  // Lista de posibles aficiones
  paises: string[] = ['España', 'Francia', 'Italia', 'Alemania', 'Inglaterra']; // Lista de países
  aficiones: string[] = ['Deportes', 'Música', 'Cine', 'Viajar', 'Leer']; // Lista de aficiones

  constructor(
    private fb: FormBuilder,
    private registroService: BDService,
    private router: Router
  ) {
    this.registroForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        email: [
          '',
          [Validators.required, Validators.email],
          [this.emailDisponibleValidator()],
        ],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmarPassword: ['', Validators.required],
        aficiones: [],
        apellidos: [''],
        pais: [''],
        sexo: [''],
        admin: [0],
      },
      { validators: this.coincidenPasswords }
    );
  }

  emailDisponibleValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ emailOcupado: boolean } | null> => {
      return control.value
        ? this.registroService.existeEmail(control.value).pipe(
            debounceTime(500),
            switchMap((existe) =>
              existe ? of({ emailOcupado: true }) : of(null)
            ),
            catchError(() => of(null))
          )
        : of(null);
    };
  }

  coincidenPasswords(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmarPassword = group.get('confirmarPassword')?.value;
    return password === confirmarPassword ? null : { noCoincide: true };
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const usuarioFormValue = {
        ...this.registroForm.value,
        aficiones: this.registroForm.value.aficiones.join(','), // Convertir array a string
      };

      const datosUsuario: DatosAutenticaUsuario = {
        email: usuarioFormValue.email,
        password: usuarioFormValue.password,
      };

      this.registroService.registrarUsuario(usuarioFormValue).subscribe({
        next: () => {
          console.log('Usuario registrado exitosamente');
          this.registroService.login(datosUsuario).subscribe({
            next: (response) => {
              if (response.result === 'Succes') {
                localStorage.setItem('jwt', response.jwt);
                window.location.reload();
              }
            },
            error: (err) => console.error('Error en login:', err),
          });
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

  onAficionChange(event: any, aficion: string) {
    const aficionesSeleccionadas = this.registroForm.value.aficiones || [];

    if (event.target.checked) {
      aficionesSeleccionadas.push(aficion);
      console.log(aficion);
      console.log(aficionesSeleccionadas);
    } else {
      const index = aficionesSeleccionadas.indexOf(aficion);
      if (index > -1) {
        aficionesSeleccionadas.splice(index, 1);
      }
    }

    this.registroForm.patchValue({ aficiones: aficionesSeleccionadas });
  }
}

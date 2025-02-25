import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AsyncValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { BDService } from '../../services/bd.service';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { catchError, debounceTime, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-editar-usuario',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-insertar-usuario.component.html',
  styleUrls: ['./editar--insertar-usuario.component.css'],
})
export class EditarInsertarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  us: number = 0;
  paises: string[] = ['España', 'Francia', 'Italia', 'Alemania', 'Inglaterra']; // Lista de países
  aficiones: string[] = ['Deportes', 'Música', 'Cine', 'Viajar', 'Leer']; // Lista de aficiones

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bdService: BDService
  ) {
    // Definir la estructura del formulario
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl(''),
      email: new FormControl(
        '',
        [Validators.required, Validators.email],
        [this.emailDisponibleValidator()]
      ),
      sexo: new FormControl(''),
      pais: new FormControl(''),
      aficiones: new FormControl([]),
      password: new FormControl('', Validators.required),
      admin: new FormControl(false),
    });
  }

  ngOnInit(): void {
    // Extraer el id de la ruta
    this.us = +this.route.snapshot.paramMap.get('id')!; // Usamos '+' para convertir el valor a número
    this.cargarUsuario();
  }
  emailDisponibleValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ emailOcupado: boolean } | null> => {
      return control.value
        ? this.bdService.existeEmail(control.value).pipe(
            debounceTime(500),
            switchMap((existe) =>
              existe ? of({ emailOcupado: true }) : of(null)
            ),
            catchError(() => of(null))
          )
        : of(null);
    };
  }

  cargarUsuario(): void {
    // Si el id es 0, no cargamos usuario, ya que vamos a registrar uno nuevo
    if (this.us !== 0) {
      this.bdService.getUsuarioById(this.us).subscribe({
        next: (user: Usuario) => {
          console.log('Usuario recibido:', user);

          // Asegurar que 'aficiones' sea un array
          console.log('Aficiones recibidas del usuario:', user.aficiones);

          const aficionesArray = user.aficiones
            ? typeof user.aficiones === 'string'
              ? user.aficiones.split(',')
              : user.aficiones
            : [];

          console.log('Aficiones convertidas a array:', aficionesArray);

          this.usuarioForm.setValue({
            nombre: user.nombre,
            apellidos: user.apellidos,
            email: user.email,
            sexo: user.sexo,
            pais: user.pais,
            aficiones: aficionesArray, // Aquí nos aseguramos de que sea un array
            password: user.password,
            admin: user.admin,
          });
        },
        error: (err) => {
          console.error('Error al cargar usuario:', err);
          alert('Error al cargar los datos del usuario');
        },
      });
    }
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      console.log('Datos enviados:', this.usuarioForm.value);

      // Convertimos el array de aficiones en un string separado por comas
      const usuarioFormValue = {
        ...this.usuarioForm.value,
        aficiones: this.usuarioForm.value.aficiones.join(','), // Convertir array a string
        admin: this.usuarioForm.value.admin ? 1 : 0, // Convertir boolean a 0/1
      };

      if (this.us === 0) {
        // Llamar al servicio para registrar un nuevo usuario
        this.bdService.registrarUsuario(usuarioFormValue).subscribe({
          next: () => {
            this.router.navigate(['/backup']); // Redirigir a la página de lista o a donde necesites
          },
          error: (err) => {
            console.error('Error al registrar usuario:', err);
            alert('Error al registrar el usuario');
          },
        });
      } else {
        // Llamar al servicio para actualizar el usuario
        this.bdService.actualizarUsuario(this.us, usuarioFormValue).subscribe({
          next: () => {
            this.router.navigate(['/backup']); // Redirigir a la página de lista o a donde necesites
          },
          error: (err) => {
            console.error('Error al actualizar usuario:', err);
            alert('Error al actualizar el usuario');
          },
        });
      }
    }
  }

  onAficionChange(event: any, aficion: string) {
    const aficionesSeleccionadas = this.usuarioForm.value.aficiones || [];

    if (event.target.checked) {
      aficionesSeleccionadas.push(aficion);
    } else {
      const index = aficionesSeleccionadas.indexOf(aficion);
      if (index > -1) {
        aficionesSeleccionadas.splice(index, 1);
      }
    }

    this.usuarioForm.patchValue({ aficiones: aficionesSeleccionadas });
  }

  insertar() {
    if (this.us === 0) {
      return true;
    } else return false;
  }
}

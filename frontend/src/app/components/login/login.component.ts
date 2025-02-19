import { Component, OnInit } from '@angular/core';
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
import { Router } from '@angular/router';

// 📌 Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { DatosAutenticaUsuario } from '../../interfaces/datosAutenticaUsuario';

@Component({
  selector: 'app-login',
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
    MatGridListModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: BDService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const datosLogin: DatosAutenticaUsuario = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(datosLogin).subscribe({
      next: (response) => {
        if (response.result === 'Succes') {
          console.log('Login exitoso');
          localStorage.setItem('jwt', response.jwt);
          this.router.navigate(['/home']);
        } else {
          console.error('Credenciales incorrectas');
        }
      },
      error: (error) => {
        console.error('Error en el login:', error);
      },
    });
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuariasListComponent } from './components/usuarias-list/usuarias-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterOutlet,
    UsuariasListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Mi Proyecto';

  login() {
    console.log('Redirigiendo a la página de Login');
  }

  register() {
    console.log('Redirigiendo a la página de Registro');
  }
}

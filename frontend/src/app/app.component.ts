import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Importar MatDialog
import { UsuariasListComponent } from './components/usuarias-list/usuarias-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RegistroComponent } from './components/registro/registro.component';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterOutlet,
    UsuariasListComponent,
    MatDialogModule,
    RegistroComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Mi Proyecto';

  constructor(private dialog: MatDialog) {}
  login() {
    console.log('Redirigiendo a la página de Login');
  }
}

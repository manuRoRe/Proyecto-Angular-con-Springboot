import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { UsuariasListComponent } from '../usuarias-list/usuarias-list.component';
import { CursosComponent } from '../cursos/cursos.component';

@Component({
  selector: 'app-home',
  imports: [CursosComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

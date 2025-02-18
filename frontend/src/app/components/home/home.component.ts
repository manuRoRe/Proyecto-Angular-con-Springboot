import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { UsuariasListComponent } from '../usuarias-list/usuarias-list.component';

@Component({
  selector: 'app-home',
  imports: [UsuariasListComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuariasListComponent } from './components/usuarias-list/usuarias-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UsuariasListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ejemplo_10_02';
}

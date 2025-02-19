import { Component, OnInit } from '@angular/core';
import { Curso } from '../../interfaces/curso';
import { BDService } from '../../services/bd.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursos',
  imports: [CommonModule],
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];

  constructor(private cursoService: BDService) {}

  ngOnInit(): void {
    this.obtenerCursos();
  }

  obtenerCursos(): void {
    this.cursoService.obtenerCursos().subscribe((data) => {
      this.cursos = data.map((curso) => ({
        ...curso,
        imagen: curso.imagen.startsWith('data:image')
          ? curso.imagen
          : `data:image/jpeg;base64,${curso.imagen}`,
      }));
    });
  }
}

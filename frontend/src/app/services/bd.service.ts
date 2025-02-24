import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { Curso } from '../interfaces/curso';
import { DatosAltaUsuario } from '../interfaces/datosAltaUsuario';
import { DatosAutenticaUsuario } from '../interfaces/datosAutenticaUsuario';
import { Centro } from '../interfaces/centro';
import { DatosAltaInscripcion } from '../interfaces/datosAltaInscripcion';
import { Inscripcion } from '../interfaces/inscripcion';
import { DatosAltaCurso } from '../interfaces/datosAltaCurso';

@Injectable({
  providedIn: 'root',
})
export class BDService {
  //URL de listado de empleados del backend
  private baseURL = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  //EMPLEADOS
  obtenerListaEmpleados(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL + '/usuario/obtener');
  }

  registrarUsuario(datos: DatosAltaUsuario): Observable<void> {
    return this.http.post<void>(this.baseURL + '/usuario/crear', datos);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/usuario/obtener/${id}`);
  }

  actualizarUsuario(id: number, usuario: DatosAltaUsuario): Observable<any> {
    return this.http.put(`${this.baseURL}/usuario/actualizar/${id}`, usuario);
  }

  borrarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/usuario/eliminar/${id}`);
  }

  login(datosLogin: DatosAutenticaUsuario): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/usuario/login`, datosLogin, {
      withCredentials: true,
    });
  }
  getAuthenticatedUser(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/usuario/quieneres`, {
      withCredentials: true,
    });
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  existeEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseURL}/usuario/existe/${email}`);
  }

  //CURSOS

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.baseURL + '/curso/obtener');
  }

  getCursoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/curso/obtener/${id}`);
  }

  actualizarCurso(id: number, curso: Curso): Observable<any> {
    return this.http.put(`${this.baseURL}/curso/actualizar/${id}`, curso);
  }

  insertarCurso(datos: DatosAltaCurso): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/curso/crear`, datos);
  }

  borrarCurso(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/curso/eliminar/${id}`);
  }

  //CENTROS

  obtenerCentros(): Observable<Centro[]> {
    return this.http.get<Centro[]>(this.baseURL + '/centro/obtener');
  }

  getCentroById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/centro/obtener/${id}`);
  }

  borrarCentro(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/centro/eliminar/${id}`);
  }

  actualizarCentro(id: number, centro: Centro): Observable<any> {
    return this.http.put(`${this.baseURL}/centro/actualizar/${id}`, centro);
  }

  insertarCentro(centro: Centro): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/centro/crear`, centro);
  }

  //INSCRIPCION

  crearInscripcion(datos: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/inscripcion/crear`, datos);
  }

  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.baseURL + '/inscripcion/obtener');
  }

  getInscripcionesPorUsuario(id: number): Observable<Inscripcion[]> {
    return this.http.get<any[]>(`${this.baseURL}/inscripcion/usuario/${id}`);
  }

  borrarInscripcion(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/inscripcion/eliminar/${id}`);
  }
}

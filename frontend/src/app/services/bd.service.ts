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

@Injectable({
  providedIn: 'root',
})
export class BDService {
  //URL de listado de empleados del backend
  private baseURL = 'http://localhost:9090';

  constructor(private http: HttpClient) {}

  //metodo para obtener los empleados
  obtenerListaEmpleados(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURL + '/usuario/obtener');
  }

  registrarUsuario(datos: DatosAltaUsuario): Observable<void> {
    return this.http.post<void>(this.baseURL + '/usuario/crear', datos);
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

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.baseURL + '/curso/obtener');
  }

  getCursoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/curso/obtener/${id}`);
  }

  obtenerCentros(): Observable<Centro[]> {
    return this.http.get<Centro[]>(this.baseURL + '/centro/obtener');
  }

  getCentroById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/centro/obtener/${id}`);
  }

  crearInscripcion(datos: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/inscripcion/crear`, datos);
  }

  getInscripcionesPorUsuario(id: number): Observable<Inscripcion[]> {
    return this.http.get<any[]>(`${this.baseURL}/inscripcion/usuario/${id}`);
  }
}

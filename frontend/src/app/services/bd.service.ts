import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

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

  aniadirUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseURL + '/usuario/aniadir', user);
  }

  //este metodo sirve para registrar un empleado

  //este metodo sirve para actualizar el empleado

  //este metodo sirve para obtener o buscar un empleado
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Usuario } from "../Modelos/usuarios";

@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + "/usuarios");
  }

  addUsuario(nuevoUsuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/usuarios", nuevoUsuario);
  }

  editarUsuario(identidad: string, updateUsuario: Usuario): Observable<any> {
    return this.http.put(this.apiUrl + "/usuarios/" + identidad, updateUsuario);
  }

  getUsuarioByTipo(tipoUsuario: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      `${this.apiUrl}/usuarios/usuarioByTipoUsuario/${tipoUsuario}`
    );
  }

  getUsuarioByIdentidad(identidad: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      `${this.apiUrl}/usuarios/usuarioByIdentidad/${identidad}`
    );
  }

  //actualizar datos de usuario
  updateUsuario(identidad: string, updateUsuario: Usuario): Observable<any> {
    // return this.http.put(`${this.apiUrl}/usuarios/${identidad}`, updateUsuario);
    return this.http.put(this.apiUrl + "/usuarios/" + identidad, updateUsuario);
  }
}

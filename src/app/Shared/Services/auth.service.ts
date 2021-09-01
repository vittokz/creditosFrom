import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  datosUsuario: any[];

  constructor(private http: HttpClient) {}

  login(identidad: string, pass: string) {
    return this.http.get<any>(`${this.apiUrl}/auth/${identidad}/${pass}`);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  removeToken() {
    localStorage.removeItem("token");
  }

  getTokenGenerado() {
    return localStorage.getItem("token");
  }

  setTipoUsuario(tipoUsuario: string) {
    localStorage.setItem("tipoUsuario", tipoUsuario);
  }
  getTipoUsuario(identidad): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/${identidad}`);
  }
}

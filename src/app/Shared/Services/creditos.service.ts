import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { Credito } from "../Modelos/creditos";

@Injectable({
  providedIn: "root",
})
export class CreditosService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addCreditos(credito: Credito): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/creditos", credito);
  }

  getAllCreditos(): Observable<Credito[]> {
    return this.http.get<Credito[]>(this.apiUrl + "/creditos");
  }

  getCreditosByIdentidad(identidad: string): Observable<Credito[]> {
    return this.http.get<Credito[]>(
      `${this.apiUrl}/creditos/busqueda/${identidad}`
    );
  }
  getCreditosByEstado(estado: string): Observable<Credito[]> {
    return this.http.get<Credito[]>(
      `${this.apiUrl}/creditos/busquedaEstados/${estado}`
    );
  }
  getCreditoByIdCredito(idCredito: string): Observable<Credito> {
    return this.http.get<Credito>(`${this.apiUrl}/creditos/${idCredito}`);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { Pago } from "../Modelos/Pago";

@Injectable({
  providedIn: "root",
})
export class PagosService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addPago(pago: Pago): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/pagos", pago);
  }

  getAllPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl + "/pagos");
  }

  getPagosByIdCredito(idCredito: string): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/pagos/${idCredito}`);
  }
  getPagosByEstado(estado: string): Observable<Pago[]> {
    return this.http.get<Pago[]>(
      `${this.apiUrl}/pagos/busquedaEstados/${estado}`
    );
  }

  getMayorNumCuota(idCredito: string): Observable<Pago> {
    return this.http.get<Pago>(
      `${this.apiUrl}/pagos/mayorNumCuota/${idCredito}`
    );
  }

  addPagoNomral(pago: Pago): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/pagos/pagoNormal", pago);
  }
  addPagoProximasCuotas(pago: Pago[]): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/pagos/pagoProximasCuotas", pago);
  }
}

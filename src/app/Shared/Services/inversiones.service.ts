import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { Inversion } from "../Modelos/inversiones";

@Injectable({
  providedIn: "root",
})
export class InversionesService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addInversion(inversion: Inversion): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/inversiones", inversion);
  }

  getAllInveriones(): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(this.apiUrl + "/inversiones");
  }

  getInverionesByIdentidad(identidad: string): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(
      `${this.apiUrl}/inversiones/byIdInversionista/${identidad}`
    );
  }
  getInverionesByIdSolicitud(idSolicitud: string): Observable<Inversion[]> {
    return this.http.get<Inversion[]>(
      `${this.apiUrl}/inversiones/byIdSolicitud/${idSolicitud}`
    );
  }
}

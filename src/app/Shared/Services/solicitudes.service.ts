import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { IEstadoSolicitud } from "../Modelos/estado-solicitud";
import { Solicitud } from "../Modelos/solicitud-credito";

@Injectable({
  providedIn: "root",
})
export class SolicitudesService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl + "/solicitudes");
  }
  getSolicitudById(idSolicitud: string): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(
      `${this.apiUrl}/solicitudes/${idSolicitud}`
    );
  }

  getSolicitudByIdentidad(identidad: string): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(
      `${this.apiUrl}/solicitudes/byIdentidad/${identidad}`
    );
  }

  addSolicitud(solicitud: Solicitud): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/solicitudes", solicitud);
  }

  getSolicitudesByEstado(estado: string): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(
      `${this.apiUrl}/solicitudes/byEstado/${estado}`
    );
  }

  updateEstadoSolicitud(idSolicitud: string): Observable<any> {
    return this.http.get<Solicitud[]>(
      `${this.apiUrl}/solicitudes/updateEstados/${idSolicitud}`
    );
  }

  /**
   * Operaciones con estados de solicitud
   *
   * */
  registrarEstadoSolicitud(estadoSolicitud: IEstadoSolicitud): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + "/solicitudes/solicitudEstados",
      estadoSolicitud
    );
  }

  getAllEstaodsSolicitud(idSolicitud: string): Observable<IEstadoSolicitud[]> {
    return this.http.get<IEstadoSolicitud[]>(
      `${this.apiUrl}/solicitudes/solicitudEstados/${idSolicitud}`
    );
  }
}

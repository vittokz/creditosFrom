import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { IDepartamento, IMunicipio } from "../Modelos/departamentos";
@Injectable({
  providedIn: "root",
})
export class LocalidadesService {
  apiUrl: string = environment.apiUrl;
  listDepartamentos: IDepartamento[]
  constructor(private http: HttpClient) {}

  getAllDepartamentos(): Observable<IDepartamento[]> {
    return this.http.get<IDepartamento[]>(this.apiUrl + "/departamentos");
  }

  getAllMunicipios(idDepartamento: string): Observable<IMunicipio[]> {
    return this.http.get<IMunicipio[]>(
      `${this.apiUrl}/departamentos/municipios/${idDepartamento}`
    );
  }
}

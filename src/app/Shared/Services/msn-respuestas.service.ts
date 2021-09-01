import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class MsnRespuestasService {

  constructor() { }

  mensajeRespuesta(mensaje: string,tipo: any){
    Swal.fire(mensaje, "", tipo);
  }
}

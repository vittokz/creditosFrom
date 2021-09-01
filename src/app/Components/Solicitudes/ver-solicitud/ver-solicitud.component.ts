import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IEstadoSolicitud } from "src/app/Shared/Modelos/estado-solicitud";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";

import { MsnRespuestasService } from "src/app/Shared/Services/msn-respuestas.service";
import * as respuestasMsn from "../../../Shared/Enum/respuestas-msn";
@Component({
  selector: "app-ver-solicitud",
  templateUrl: "./ver-solicitud.component.html",
  styleUrls: ["./ver-solicitud.component.sass"],
})
export class VerSolicitudComponent implements OnInit {
  heading = "Detalle Solicitud Crédito";
  subheading = "Información de solicitud de crédito seleccionada";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  solicitud: Solicitud[];
  datoInfo: { idSolicitud: string };
  formSolicitud: FormGroup;
  estadoSolicitud: IEstadoSolicitud = new IEstadoSolicitud();
  listaEstadosSolicitud: IEstadoSolicitud[];
  constructor(
    private rutaActiva: ActivatedRoute,
    private solicitudesService: SolicitudesService,
    private formBuilder: FormBuilder,
    private respuestas: MsnRespuestasService
  ) {
    this.estadoSolicitud.idSolicitud = "";
    this.estadoSolicitud.tipoEstado = "";
    this.estadoSolicitud.descripcion = "";
    this.datoInfo = {
      idSolicitud: this.rutaActiva.snapshot.params.idSolicitud,
    };

    this.getEstadosSolicitud();
    this.getDatosSolicitud();
    this.crearformulario();
  }
  getEstadosSolicitud() {
    this.solicitudesService
      .getAllEstaodsSolicitud(this.datoInfo.idSolicitud)
      .subscribe((data) => {
        this.listaEstadosSolicitud = data;
      });
  }
  crearformulario() {
    this.formSolicitud = this.formBuilder.group({
      estadoSolicitud: [""],
      descripcion: ["", Validators.required],
    });
  }

  ngOnInit(): void {}
  getDatosSolicitud() {
    this.solicitudesService
      .getSolicitudById(this.datoInfo.idSolicitud)
      .subscribe((data) => {
        this.solicitud = data;
      });
  }

  submit() {
    this.estadoSolicitud.idSolicitud = this.datoInfo.idSolicitud;
    this.estadoSolicitud.tipoEstado =
      this.formSolicitud.get("estadoSolicitud").value;
    this.estadoSolicitud.descripcion =
      this.formSolicitud.get("descripcion").value;
    this.estadoSolicitud.usuarioRegistra = "";
    console.log(this.estadoSolicitud);
    this.solicitudesService
      .registrarEstadoSolicitud(this.estadoSolicitud)
      .subscribe((res) => {
        if ((res.estado = "ok")) {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.OK,
            respuestasMsn.ERespuestasSwat.SUCCESS
          );
          this.formSolicitud.reset();
          this.getEstadosSolicitud();
        }
      });
  }
}

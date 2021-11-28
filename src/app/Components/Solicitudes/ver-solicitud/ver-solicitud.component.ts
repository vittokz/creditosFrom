import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { IEstadoSolicitud } from "src/app/Shared/Modelos/estado-solicitud";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";

import { MsnRespuestasService } from "src/app/Shared/Services/msn-respuestas.service";
import * as respuestasMsn from "../../../Shared/Enum/respuestas-msn";
import { AuthService } from "src/app/Shared/Services/auth.service";
import { CreditosService } from "src/app/Shared/Services/creditos.service";
import { Credito } from "src/app/Shared/Modelos/creditos";
import { UsuariosService } from "src/app/Shared/Services/usuarios.service";
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
  nuevoCredito: Credito = new Credito();
  listaEstadosSolicitud: IEstadoSolicitud[];
  tipoUsuario: string;
  datosUsuario: any[];
  timeLeft: number = 60;
  interval;
  subscribeTimer: any;
  fecha;
  constructor(
    private rutaActiva: ActivatedRoute,
    private solicitudesService: SolicitudesService,
    private formBuilder: FormBuilder,
    private respuestas: MsnRespuestasService,
    private autService: AuthService,
    private creditosService: CreditosService
  ) {
    let now = new Date();
    this.startTimer();
    this.datosUsuario = this.autService.datosUsuario;
    this.estadoSolicitud.idSolicitud = "";
    this.estadoSolicitud.tipoEstado = "";
    this.estadoSolicitud.descripcion = "";
    this.datoInfo = {
      idSolicitud: this.rutaActiva.snapshot.params.idSolicitud,
    };
    this.getIdentidadLogueado();
    this.getEstadosSolicitud();
    this.getDatosSolicitud();
    this.crearformulario();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 1000);
  }

  getIdentidadLogueado() {
    this.autService.datosUsuario.map((values) => {
      this.tipoUsuario = values.tipoUsuario;
    });
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

  aceptarCredito(dato: any) {
    console.log(dato.idSolicitud);
    this.solicitudesService
      .updateEstadoSolicitud(this.datoInfo.idSolicitud)
      .subscribe((res) => {
        if ((res.estado = "ok")) {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.OK_CREDITO_ACEPTADO,
            respuestasMsn.ERespuestasSwat.SUCCESS
          );
        }
      });
  }

  ngOnInit(): void {}
  getDatosSolicitud() {
    this.solicitudesService
      .getSolicitudById(this.datoInfo.idSolicitud)
      .subscribe((data) => {
        this.solicitud = data;
        console.log("solicitud", this.solicitud);
      });
  }

  submit() {
    this.estadoSolicitud.idSolicitud = this.datoInfo.idSolicitud;
    this.estadoSolicitud.tipoEstado =
      this.formSolicitud.get("estadoSolicitud").value;
    this.estadoSolicitud.descripcion =
      this.formSolicitud.get("descripcion").value;
    this.estadoSolicitud.usuarioRegistra = "";
    this.solicitudesService
      .registrarEstadoSolicitud(this.estadoSolicitud)
      .subscribe((res) => {
        if ((res.estado = "ok")) {
          if (this.estadoSolicitud.tipoEstado == "5") {
            this.crearNuevoCredito();
            this.creditosService
              .addCreditos(this.nuevoCredito)
              .subscribe((dataCredito) => {
                if (dataCredito.estado == "ok") {
                  this.respuestas.mensajeRespuesta(
                    respuestasMsn.ERespuestasMensajes.OK_CREDITO_NUEVO,
                    respuestasMsn.ERespuestasSwat.SUCCESS
                  );
                }
              });
          } else {
            this.respuestas.mensajeRespuesta(
              respuestasMsn.ERespuestasMensajes.OK,
              respuestasMsn.ERespuestasSwat.SUCCESS
            );
          }

          this.formSolicitud.reset();
          this.getEstadosSolicitud();
        }
      });
  }
  crearNuevoCredito() {
    this.nuevoCredito.numContrato = this.solicitud[0].idSolicitud;
    this.nuevoCredito.idCliente = this.solicitud[0].ccSolicitante;
    this.nuevoCredito.montoCredito = parseInt(this.solicitud[0].valorCredito);
    this.nuevoCredito.numCuotas = this.solicitud[0].plazo;
    this.nuevoCredito.interesMensual = this.solicitud[0].interes;
    this.nuevoCredito.valorCuota = this.solicitud[0].valorCuota;
    this.nuevoCredito.usuarioRegistra = this.datosUsuario[0].identidad;
    this.nuevoCredito.estado = "Pendiente aceptar";
  }
}

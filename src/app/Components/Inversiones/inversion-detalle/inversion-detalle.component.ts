import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { CreditosService } from "src/app/Shared/Services/creditos.service";
import { InversionesService } from "src/app/Shared/Services/inversiones.service";
import { MsnRespuestasService } from "src/app/Shared/Services/msn-respuestas.service";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";
import * as respuestasMsn from "../../../Shared/Enum/respuestas-msn";
import { Inversion } from "src/app/Shared/Modelos/inversiones";
@Component({
  selector: "app-inversion-detalle",
  templateUrl: "./inversion-detalle.component.html",
  styleUrls: ["./inversion-detalle.component.sass"],
})
export class InversionDetalleComponent implements OnInit {
  datoInfo: { idSolicitud: string };
  heading = "Detalle de la inversión";
  subheading =
    "Detalles de las inversiones realizadas a la solicitud de crédito";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  listaInversionesAux: any;
  listaInversiones: any;
  detalleSolicitud: Solicitud[];
  sumaInversiones: number = 0;
  formInvertir: FormGroup;
  idSolicitud: string;
  monto: number;
  nuevaInversion: Inversion = new Inversion();
  ccSolicitante: string;
  constructor(
    private rutaActiva: ActivatedRoute,
    private inversionesService: InversionesService,
    private creditoService: CreditosService,
    private respuestas: MsnRespuestasService,
    private formBuilder: FormBuilder,
    private solicitudesServices: SolicitudesService
  ) {
    this.datoInfo = {
      idSolicitud: this.rutaActiva.snapshot.params.idSolicitud,
    };

    this.getInversionesByIdSolicitud();
    this.getInfoSolicitud();
    this.crearFormulario();
  }

  crearFormulario() {
    this.formInvertir = this.formBuilder.group({
      monto: ["", Validators.required],
    });
  }

  getInfoSolicitud() {
    this.solicitudesServices
      .getSolicitudById(this.datoInfo.idSolicitud)
      .subscribe((data) => {
        this.detalleSolicitud = data;
        this.idSolicitud = this.detalleSolicitud[0].idSolicitud;
        this.monto = parseInt(this.detalleSolicitud[0].valorCredito);
        this.ccSolicitante = this.detalleSolicitud[0].ccSolicitante;
        console.log(this.ccSolicitante);
      });
  }
  getInversionesByIdSolicitud() {
    this.inversionesService
      .getInverionesByIdSolicitud(this.datoInfo.idSolicitud)
      .subscribe((data) => {
        this.listaInversiones = data;
        this.listaInversiones = this.listaInversiones.data;
        this.listaInversionesAux = data;
        this.sumaInversiones = this.listaInversionesAux.sumaInversion.suma;
      });
  }

  ngOnInit(): void {}

  submit() {
    this.nuevaInversion.idInversionista = this.ccSolicitante;
    this.nuevaInversion.numContrato = this.idSolicitud;
    this.nuevaInversion.valorInvertido = this.formInvertir.get("monto").value;
    this.nuevaInversion.estado = "Pendiente";
    this.nuevaInversion.usuarioRegistro = this.ccSolicitante;
    console.log(this.nuevaInversion);
    this.inversionesService
      .addInversion(this.nuevaInversion)
      .subscribe((resp) => {
        if (resp.estado == "ok") {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.OK,
            respuestasMsn.ERespuestasSwat.SUCCESS
          );
        }
        this.formInvertir.reset();
        this.getInversionesByIdSolicitud();
      }),
      (error) => {
        console.log("Error al insertar inversion", error);
      };
  }
}

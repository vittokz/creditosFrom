import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Amortizacion } from "src/app/Shared/Modelos/amortizacion";
import { Credito } from "src/app/Shared/Modelos/creditos";
import { Pago } from "src/app/Shared/Modelos/pago";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { AuthService } from "src/app/Shared/Services/auth.service";
import { CreditosService } from "src/app/Shared/Services/creditos.service";
import { MsnRespuestasService } from "src/app/Shared/Services/msn-respuestas.service";
import { PagosService } from "src/app/Shared/Services/pagos.service";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";
import * as respuestasMsn from "../../../../Shared/Enum/respuestas-msn";
import * as htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
@Component({
  selector: "app-detalle-credito",
  templateUrl: "./detalle-credito.component.html",
  styleUrls: ["./detalle-credito.component.sass"],
})
export class DetalleCreditoComponent implements OnInit {
  heading = "Detalle Crédito";
  subheading = "Información del crédito seleccionado";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  creditoSelec: Credito = new Credito();
  datoInfo: { idCredito: string };
  tipoUsuario: string;
  identidadUsuario: string;
  identidadSolicitante: string;
  formPago: FormGroup;
  solicitud: Solicitud[];
  nuevoPago: Pago = new Pago();
  nuevosPagosProximasCuotas: Pago[];
  listPagos: Pago[];
  amortizacionCredito: boolean = false;
  pagos: boolean = false;
  pagosDetalle: boolean = false;
  abonos: Amortizacion = new Amortizacion();
  listAmortizacion: Amortizacion[] = [];
  ultimoPagoRealizado: Pago = new Pago();
  content: any = "";
  tipoInteresSelec: any;

  constructor(
    private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder,
    private respuestas: MsnRespuestasService,
    private autService: AuthService,
    private creditosService: CreditosService,
    private solicitudesService: SolicitudesService,
    private pagosService: PagosService
  ) {}
  getMayorNumCuota() {
    this.pagosService
      .getMayorNumCuota(this.datoInfo.idCredito)
      .subscribe((dataPago) => {
        this.ultimoPagoRealizado = dataPago;
      });
  }
  getPagos() {
    this.pagosService
      .getPagosByIdCredito(this.datoInfo.idCredito)
      .subscribe((dataPagos) => {
        this.listPagos = dataPagos;
      });
  }

  ngOnInit(): void {
    this.datoInfo = {
      idCredito: this.rutaActiva.snapshot.params.idCredito,
    };
    this.getIdentidadLogueado();
    this.crearformulario();
    this.getDatosSolicitud();
    this.getDatosCredito();
    this.getMayorNumCuota();
    this.getPagos();
  }

  crearformulario() {
    this.formPago = this.formBuilder.group({
      tipoPago: ["", Validators.required],
      valorPago: ["", Validators.required],
      fechaPago: ["", Validators.required],
      descripcion: [""],
    });
  }
  getIdentidadLogueado() {
    this.autService.datosUsuario.map((values) => {
      this.tipoUsuario = values.tipoUsuario;
      this.identidadUsuario = values.identidad;
    });
  }

  getDatosSolicitud() {
    this.solicitudesService
      .getSolicitudById(this.datoInfo.idCredito)
      .subscribe((data) => {
        this.solicitud = data;
        this.tipoInteresSelec = this.solicitud[0].tipoInteres;
      });
  }

  getDatosCredito() {
    this.creditosService
      .getCreditoByIdCredito(this.datoInfo.idCredito)
      .subscribe((data) => {
        this.creditoSelec = data;
        this.identidadSolicitante = this.creditoSelec.idCliente;
      });
  }

  calcularCuota() {
    var montoCredito = 0;
    this.nuevoPago.idCliente = this.identidadSolicitante;
    this.nuevoPago.idCredito = this.datoInfo.idCredito;
    this.nuevoPago.usuarioRegistro = this.identidadUsuario;
    let plazo = this.creditoSelec.numCuotas;
    let interes = this.creditoSelec.interesMensual;
    if (this.ultimoPagoRealizado.numCuota == null) {
      montoCredito = this.creditoSelec.montoCredito;
      this.nuevoPago.numCuota = 1;
    } else {
      montoCredito = this.ultimoPagoRealizado.saldoFinal;
      this.nuevoPago.numCuota = this.ultimoPagoRealizado.numCuota + 1;
    }
    this.nuevoPago.valorPago = this.formPago.get("valorPago").value;
    this.nuevoPago.fechaPago = this.formPago.get("fechaPago").value;

    let valorCuota = parseInt(this.creditoSelec.valorCuota);
    var auxInteres = parseInt(interes) / 100;
    var abonoInteres = Math.round(auxInteres * montoCredito);
    var abonoCapital = Math.round(valorCuota - abonoInteres);
    var cantCuotas = parseInt(this.nuevoPago.valorPago) / valorCuota;

    if (cantCuotas >= 1) {
      if (cantCuotas == 1) {
        this.nuevoPago.abonoInteres = abonoInteres;
        this.nuevoPago.abonoCapital = abonoCapital;
        this.nuevoPago.estado = "Completo";
        this.nuevoPago.abonoInteresMora = 0;
        this.nuevoPago.saldoInicial = montoCredito;
        this.nuevoPago.saldoFinal = montoCredito - this.nuevoPago.abonoCapital;
      } else if (cantCuotas > 1) {
        for (let i = 0; i < cantCuotas; i++) {
          this.nuevoPago.abonoInteres = abonoInteres;
          this.nuevoPago.abonoCapital = abonoCapital;
          this.nuevoPago.estado = "Completo";
          this.nuevoPago.abonoInteresMora = 0;
          this.nuevoPago.saldoInicial = montoCredito;
          this.nuevoPago.saldoFinal =
            montoCredito - this.nuevoPago.abonoCapital;
          console.log("nuevopago:", i + " datos: " + this.nuevoPago);
          this.pagosService.addPago(this.nuevoPago).subscribe((resp) => {
            console.log("respu:", resp.credito);
            montoCredito = resp.credito.saldoFinal;
            this.nuevoPago.numCuota = resp.credito.numCuota + 1;
          });

          montoCredito = this.ultimoPagoRealizado.saldoFinal;
          let valorCuota = parseInt(this.creditoSelec.valorCuota);
          var auxInteres = parseInt(interes) / 100;
          var abonoInteres = Math.round(auxInteres * montoCredito);
          var abonoCapital = Math.round(valorCuota - abonoInteres);
        }
      }
    } else {
      if (parseInt(this.nuevoPago.valorPago) <= abonoInteres) {
        this.nuevoPago.abonoInteres = parseInt(this.nuevoPago.valorPago);
        this.nuevoPago.abonoCapital = 0;
        this.nuevoPago.estado = "Pendiente";
      } else {
        this.nuevoPago.abonoInteres = abonoInteres;
        this.nuevoPago.abonoCapital =
          parseInt(this.nuevoPago.valorPago) - abonoInteres;
        this.nuevoPago.estado = "Pendiente";
      }
      this.nuevoPago.abonoInteresMora = 0;
      this.nuevoPago.saldoInicial = montoCredito;
      this.nuevoPago.saldoFinal = montoCredito - this.nuevoPago.abonoCapital;
    }
  }

  submit() {
    var montoCredito = 0;

    if (this.ultimoPagoRealizado.numCuota == null) {
      montoCredito = this.creditoSelec.montoCredito;
      this.nuevoPago.numCuota = 1;
    } else {
      montoCredito = this.ultimoPagoRealizado.saldoFinal;
      this.nuevoPago.numCuota = this.ultimoPagoRealizado.numCuota + 1;
    }

    this.nuevoPago.idCliente = this.identidadSolicitante;
    this.nuevoPago.idCredito = this.datoInfo.idCredito;
    this.nuevoPago.tipoPago = this.formPago.get("tipoPago").value;
    this.nuevoPago.valorPago = this.formPago.get("valorPago").value;
    this.nuevoPago.fechaPago = this.formPago.get("fechaPago").value;
    this.nuevoPago.valorCuota = this.creditoSelec.valorCuota;
    this.nuevoPago.saldoInicial = montoCredito;
    this.nuevoPago.usuarioRegistro = this.identidadUsuario;
    var cantCuotas =
      parseInt(this.nuevoPago.valorPago) / parseInt(this.nuevoPago.valorCuota);

    switch (this.nuevoPago.tipoPago) {
      case "Cuota normal":
        if (this.tipoInteresSelec == "Corriente") {
          if (cantCuotas <= 1) {
            this.pagoCuotaNormal();
          } else {
            this.respuestas.mensajeRespuesta(
              respuestasMsn.ERespuestasMensajes.ERROR_PAGO_CUOTA_NORMAL,
              respuestasMsn.ERespuestasSwat.DANGER
            );
          }
        } else {
          montoCredito = this.creditoSelec.montoCredito;
          this.nuevoPago.abonoInteres = 0;
          this.nuevoPago.abonoCapital = 0;
          this.nuevoPago.abonoCapitalAmortizacion = 0;
          this.nuevoPago.abonoInteresAmortizacion = 0;
          this.nuevoPago.estado = "Completo";
          this.nuevoPago.saldoInicial = montoCredito;
          this.nuevoPago.saldoFinal = montoCredito;
          this.pagoCuotaNormalInteresComun();
        }

        break;
      case "Proximas cuotas":
        if (this.tipoInteresSelec == "Corriente") {
          if (cantCuotas > 1) {
            this.pagoProximasCuotas(cantCuotas, montoCredito);
          } else {
            this.respuestas.mensajeRespuesta(
              respuestasMsn.ERespuestasMensajes.ERROR_PAGO_CPROXIMAS_CUOTAS,
              respuestasMsn.ERespuestasSwat.DANGER
            );
          }
        } else {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.ERROR_PAGO_INTERES_COMUN,
            respuestasMsn.ERespuestasSwat.DANGER
          );
        }

        break;
      case "Abono a capital":
        if (cantCuotas > 2) {
          this.pagoAbonoCapital(cantCuotas, montoCredito);
        } else {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.ERROR_PAGO_CAPITAL,
            respuestasMsn.ERespuestasSwat.DANGER
          );
        }

        break;
    }
  }
  pagoAbonoCapital(cantCuotas: number, montoCreditoParam: number) {
    let montoCredito = montoCreditoParam;
    let interes = this.creditoSelec.interesMensual;
    let saldoFinal = this.ultimoPagoRealizado.saldoFinal;
    this.nuevoPago.abonoInteres = 0;
    this.nuevoPago.abonoCapital = parseInt(this.nuevoPago.valorPago);
    this.nuevoPago.abonoCapitalAmortizacion = 0;
    this.nuevoPago.abonoInteresAmortizacion = 0;
    this.nuevoPago.abonoInteresMora = 0;
    this.nuevoPago.saldoInicial = saldoFinal;
    this.nuevoPago.saldoFinal = saldoFinal - parseInt(this.nuevoPago.valorPago);
    this.nuevoPago.estado = "Completo";
    this.nuevoPago.numCuota = this.ultimoPagoRealizado.numCuota;
    this.agregarPago(this.nuevoPago);
  }
  pagoProximasCuotas(cantCuotas: number, montoCreditoParam: number) {
    let montoCredito = montoCreditoParam;
    let interes = this.creditoSelec.interesMensual;
    let valorCuota = parseInt(this.creditoSelec.valorCuota);
    if (this.ultimoPagoRealizado.estado == "Pendiente") {
      //completa el pago pendiente
      this.nuevoPago.abonoInteres =
        this.ultimoPagoRealizado.abonoInteresAmortizacion;
      this.nuevoPago.abonoCapital =
        this.ultimoPagoRealizado.abonoCapitalAmortizacion;
      this.nuevoPago.abonoCapitalAmortizacion = this.nuevoPago.abonoCapital;
      this.nuevoPago.abonoInteresAmortizacion = this.nuevoPago.abonoInteres;
      this.nuevoPago.estado = "Completo";
      this.nuevoPago.saldoInicial = montoCredito;
      montoCredito = montoCredito - abonoCapital;
      this.nuevoPago.saldoFinal =
        this.ultimoPagoRealizado.saldoFinal - this.nuevoPago.abonoCapital;
      this.nuevoPago.numCuota = this.ultimoPagoRealizado.numCuota;
      debugger;
      this.agregarPago(this.nuevoPago);
      //evaluo cuantos pagos adiciones puede cubrir de numCuotas
      var valorRestado =
        parseInt(this.nuevoPago.valorPago) -
        (this.nuevoPago.abonoCapital + this.nuevoPago.abonoInteres) +
        this.ultimoPagoRealizado.abonoCapital +
        this.ultimoPagoRealizado.abonoInteres;

      if (valorRestado > 0) {
        var cantCuotas = valorRestado / parseInt(this.nuevoPago.valorCuota);

        if (cantCuotas > 1) {
          for (let i = 0; i < Math.trunc(cantCuotas); i++) {
            debugger;
            this.nuevoPago.numCuota = this.nuevoPago.numCuota + 1;
            var auxInteres = parseInt(interes) / 100;
            var abonoInteres = Math.round(
              auxInteres * this.nuevoPago.saldoFinal
            );
            var abonoCapital = Math.round(
              parseInt(this.ultimoPagoRealizado.valorCuota) - abonoInteres
            );
            this.nuevoPago.abonoInteres = abonoInteres;
            this.nuevoPago.abonoCapital = abonoCapital;
            this.nuevoPago.abonoCapitalAmortizacion = abonoCapital;
            this.nuevoPago.abonoInteresAmortizacion = abonoInteres;
            this.nuevoPago.estado = "Completo";
            this.nuevoPago.saldoInicial = this.nuevoPago.saldoFinal;
            montoCredito = this.nuevoPago.saldoFinal - abonoCapital;
            this.nuevoPago.saldoFinal = montoCredito;
            this.agregarPago(this.nuevoPago);
          }
          //agrego el sobrante a la nueva cuota
          var sobrante =
            parseInt(this.nuevoPago.valorPago) -
            valorCuota * Math.trunc(cantCuotas);
          var auxInteres = parseInt(interes) / 100;
          var abonoInteres = Math.round(auxInteres * montoCredito);
          if (sobrante > 0) {
            this.nuevoPago.numCuota = this.nuevoPago.numCuota + 1;
            if (sobrante <= abonoInteres) {
              abonoInteres = sobrante;
              abonoCapital = 0;
              this.nuevoPago.abonoInteres = abonoInteres;
              this.nuevoPago.abonoCapital = abonoCapital;
              this.nuevoPago.estado = "Pendiente";
              this.nuevoPago.saldoInicial = montoCredito;
              montoCredito = montoCredito - abonoCapital;
              this.nuevoPago.saldoFinal = montoCredito;
            } else {
              abonoInteres = abonoInteres;
              abonoCapital = sobrante - abonoInteres;
              this.nuevoPago.abonoInteres = abonoInteres;
              this.nuevoPago.abonoCapital = abonoCapital;
              this.nuevoPago.estado = "Pendiente";
              this.nuevoPago.saldoInicial = montoCredito;
              montoCredito = montoCredito - abonoCapital;
              this.nuevoPago.saldoFinal = montoCredito;
            }
            this.agregarPago(this.nuevoPago);
          }
        } else {
          //agrego el sobrante a la nueva cuota

          var auxInteres = parseInt(interes) / 100;
          var abonoInteres = Math.round(
            auxInteres * this.ultimoPagoRealizado.saldoFinal
          );

          if (valorRestado <= abonoInteres) {
            abonoInteres = valorRestado;
            abonoCapital = 0;
            this.nuevoPago.abonoInteres = abonoInteres;
            this.nuevoPago.abonoCapital = abonoCapital;
            this.nuevoPago.estado = "Pendiente";
            this.nuevoPago.saldoInicial = montoCredito;
            montoCredito = montoCredito - abonoCapital;
            this.nuevoPago.saldoFinal = montoCredito;
          } else {
            abonoInteres = abonoInteres;
            abonoCapital = valorRestado - abonoInteres;
            this.nuevoPago.abonoInteres = abonoInteres;
            this.nuevoPago.abonoCapital = abonoCapital;
            this.nuevoPago.estado = "Pendiente";
            this.nuevoPago.saldoInicial = montoCredito;
            montoCredito = montoCredito - abonoCapital;
            this.nuevoPago.saldoFinal = montoCredito;
          }
          this.agregarPago(this.nuevoPago);
        }
      }
    }
    if (this.ultimoPagoRealizado.estado == "Completo") {
      let valorCuota = parseInt(this.creditoSelec.valorCuota);

      for (let i = 0; i < Math.trunc(cantCuotas); i++) {
        debugger;
        var auxInteres = parseInt(interes) / 100;
        var abonoInteres = Math.round(auxInteres * montoCredito);
        var abonoCapital = Math.round(valorCuota - abonoInteres);
        this.nuevoPago.abonoInteres = abonoInteres;
        this.nuevoPago.abonoCapital = abonoCapital;
        this.nuevoPago.abonoCapitalAmortizacion = abonoCapital;
        this.nuevoPago.abonoInteresAmortizacion = abonoInteres;
        this.nuevoPago.estado = "Completo";
        this.nuevoPago.saldoInicial = montoCredito;
        montoCredito = montoCredito - abonoCapital;
        this.nuevoPago.saldoFinal = montoCredito;
        this.agregarPago(this.nuevoPago);
        this.nuevoPago.numCuota = this.nuevoPago.numCuota + 1;
      }
      //agrego el sobrante a la nueva cuota

      var sobrante =
        parseInt(this.nuevoPago.valorPago) -
        valorCuota * Math.trunc(cantCuotas);
      var auxInteres = parseInt(interes) / 100;
      var abonoInteres = Math.round(auxInteres * montoCredito);
      var abonoCapitalAmorizacion = Math.round(valorCuota - abonoInteres);

      if (sobrante <= abonoInteres) {
        abonoInteres = sobrante;
        abonoCapital = 0;
        this.nuevoPago.abonoInteres = abonoInteres;
        this.nuevoPago.abonoCapital = abonoCapital;
        this.nuevoPago.abonoCapitalAmortizacion = abonoCapital;
        this.nuevoPago.abonoInteresAmortizacion = abonoInteres;
        this.nuevoPago.estado = "Pendiente";

        this.nuevoPago.saldoFinal = this.nuevoPago.saldoInicial;
      } else {
        abonoCapital = sobrante - abonoInteres;
        this.nuevoPago.abonoInteres = abonoInteres;
        this.nuevoPago.abonoCapital = abonoCapital;
        this.nuevoPago.abonoCapitalAmortizacion = abonoCapitalAmorizacion;
        this.nuevoPago.abonoInteresAmortizacion = abonoInteres;
        this.nuevoPago.estado = "Pendiente";
        this.nuevoPago.saldoFinal = this.nuevoPago.saldoInicial;
      }
      this.agregarPago(this.nuevoPago);
    }
  }

  agregarPago(nuevoPago: Pago) {
    this.pagosService.addPago(nuevoPago).subscribe((res) => {
      if ((res.estado = "ok")) {
        this.respuestas.mensajeRespuesta(
          respuestasMsn.ERespuestasMensajes.OK_PAGO_NUEVO,
          respuestasMsn.ERespuestasSwat.SUCCESS
        );
        this.getPagos();
        this.getMayorNumCuota();
        this.formPago.reset();
      }
    });
  }

  pagoCuotaNormal() {
    if (this.ultimoPagoRealizado.estado == "Completo") {
      let valorCuota = parseInt(this.creditoSelec.valorCuota);
      this.nuevoPago.valorPago = this.formPago.get("valorPago").value;
      this.nuevoPago.idCliente = this.identidadSolicitante;
      this.nuevoPago.idCredito = this.datoInfo.idCredito;
      this.nuevoPago.usuarioRegistro = this.identidadUsuario;
      let plazo = this.creditoSelec.numCuotas;

      var montoCredito = 0;
      let interes = this.creditoSelec.interesMensual;
      if (this.ultimoPagoRealizado.numCuota == null) {
        montoCredito = this.creditoSelec.montoCredito;
        this.nuevoPago.numCuota = 1;
      } else {
        montoCredito = this.ultimoPagoRealizado.saldoFinal;
        this.nuevoPago.numCuota = this.ultimoPagoRealizado.numCuota + 1;
      }
      var auxInteres = parseInt(interes) / 100;
      var abonoInteres = Math.round(auxInteres * montoCredito);
      var abonoCapital = Math.round(valorCuota - abonoInteres);
      this.nuevoPago.abonoCapitalAmortizacion = abonoCapital;
      this.nuevoPago.abonoInteresAmortizacion = abonoInteres;

      if (parseInt(this.nuevoPago.valorPago) <= abonoInteres) {
        this.nuevoPago.abonoInteres = parseInt(this.nuevoPago.valorPago);
        this.nuevoPago.abonoCapital = 0;
        this.nuevoPago.estado = "Pendiente";
        this.nuevoPago.saldoInicial = montoCredito;
        this.nuevoPago.saldoFinal = montoCredito;
      } else if (
        parseInt(this.nuevoPago.valorPago) <
        parseInt(this.creditoSelec.valorCuota)
      ) {
        this.nuevoPago.abonoInteres = abonoInteres;
        this.nuevoPago.abonoCapital =
          parseInt(this.nuevoPago.valorPago) - abonoInteres;
        this.nuevoPago.estado = "Pendiente";
        this.nuevoPago.saldoInicial = montoCredito;
        this.nuevoPago.saldoFinal = montoCredito - this.nuevoPago.abonoCapital;
      } else if (
        parseInt(this.nuevoPago.valorPago) ==
        parseInt(this.creditoSelec.valorCuota)
      ) {
        this.nuevoPago.abonoInteres = abonoInteres;
        this.nuevoPago.abonoCapital = abonoCapital;
        this.nuevoPago.estado = "Completo";
        this.nuevoPago.saldoInicial = montoCredito;
        this.nuevoPago.saldoFinal = montoCredito - this.nuevoPago.abonoCapital;
      }
      this.nuevoPago.abonoInteresMora = 0;
      this.pagosService.addPago(this.nuevoPago).subscribe((res) => {
        if ((res.estado = "ok")) {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.OK_PAGO_NUEVO,
            respuestasMsn.ERespuestasSwat.SUCCESS
          );
          this.getPagos();
          this.getMayorNumCuota();
          this.formPago.reset();
        }
      });
    } else {
      //agrego el pagocuando esta pendiente
      let valorCuota = parseInt(this.creditoSelec.valorCuota);
      this.nuevoPago.valorPago = this.formPago.get("valorPago").value;
      let valorAbonado = parseInt(this.nuevoPago.valorPago);
      let interes = this.creditoSelec.interesMensual;
      var auxInteres = parseInt(interes) / 100;
      var abonoInteres = Math.round(
        auxInteres * this.ultimoPagoRealizado.saldoFinal
      );
      var abonoCapital = Math.round(
        parseInt(this.ultimoPagoRealizado.valorCuota) - abonoInteres
      );
      if (valorAbonado > 0) {
        this.nuevoPago.numCuota = parseInt(this.ultimoPagoRealizado.valorCuota);
        if (valorAbonado <= abonoInteres) {
          if (this.ultimoPagoRealizado.abonoInteres < abonoInteres) {
            this.nuevoPago.abonoInteres = abonoInteres;
            valorAbonado =
              valorAbonado -
              abonoInteres +
              this.ultimoPagoRealizado.abonoInteres;
          }
          abonoInteres = valorAbonado;
          abonoCapital = 0;
          this.nuevoPago.abonoInteres = abonoInteres;
          this.nuevoPago.abonoCapital = abonoCapital;
          this.nuevoPago.estado = "Pendiente";
          this.nuevoPago.saldoInicial = montoCredito;
          montoCredito = montoCredito - abonoCapital;
          this.nuevoPago.saldoFinal = montoCredito;
        } else {
          abonoInteres = abonoInteres;
          abonoCapital = valorAbonado - abonoInteres;
          this.nuevoPago.abonoInteres = abonoInteres;
          this.nuevoPago.abonoCapital = abonoCapital;
          this.nuevoPago.estado = "Pendiente";
          this.nuevoPago.saldoInicial = montoCredito;
          montoCredito = montoCredito - abonoCapital;
          this.nuevoPago.saldoFinal = montoCredito;
        }
        this.agregarPago(this.nuevoPago);
      }
    }
  }

  pagoCuotaNormalInteresComun() {
    this.pagosService.addPago(this.nuevoPago).subscribe((res) => {
      if ((res.estado = "ok")) {
        this.respuestas.mensajeRespuesta(
          respuestasMsn.ERespuestasMensajes.OK_PAGO_NUEVO,
          respuestasMsn.ERespuestasSwat.SUCCESS
        );
        this.getPagos();
        this.getMayorNumCuota();
        this.formPago.reset();
      }
    });
  }

  amortizacionButton() {
    this.pagos = false;
    this.pagosDetalle = false;
    this.amortizacionCredito = true;

    let plazo = this.creditoSelec.numCuotas;
    let interes = this.creditoSelec.interesMensual;
    let valorCuota = parseInt(this.creditoSelec.valorCuota);

    this.nuevoPago.abonoCapital = abonoCapital;
    this.nuevoPago.abonoInteres = abonoInteres;
    var auxValorCredito = this.creditoSelec.montoCredito;
    var abonoCapital = 0;
    var abonoInteres = 0;
    var abonosCapital: any[] = [];
    var abonosInteres: any[] = [];
    var amor: any[] = [];
    for (let i = 1; i <= parseInt(plazo); i++) {
      var auxInteres = parseInt(interes) / 100;
      var abonoInteres = auxInteres * auxValorCredito;
      var abonoCapital = valorCuota - abonoInteres;
      var suma = 0;
      auxValorCredito = auxValorCredito - abonoCapital;
      abonosCapital.push(Math.round(abonoInteres));
      abonosInteres.push(Math.round(abonoCapital));
      suma = abonoInteres + abonoCapital;
      let amortiza =
        "Cuota # : " +
        i +
        " Abono interés: " +
        Math.round(abonoInteres) +
        "----Abono capital: " +
        Math.round(abonoCapital) +
        "----Valor cuota: " +
        suma;
      this.content = this.content + "<br>" + amortiza;
      amor[i] = amortiza;
    }
    console.log(amor);
    this.amortizacionButton3();
  }

  amortizacionButton3() {
    let content2 = "<h3><center>AMORTIZACIÓN DEL CRÉDITO</center></h3><center>";
    content2 = content2 + this.content;
    let htmlDocumennt =
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title></title>';
    htmlDocumennt =
      htmlDocumennt + "</head><body>" + content2 + "</body></html>";
    const converted = htmlDocx.asBlob(htmlDocumennt);
    saveAs(converted, "amortizacion.docx");
  }

  amortizacionButton1() {
    this.pagos = false;
    this.pagosDetalle = false;
    this.amortizacionCredito = true;

    let plazo = this.creditoSelec.numCuotas;
    let interes = this.creditoSelec.interesMensual;
    let valorCuota = parseInt(this.creditoSelec.valorCuota);

    this.nuevoPago.abonoCapital = abonoCapital;
    this.nuevoPago.abonoInteres = abonoInteres;
    var auxValorCredito = this.creditoSelec.montoCredito;
    var abonoCapital = 0;
    var abonoInteres = 0;

    for (let i = 1; i <= parseInt(plazo); i++) {
      var auxInteres = parseInt(interes) / 100;
      var abonoInteres = auxInteres * auxValorCredito;
      var abonoCapital = valorCuota - abonoInteres;
      auxValorCredito = auxValorCredito - abonoCapital;
      this.abonos.abonoInteres = Math.round(abonoInteres);
      this.abonos.abonoCapital = Math.round(abonoCapital);
      this.abonos.saldo = Math.round(auxValorCredito);
      this.abonos.valorCuota = valorCuota;

      this.listAmortizacion.push(this.abonos);
    }
    console.log(
      this.listAmortizacion.map((value) => {
        console.log(value);
      })
    );
  }

  pagosButton() {
    this.pagos = true;
    this.amortizacionCredito = false;
    this.pagosDetalle = false;
  }

  pagosDetalleButton() {
    this.pagos = false;
    this.pagosDetalle = true;
    this.amortizacionCredito = false;
  }
}

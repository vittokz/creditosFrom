import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  IDepartamento,
  IMunicipio,
} from "src/app/Shared/Modelos/departamentos";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { AuthService } from "src/app/Shared/Services/auth.service";
import { LocalidadesService } from "src/app/Shared/Services/localidades.service";
import { MsnRespuestasService } from "src/app/Shared/Services/msn-respuestas.service";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";
import { UsuariosService } from "src/app/Shared/Services/usuarios.service";
import * as respuestasMsn from "../../../Shared/Enum/respuestas-msn";
@Component({
  selector: "app-crear-solicitud",
  templateUrl: "./crear-solicitud.component.html",
  styleUrls: ["./crear-solicitud.component.sass"],
})
export class CrearSolicitudComponent implements OnInit {
  heading = "Solicitud de credito";
  subheading = "Formulario para crear solicitud de crédito";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  listDepartamentos: IDepartamento[];
  listMunicipios: IMunicipio[];
  formulario: FormGroup;
  nuevaSolicitud: Solicitud = new Solicitud();

  datosUsuario: any[];
  constructor(
    private departamentos: LocalidadesService,
    private formBuilder: FormBuilder,
    private respuestas: MsnRespuestasService,
    private usuarioService: UsuariosService,
    private authService: AuthService,
    private solicitudService: SolicitudesService
  ) {}

  ngOnInit(): void {
    this.datosUsuario = this.authService.datosUsuario;

    this.getDepartamentos();
    this.crearFormulario();
    this.nuevaSolicitud.tipoDoc = "";
    this.nuevaSolicitud.ccSolicitante = "";
    this.nuevaSolicitud.nombreSolicitante = "";
    this.nuevaSolicitud.apellidoSolicitante = "";
    this.nuevaSolicitud.email = "";
    this.nuevaSolicitud.celular = "";
    this.nuevaSolicitud.deptoSolicitante = "";
    this.nuevaSolicitud.municipioSolicitante = "";
    this.nuevaSolicitud.valorCredito = "";
    this.nuevaSolicitud.plazo = "";
    this.nuevaSolicitud.tipoCredito = "";
    this.nuevaSolicitud.valorCuota = "";
    this.nuevaSolicitud.interes = "";
    this.nuevaSolicitud.numRegistroPredio = "";
    this.nuevaSolicitud.certificadoLyT = "";
    this.nuevaSolicitud.dptoLyT = "";
    this.nuevaSolicitud.municipioLyT = "";
    this.nuevaSolicitud.estado = "";
  }
  getDepartamentos() {
    this.departamentos.getAllDepartamentos().subscribe((data) => {
      this.listDepartamentos = data;
    });
  }

  selecDepartamento(eventDepartamento) {
    this.departamentos
      .getAllMunicipios(eventDepartamento.target.value)
      .subscribe((data) => {
        this.listMunicipios = data;
      });
  }

  crearFormulario() {
    this.formulario = this.formBuilder.group({
      tipoInteres: ["", Validators.required],
      valorCredito: ["", Validators.required],
      interes: ["", Validators.required],
      tipoCredito: ["", Validators.required],
      valorCuota: ["", Validators.required],
      plazo: ["", Validators.required],
      numPredio: ["", Validators.required],
      departamentos: ["", Validators.required],
      municipios: ["", Validators.required],
    });
  }

  calcularCuota() {
    this.nuevaSolicitud.plazo = this.formulario.get("plazo").value;
    this.nuevaSolicitud.tipoInteres = this.formulario.get("tipoInteres").value;
    this.nuevaSolicitud.valorCredito =
      this.formulario.get("valorCredito").value;
    this.nuevaSolicitud.interes = this.formulario.get("interes").value;
    var auxInteres = parseInt(this.nuevaSolicitud.interes) / 100;
    var abonoInteres = auxInteres * parseInt(this.nuevaSolicitud.valorCredito);

    console.log("abonoInteres", abonoInteres);
    var auxDivisor = 1 - Math.pow(1 + auxInteres, -this.nuevaSolicitud.plazo);
    console.log("auxDivisor", auxDivisor);
    var valor = abonoInteres / auxDivisor;
    console.log("valor", valor);

    this.nuevaSolicitud.valorCuota = Math.round(valor).toString();

    this.formulario.get("valorCuota").setValue(this.nuevaSolicitud.valorCuota);
  }

  submit() {
    this.nuevaSolicitud.tipoDoc = this.datosUsuario[0].tipo;
    this.nuevaSolicitud.ccSolicitante = this.datosUsuario[0].identidad;
    this.nuevaSolicitud.nombreSolicitante = this.datosUsuario[0].nombre;
    this.nuevaSolicitud.apellidoSolicitante = this.datosUsuario[0].apellido;
    this.nuevaSolicitud.email = this.datosUsuario[0].email;
    this.nuevaSolicitud.celular = this.datosUsuario[0].celular;
    this.nuevaSolicitud.deptoSolicitante = this.datosUsuario[0].departamento;
    this.nuevaSolicitud.municipioSolicitante = this.datosUsuario[0].municipio;

    this.nuevaSolicitud.tipoCredito = this.formulario.get("tipoCredito").value;

    this.nuevaSolicitud.numRegistroPredio =
      this.formulario.get("numPredio").value;
    this.nuevaSolicitud.certificadoLyT = "";
    this.nuevaSolicitud.dptoLyT = this.formulario.get("departamentos").value;
    this.nuevaSolicitud.municipioLyT = this.formulario.get("municipios").value;
    this.nuevaSolicitud.estado = "Pendiente inversion";

    this.solicitudService
      .addSolicitud(this.nuevaSolicitud)
      .subscribe((resp) => {
        if (resp.estado == "ok") {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.OK,
            respuestasMsn.ERespuestasSwat.SUCCESS
          );
        }
        this.formulario.reset();
      }),
      (error) => {
        console.log("Error al insertar usuario", error);
      };
  }
}

import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDepartamento, IMunicipio } from "../../Modelos/departamentos";
import { Usuario } from "../../Modelos/usuarios";
import { LocalidadesService } from "../../Services/localidades.service";
import { MsnRespuestasService } from "../../Services/msn-respuestas.service";
import * as respuestasMsn from "../../../Shared/Enum/respuestas-msn";
import { UsuariosService } from "../../Services/usuarios.service";

@Component({
  selector: "app-input-formulario",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.sass"],
})
export class InputComponent implements OnInit {
  listDepartamentos: IDepartamento[];
  listMunicipios: IMunicipio[];
  formulario: FormGroup;
  nuevo: Usuario = new Usuario();
  @Input() nombreFormulario: string;
  @Input() tipoPersona: string;

  constructor(
    private departamentos: LocalidadesService,
    private formBuilder: FormBuilder,
    private respuestas: MsnRespuestasService,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.getDepartamentos();
    this.crearFormulario();
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
      tipoDocumento: ["", Validators.required],
      identidad: ["", Validators.required],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      genero: ["", Validators.required],
      direccion: ["", Validators.required],
      telefono: ["", Validators.required],
      celular: ["", Validators.required],
      email: ["", Validators.required],
      departamentos: ["", Validators.required],
      municipios: ["", Validators.required],
      estado: ["", Validators.required],
    });
  }

  submit() {
    this.nuevo.tipo = this.formulario.get("tipoDocumento").value;
    this.nuevo.identidad = this.formulario.get("identidad").value;
    this.nuevo.nombre = this.formulario.get("nombre").value;
    this.nuevo.apellido = this.formulario.get("apellido").value;
    this.nuevo.direccion = this.formulario.get("direccion").value;
    this.nuevo.email = this.formulario.get("email").value;
    this.nuevo.celular = this.formulario.get("celular").value;
    this.nuevo.telefono = this.formulario.get("telefono").value;
    this.nuevo.genero = this.formulario.get("genero").value;
    this.nuevo.pais = "Colombia";
    this.nuevo.departamento = this.formulario.get("departamentos").value;
    this.nuevo.municipio = this.formulario.get("municipios").value;
    this.nuevo.tipoUsuario = this.tipoPersona;
    this.nuevo.estado = "Activo";
    this.nuevo.usuarioRegistra = "vitto";
    this.usuarioService.addUsuario(this.nuevo).subscribe((resp) => {
      this.respuestas.mensajeRespuesta(
        respuestasMsn.ERespuestasMensajes.OK,
        respuestasMsn.ERespuestasSwat.SUCCESS
      );
      this.formulario.reset();
    }),
      (error) => {
        console.log("Error al insertar usuario", error);
      };
  }
}

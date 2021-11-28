import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "../../Modelos/usuarios";
import { UsuariosService } from "../../Services/usuarios.service";
import * as respuestasMsn from "../../../Shared/Enum/respuestas-msn";
import { MsnRespuestasService } from "../../Services/msn-respuestas.service";
@Component({
  selector: "app-editar-usuarios-form",
  templateUrl: "./editar-usuarios-form.component.html",
  styleUrls: ["./editar-usuarios-form.component.sass"],
})
export class EditarUsuariosFormComponent implements OnInit {
  @Input() infoUsuario: Usuario[];
  @Input() identidad: string;
  usuarioSelec: Usuario[];
  nuevo: Usuario = new Usuario();
  formulario: FormGroup;
  identidadActual: string;
  nombre: string;
  apellido: string;
  genero: string;
  direccion: string;
  telefono: string;
  celular: string;
  email: string;
  estado: string;
  heading = "Modificación de datos";
  subheading = "Modificar datos personales.";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private respuestas: MsnRespuestasService
  ) {}

  ngOnInit(): void {
    this.getDatosUsuario();
    this.crearformulario();
  }

  asignarDatosForm() {
    this.formulario.get("identidad").setValue(this.identidad);
    this.formulario.get("nombre").setValue(this.nombre);
    this.formulario.get("apellido").setValue(this.apellido);
    this.formulario.get("genero").setValue(this.genero);
    this.formulario.get("direccion").setValue(this.direccion);
    this.formulario.get("telefono").setValue(this.telefono);
    this.formulario.get("celular").setValue(this.celular);
    this.formulario.get("email").setValue(this.email);
    this.formulario.get("estado").setValue(this.estado);
  }

  getDatosUsuario() {
    this.usuarioService
      .getUsuarioByIdentidad(this.identidad)
      .subscribe((data) => {
        this.usuarioSelec = data;
        this.identidadActual = this.usuarioSelec[0].identidad;
        this.nombre = this.usuarioSelec[0].nombre;
        this.apellido = this.usuarioSelec[0].apellido;
        this.genero = this.usuarioSelec[0].genero;
        this.direccion = this.usuarioSelec[0].direccion;
        this.telefono = this.usuarioSelec[0].telefono;
        this.celular = this.usuarioSelec[0].celular;
        this.email = this.usuarioSelec[0].email;
        this.estado = this.usuarioSelec[0].estado;
        this.asignarDatosForm();
      });
  }
  submit() {
    //this.nuevo.tipo = this.formulario.get("tipoDocumento").value;
    this.nuevo.identidad = this.formulario.get("identidad").value;
    this.nuevo.nombre = this.formulario.get("nombre").value;
    this.nuevo.apellido = this.formulario.get("apellido").value;
    this.nuevo.direccion = this.formulario.get("direccion").value;
    this.nuevo.email = this.formulario.get("email").value;
    this.nuevo.celular = this.formulario.get("celular").value;
    this.nuevo.telefono = this.formulario.get("telefono").value;
    this.nuevo.genero = this.formulario.get("genero").value;
    // this.nuevo.pais = "Colombia";
    // this.nuevo.departamento = this.formulario.get("departamentos").value;
    // this.nuevo.municipio = this.formulario.get("municipios").value;
    // this.nuevo.tipoUsuario = "this.tipoPersona";
    this.nuevo.estado = this.formulario.get("estado").value;
    this.nuevo.usuarioRegistra = this.infoUsuario[0].identidad;
    console.log(this.nuevo);
    this.usuarioService
      .updateUsuario(this.identidad, this.nuevo)
      .subscribe((resp) => {
        console.log(resp);
        if (resp.estado == "ok") {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.OK__ACTUALIZADO,
            respuestasMsn.ERespuestasSwat.SUCCESS
          );
        }
      }),
      (error) => {
        console.log("Error al editar", error);
        this.respuestas.mensajeRespuesta(
          respuestasMsn.ERespuestasMensajes.ERROR__ACTUALIZADO,
          respuestasMsn.ERespuestasSwat.DANGER
        );
      };
  }

  crearformulario() {
    this.formulario = this.formBuilder.group({
      identidad: ["", Validators.required],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      genero: ["", Validators.required],
      direccion: ["", Validators.required],
      telefono: ["", Validators.required],
      celular: ["", Validators.required],
      email: ["", Validators.required],
      estado: ["", Validators.required],
    });
  }
}

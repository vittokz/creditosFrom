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
  nuevo: Usuario = new Usuario();
  heading = "Modificación de datos";
  subheading = "Modificar datos personales.";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private respuestas: MsnRespuestasService
  ) {}

  ngOnInit(): void {}
  submit() {
    /* this.nuevo.departamento = this.formEditar.get("departamentos").value;
    this.nuevo.municipio = this.formEditar.get("municipios").value; */
    this.usuarioService
      .updateUsuario(this.nuevo.identidad, this.nuevo)
      .subscribe((resp) => {
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
}

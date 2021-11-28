import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MsnRespuestasService } from "../../../Shared/Services/msn-respuestas.service";
import * as respuestasMsn from "../../../Shared/Enum/respuestas-msn";
import { UsuariosService } from "src/app/Shared/Services/usuarios.service";
@Component({
  selector: "app-forgot-password-boxed",
  templateUrl: "./forgot-password-boxed.component.html",
  styles: [],
})
export class ForgotPasswordBoxedComponent implements OnInit {
  formForget: FormGroup;
  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private respuestas: MsnRespuestasService
  ) {}

  ngOnInit() {
    this.crearForm();
  }
  crearForm() {
    this.formForget = this.fb.group({
      email: ["", Validators.required],
    });
  }

  recuperar() {
    let email = this.formForget.get("email").value;
    this.usuarioService.recuperarUsuario(email).subscribe((resp) => {
      this.respuestas.mensajeRespuesta(
        respuestasMsn.ERespuestasMensajes.OK_EMAIL,
        respuestasMsn.ERespuestasSwat.SUCCESS
      );
      this.formForget.reset();
    }),
      (error) => {
        console.log("Error al recuperar contraseña", error);
      };
  }
}

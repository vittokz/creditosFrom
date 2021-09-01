import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ERespuestasMensajes } from "src/app/Shared/Enum/respuestas-msn";
import { Login } from "src/app/Shared/Modelos/usuarios";
import { AuthService } from "src/app/Shared/Services/auth.service";
import { MsnRespuestasService } from "src/app/Shared/Services/msn-respuestas.service";
import { UsuariosService } from "src/app/Shared/Services/usuarios.service";
import * as respuestasMsn from "../../../Shared/Enum/respuestas-msn";

@Component({
  selector: "app-login-boxed",
  templateUrl: "./login-boxed.component.html",
  styles: [],
})
export class LoginBoxedComponent implements OnInit {
  formLogin: FormGroup;
  nuevoLogin: Login = new Login();
  datosUsuario: any[];
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private ruta: Router,
    private respuestas: MsnRespuestasService
  ) {}

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formLogin = this.formBuilder.group({
      identidad: ["", Validators.compose([Validators.required])],
      password: ["", Validators.required],
    });
  }

  validarLogin() {
    this.nuevoLogin.identidad = this.formLogin.get("identidad").value;
    this.nuevoLogin.password = this.formLogin.get("password").value;
    console.log(this.nuevoLogin);
    this.authService
      .login(this.nuevoLogin.identidad, this.nuevoLogin.password)
      .subscribe((resp) => {
        if (resp.idError == 0) {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.ERROR_ACCESO,
            respuestasMsn.ERespuestasSwat.INFO
          );
        } else {
          this.respuestas.mensajeRespuesta(
            respuestasMsn.ERespuestasMensajes.OK_ACCESO,
            respuestasMsn.ERespuestasSwat.SUCCESS
          );
          this.authService.setToken(resp.token);
          this.authService.datosUsuario = resp.acceso;
          this.authService
            .getTipoUsuario(this.nuevoLogin.identidad)
            .subscribe((resp) => {
              if (resp) {
                this.authService.setTipoUsuario(resp[0].tipoUsuario);
              }
            });
          this.ruta.navigateByUrl("/dashboard");
        }
      }),
      (error) => {
        console.log("Error en la consulta");
      };
  }
}

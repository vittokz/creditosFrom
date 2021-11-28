import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "src/app/Shared/Modelos/usuarios";
import { AuthService } from "src/app/Shared/Services/auth.service";
import { MsnRespuestasService } from "src/app/Shared/Services/msn-respuestas.service";
import { UsuariosService } from "src/app/Shared/Services/usuarios.service";
import * as respuestasMsn from "../../Shared/Enum/respuestas-msn";
import { timer } from "rxjs";
import { SwPush } from "@angular/service-worker";
@Component({
  selector: "app-perfil",
  templateUrl: "./perfil.component.html",
  styleUrls: ["./perfil.component.sass"],
})
export class PerfilComponent implements OnInit {
  heading = "Perfil de usuario";
  subheading = "Datos personales y de acceso a la plataforma.";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  datosUsuario: Usuario[];
  formPerfil: FormGroup;
  respuesta: any;
  readonly VAPID_PUBLIC_KEY =
    "BMFNTrvyY2JMuZ-_0HowqQvfDwrWAK_n85sL5Ru3kVqeaCTq0U7dwyi3xUtWtPwptMmu0E86IWGljXov5nE4UMw";

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private respuestas: MsnRespuestasService,
    private usuarioService: UsuariosService,
    private swPush: SwPush
  ) {
    this.getUsuarioLogueado();
  }
  getUsuarioLogueado() {
    this.datosUsuario = this.authService.datosUsuario;
  }

  ngOnInit(): void {
    this.crearformPerfil();
  }

  crearformPerfil() {
    this.formPerfil = this.formBuilder.group({
      identidad: [this.datosUsuario[0].identidad],
      nombre: [this.datosUsuario[0].nombre, Validators.required],
      apellido: [this.datosUsuario[0].apellido, Validators.required],
      genero: [this.datosUsuario[0].genero, Validators.required],
      direccion: [this.datosUsuario[0].direccion, Validators.required],
      telefono: [this.datosUsuario[0].telefono, Validators.required],
      celular: [this.datosUsuario[0].celular, Validators.required],
      email: [this.datosUsuario[0].email, Validators.required],
      estado: [this.datosUsuario[0].estado, Validators.required],
    });
  }

  submit() {
    this.swPush
      .requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
      .then((respuesta) => {
        this.respuesta = respuesta;
      })
      .catch((err) => {
        this.respuesta = err;
      });
    this.datosUsuario[0].nombre = this.formPerfil.get("nombre").value;
    this.datosUsuario[0].apellido = this.formPerfil.get("apellido").value;
    this.datosUsuario[0].direccion = this.formPerfil.get("direccion").value;
    this.datosUsuario[0].email = this.formPerfil.get("email").value;
    this.datosUsuario[0].celular = this.formPerfil.get("celular").value;
    this.datosUsuario[0].telefono = this.formPerfil.get("telefono").value;
    this.datosUsuario[0].genero = this.formPerfil.get("genero").value;
    this.usuarioService
      .editarUsuario(this.datosUsuario[0].identidad, this.datosUsuario[0])
      .subscribe((resp) => {
        this.respuestas.mensajeRespuesta(
          respuestasMsn.ERespuestasMensajes.OK__ACTUALIZADO,
          respuestasMsn.ERespuestasSwat.SUCCESS
        );
        this.getUsuarioLogueado();
      }),
      (error) => {
        console.log("Error al editar usuario", error);
      };
  }
}

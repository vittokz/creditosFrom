import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Usuario } from "../../Modelos/usuarios";
import { UsuariosService } from "../../Services/usuarios.service";

@Component({
  selector: "app-editar-usuarios-compartido",
  templateUrl: "./editar-usuarios-compartido.component.html",
  styleUrls: ["./editar-usuarios-compartido.component.sass"],
})
export class EditarUsuariosCompartidoComponent implements OnInit {
  datoInfo: { identidad: string };
  infoUsuario: Usuario[];
  constructor(
    private rutaActiva: ActivatedRoute,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.datoInfo = {
      identidad: this.rutaActiva.snapshot.params.data,
    };
    this.getDatosUsuario();
  }
  getDatosUsuario() {
    this.usuarioService
      .getUsuarioByIdentidad(this.datoInfo.identidad)
      .subscribe((data) => {
        this.infoUsuario = data;
      });
  }
}

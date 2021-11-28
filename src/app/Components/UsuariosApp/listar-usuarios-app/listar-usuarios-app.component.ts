import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/Shared/Modelos/usuarios";
import { UsuariosService } from "src/app/Shared/Services/usuarios.service";

@Component({
  selector: "app-listar-usuarios-app",
  templateUrl: "./listar-usuarios-app.component.html",
  styleUrls: ["./listar-usuarios-app.component.sass"],
})
export class ListarUsuariosAppComponent implements OnInit {
  listaEmpleados: Usuario[];
  titulo: string = "Lista de Usuarios plataforma";
  tipoPersona: string = "Administrador";
  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }
  getUsuarios() {
    this.usuarioService
      .getUsuarioByTipoDiferenteAdmin(this.tipoPersona)
      .subscribe((data) => {
        this.listaEmpleados = data;
      });
  }
}

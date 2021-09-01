import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/Shared/Modelos/usuarios";
import { UsuariosService } from "src/app/Shared/Services/usuarios.service";

@Component({
  selector: "app-listar-usuarios-empresa",
  templateUrl: "./listar-usuarios-empresa.component.html",
  styleUrls: ["./listar-usuarios-empresa.component.sass"],
})
export class ListarUsuariosEmpresaComponent implements OnInit {
  listaEmpleados: Usuario[];
  titulo: string = "Lista de Usuarios Empresa";
  tipoPersona: string = "Administrador";
  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }
  getUsuarios() {
    this.usuarioService.getUsuarioByTipo(this.tipoPersona).subscribe((data) => {
      this.listaEmpleados = data;
    });
  }
}

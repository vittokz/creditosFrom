import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/Shared/Modelos/usuarios";
import { UsuariosService } from "src/app/Shared/Services/usuarios.service";

@Component({
  selector: "app-listar-cliente",
  templateUrl: "./listar-cliente.component.html",
  styleUrls: ["./listar-cliente.component.sass"],
})
export class ListarClienteComponent implements OnInit {
  listaClientes: Usuario[];
  titulo: string = "Lista de Clientes";
  tipoPersona: string = "Cliente";

  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuarioService.getUsuarioByTipo(this.tipoPersona).subscribe((data) => {
      this.listaClientes = data;
    });
  }
}

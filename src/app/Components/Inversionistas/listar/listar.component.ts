import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/Shared/Modelos/usuarios";
import { UsuariosService } from "src/app/Shared/Services/usuarios.service";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.sass"],
})
export class ListarComponent implements OnInit {
  listaInversionistas: Usuario[];
  titulo: string = "Lista de Inversionistas";
  tipoPersona: string = "Inversionista";
  constructor(private usuarioService: UsuariosService) {}

  ngOnInit(): void {
    this.getUsuarios();
  }
  getUsuarios() {
    this.usuarioService.getUsuarioByTipo(this.tipoPersona).subscribe((data) => {
      this.listaInversionistas = data;
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { Credito } from "src/app/Shared/Modelos/creditos";
import { Usuario } from "src/app/Shared/Modelos/usuarios";
import { AuthService } from "src/app/Shared/Services/auth.service";
import { CreditosService } from "src/app/Shared/Services/creditos.service";

@Component({
  selector: "app-listar-creditos-clientes",
  templateUrl: "./listar-creditos-clientes.component.html",
  styleUrls: ["./listar-creditos-clientes.component.sass"],
})
export class ListarCreditosClientesComponent implements OnInit {
  heading = "Listado general de créditos";
  subheading = "Lista de créditos";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  listCreditos: Credito[];
  datosUsuario: Usuario[];
  constructor(
    private creditosService: CreditosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUsuarioLogueado();
    this.getCreditosClientesByIdentidad();
  }
  getUsuarioLogueado() {
    this.datosUsuario = this.authService.datosUsuario;
  }

  getCreditosClientesByIdentidad() {
    this.creditosService
      .getCreditosByIdentidad(this.datosUsuario[0].identidad)
      .subscribe((dataCreditos) => {
        this.listCreditos = dataCreditos;
      });
  }
}

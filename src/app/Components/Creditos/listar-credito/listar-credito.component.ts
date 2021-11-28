import { Component, OnInit } from "@angular/core";
import { Credito } from "src/app/Shared/Modelos/creditos";
import { Usuario } from "src/app/Shared/Modelos/usuarios";
import { AuthService } from "src/app/Shared/Services/auth.service";
import { CreditosService } from "src/app/Shared/Services/creditos.service";

@Component({
  selector: "app-listar-credito",
  templateUrl: "./listar-credito.component.html",
  styleUrls: ["./listar-credito.component.sass"],
})
export class ListarCreditoComponent implements OnInit {
  heading = "Listado general de créditos";
  subheading = "Lista de créditos";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  listCreditos: Credito[];

  constructor(private creditosService: CreditosService) {}

  ngOnInit(): void {
    this.getCreditos();
  }

  getCreditos() {
    this.creditosService.getAllCreditos().subscribe((dataCreditos) => {
      this.listCreditos = dataCreditos;
    });
  }
}

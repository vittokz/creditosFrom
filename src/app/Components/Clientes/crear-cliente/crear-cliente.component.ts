import { Component, OnInit } from "@angular/core";
import { IDepartamento } from "src/app/Shared/Modelos/departamentos";
import { LocalidadesService } from "src/app/Shared/Services/localidades.service";

@Component({
  selector: "app-crear-cliente",
  templateUrl: "./crear-cliente.component.html",
  styleUrls: ["./crear-cliente.component.sass"],
})
export class CrearClienteComponent implements OnInit {
  heading = "Clientes";
  subheading = "Cree un Cliente.";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  listDepartamentos: IDepartamento[];
  nombreFormulario: String = "Datos personales cliente";
  tipoPersona : String = "Cliente";
  constructor(private departamentos: LocalidadesService) {}

  ngOnInit(): void {
    this.getDepartamentos();
  }
  getDepartamentos() {
    this.departamentos.getAllDepartamentos().subscribe((data) => {
      this.listDepartamentos = data;
    });
  }
}

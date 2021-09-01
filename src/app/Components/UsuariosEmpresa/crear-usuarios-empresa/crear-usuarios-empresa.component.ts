import { Component, OnInit } from "@angular/core";
import { IDepartamento } from "src/app/Shared/Modelos/departamentos";
import { LocalidadesService } from "src/app/Shared/Services/localidades.service";

@Component({
  selector: "app-crear-usuarios-empresa",
  templateUrl: "./crear-usuarios-empresa.component.html",
  styleUrls: ["./crear-usuarios-empresa.component.sass"],
})
export class CrearUsuariosEmpresaComponent implements OnInit {
  heading = "Usuarios Empresa";
  subheading = "Crear usuarios de empresa.";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  nombreFormulario: String = "Datos personales usuarios empresa";
  listDepartamentos: IDepartamento[];
  tipoPersona: String = "Administrador";
  
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

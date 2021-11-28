import { Component, OnInit } from "@angular/core";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { AuthService } from "src/app/Shared/Services/auth.service";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";

@Component({
  selector: "app-listar-solicitud-clientes",
  templateUrl: "./listar-solicitud-clientes.component.html",
  styleUrls: ["./listar-solicitud-clientes.component.sass"],
})
export class ListarSolicitudClientesComponent implements OnInit {
  heading = "Lista de Solicitudes";
  subheading = "Listado de solucitudes realizadas";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  listaSolicitudes: Solicitud[];
  identidad: string;
  constructor(
    private solicitudesService: SolicitudesService,
    private autService: AuthService
  ) {
    this.getIdentidadLogueado();
    this.getSolicitudes();
  }
  getIdentidadLogueado() {
    this.autService.datosUsuario.map((values) => {
      this.identidad = values.identidad;
    });
  }

  getSolicitudes() {
    this.solicitudesService
      .getSolicitudByIdentidad(this.identidad)
      .subscribe((data) => {
        this.listaSolicitudes = data;
        console.log("solicitudes", this.listaSolicitudes);
      });
  }

  ngOnInit(): void {}
}

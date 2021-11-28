import { Component, OnInit } from "@angular/core";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";

@Component({
  selector: "app-inversiones-administrador",
  templateUrl: "./inversiones-administrador.component.html",
  styleUrls: ["./inversiones-administrador.component.sass"],
})
export class InversionesAdministradorComponent implements OnInit {
  heading = "Lista de Solicitudes";
  subheading = "Listado de solucitudes para revisar las inversiones realizadas";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  estadoBuscado: string = "Pendiente inversion";
  listaSolicitudes: Solicitud[];
  constructor(private solicitudesService: SolicitudesService) {
    this.getSolicitudes();
  }
  getSolicitudes() {
    this.solicitudesService
      .getSolicitudesByEstado(this.estadoBuscado)
      .subscribe((data) => {
        this.listaSolicitudes = data;
      });
  }

  ngOnInit(): void {}
}

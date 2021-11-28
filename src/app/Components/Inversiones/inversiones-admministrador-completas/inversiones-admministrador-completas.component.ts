import { Component, OnInit } from "@angular/core";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";

@Component({
  selector: "app-inversiones-admministrador-completas",
  templateUrl: "./inversiones-admministrador-completas.component.html",
  styleUrls: ["./inversiones-admministrador-completas.component.sass"],
})
export class InversionesAdmministradorCompletasComponent implements OnInit {
  heading = "Lista de Solicitudes";
  subheading =
    "Listado de solicitudes que se encuentran ya completas con el monto del crèdito";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  estadoBuscado: string = "Completa";
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

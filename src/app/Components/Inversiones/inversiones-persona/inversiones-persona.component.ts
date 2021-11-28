import { Component, OnInit } from "@angular/core";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { CreditosService } from "src/app/Shared/Services/creditos.service";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";

@Component({
  selector: "app-inversiones-persona",
  templateUrl: "./inversiones-persona.component.html",
  styleUrls: ["./inversiones-persona.component.sass"],
})
export class InversionesPersonaComponent implements OnInit {
  heading = "Listado general de inversiones";
  subheading = "Lista de inversiones";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  listSolicitudes: Solicitud[];
  estadoCredito: string = "Pendiente inversion";
  constructor(private solicitudService: SolicitudesService) {}

  ngOnInit(): void {
    this.getCreditos();
  }

  getCreditos() {
    this.solicitudService
      .getSolicitudesByEstado(this.estadoCredito)
      .subscribe((dataSolicitudes) => {
        this.listSolicitudes = dataSolicitudes;
      });
  }
}

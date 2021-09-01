import { Component, OnInit } from "@angular/core";
import { Solicitud } from "src/app/Shared/Modelos/solicitud-credito";
import { SolicitudesService } from "src/app/Shared/Services/solicitudes.service";

@Component({
  selector: "app-listar-solicitud",
  templateUrl: "./listar-solicitud.component.html",
  styleUrls: ["./listar-solicitud.component.sass"],
})
export class ListarSolicitudComponent implements OnInit {
  heading = "Lista de Solicitudes";
  subheading = "Listado de solucitudes de posibles clientes";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  listaSolicitudes: Solicitud[];
  constructor(private solicitudesService: SolicitudesService) {
    this.getSolicitudes();
  }
  getSolicitudes() {
     this.solicitudesService.getAllSolicitudes().subscribe(data=>{
       this.listaSolicitudes = data;
     });
  }

  ngOnInit(): void {}
}

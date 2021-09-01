import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-crear",
  templateUrl: "./crear.component.html",
  styleUrls: ["./crear.component.sass"],
})
export class CrearComponent implements OnInit {
  heading = "Inversionistas";
  subheading = "Cree un inversionista.";
  icon = "pe-7s-display1 icon-gradient bg-premium-dark";
  nombreFormulario: String = "Datos personales inversionista";
  tipoPersona: String = "Inversionista";
  constructor() {}

  ngOnInit(): void {}
}

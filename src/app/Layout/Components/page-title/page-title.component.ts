import { Component, Input, OnInit } from "@angular/core";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Usuario } from "src/app/Shared/Modelos/usuarios";
import { AuthService } from "src/app/Shared/Services/auth.service";

@Component({
  selector: "app-page-title",
  templateUrl: "./page-title.component.html",
})
export class PageTitleComponent implements OnInit {
  faStar = faStar;
  faPlus = faPlus;

  @Input() heading;
  @Input() subheading;
  @Input() icon;
  datosUsuario: Usuario[];
  nombre: string;
  apellido: string;

  constructor(private authService: AuthService) {
    this.getUsuarioLogueado();
  }

  ngOnInit(): void {}

  getUsuarioLogueado() {
    this.datosUsuario = this.authService.datosUsuario;
    this.nombre = this.datosUsuario[0].nombre;
    this.apellido = this.datosUsuario[0].apellido;
  }
}

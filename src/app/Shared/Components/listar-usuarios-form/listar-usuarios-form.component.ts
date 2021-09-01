import { Component, Input, OnInit } from "@angular/core";
import { Usuario } from "../../Modelos/usuarios";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-listar-usuarios-form",
  templateUrl: "./listar-usuarios-form.component.html",
  styleUrls: ["./listar-usuarios-form.component.sass"],
})
export class ListarUsuariosFormComponent implements OnInit {
  @Input() lista: Usuario[];
  @Input() titulo: string;
  constructor() {}

  ngOnInit(): void {}
}

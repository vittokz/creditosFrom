import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Shared/Services/auth.service";
import { ThemeOptions } from "../../../../../theme-options";

@Component({
  selector: "app-user-box",
  templateUrl: "./user-box.component.html",
})
export class UserBoxComponent implements OnInit {
  constructor(
    public globals: ThemeOptions,
    private autService: AuthService,
    private ruta: Router
  ) {}

  ngOnInit() {}

  salir() {
    this.autService.removeToken();
    this.ruta.navigateByUrl("pages/login-boxed");
  }
}

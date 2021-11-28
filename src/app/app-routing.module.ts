import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BaseLayoutComponent } from "./Layout/base-layout/base-layout.component";
import { PagesLayoutComponent } from "./Layout/pages-layout/pages-layout.component";

// DEMO PAGES

// Dashboards

import { AnalyticsComponent } from "./DemoPages/Dashboards/analytics/analytics.component";

// Pages

import { ForgotPasswordBoxedComponent } from "./DemoPages/UserPages/forgot-password-boxed/forgot-password-boxed.component";
import { LoginBoxedComponent } from "./DemoPages/UserPages/login-boxed/login-boxed.component";
import { RegisterBoxedComponent } from "./DemoPages/UserPages/register-boxed/register-boxed.component";

// Elements

import { StandardComponent } from "./DemoPages/Elements/Buttons/standard/standard.component";
import { DropdownsComponent } from "./DemoPages/Elements/dropdowns/dropdowns.component";
import { CardsComponent } from "./DemoPages/Elements/cards/cards.component";
import { ListGroupsComponent } from "./DemoPages/Elements/list-groups/list-groups.component";
import { TimelineComponent } from "./DemoPages/Elements/timeline/timeline.component";
import { IconsComponent } from "./DemoPages/Elements/icons/icons.component";

// Components

import { AccordionsComponent } from "./DemoPages/Components/accordions/accordions.component";
// import {TabsComponent} from './DemoPages/Components/tabs/tabs.component';
import { CarouselComponent } from "./DemoPages/Components/carousel/carousel.component";
import { ModalsComponent } from "./DemoPages/Components/modals/modals.component";
import { ProgressBarComponent } from "./DemoPages/Components/progress-bar/progress-bar.component";
import { PaginationComponent } from "./DemoPages/Components/pagination/pagination.component";
import { TooltipsPopoversComponent } from "./DemoPages/Components/tooltips-popovers/tooltips-popovers.component";

// Tables

import { TablesMainComponent } from "./DemoPages/Tables/tables-main/tables-main.component";

// Widgets

import { ChartBoxes3Component } from "./DemoPages/Widgets/chart-boxes3/chart-boxes3.component";

// Forms Elements

import { ControlsComponent } from "./DemoPages/Forms/Elements/controls/controls.component";
import { LayoutComponent } from "./DemoPages/Forms/Elements/layout/layout.component";

// Charts

import { ChartjsComponent } from "./DemoPages/Charts/chartjs/chartjs.component";
import { PerfilComponent } from "./Components/perfil/perfil.component";
import { CrearComponent } from "./Components/Inversionistas/crear/crear.component";
import { ListarComponent } from "./Components/Inversionistas/listar/listar.component";
import { CrearClienteComponent } from "./Components/Clientes/crear-cliente/crear-cliente.component";
import { ListarClienteComponent } from "./Components/Clientes/listar-cliente/listar-cliente.component";
import { CrearSolicitudComponent } from "./Components/Solicitudes/crear-solicitud/crear-solicitud.component";
import { ListarSolicitudComponent } from "./Components/Solicitudes/listar-solicitud/listar-solicitud.component";
import { CrearUsuariosEmpresaComponent } from "./Components/UsuariosEmpresa/crear-usuarios-empresa/crear-usuarios-empresa.component";
import { ListarUsuariosEmpresaComponent } from "./Components/UsuariosEmpresa/listar-usuarios-empresa/listar-usuarios-empresa.component";
import { EditarUsuariosCompartidoComponent } from "./Shared/Components/editar-usuarios-compartido/editar-usuarios-compartido.component";
import { VerSolicitudComponent } from "./Components/Solicitudes/ver-solicitud/ver-solicitud.component";

import { AuthGuard } from "../app/Shared/Guards/auth.guard";
import { ListarSolicitudClientesComponent } from "./Components/Solicitudes/listar-solicitud-clientes/listar-solicitud-clientes.component";
import { CrearCreditoComponent } from "./Components/Creditos/crear-credito/crear-credito.component";
import { ListarCreditoComponent } from "./Components/Creditos/listar-credito/listar-credito.component";
import { ListarCreditosClientesComponent } from "./Components/Creditos/listar-creditos-clientes/listar-creditos-clientes.component";
import { InversionesAdministradorComponent } from "./Components/Inversiones/inversiones-administrador/inversiones-administrador.component";
import { InversionesPersonaComponent } from "./Components/Inversiones/inversiones-persona/inversiones-persona.component";
import { InversionDetalleComponent } from "./Components/Inversiones/inversion-detalle/inversion-detalle.component";
import { DetalleCreditoComponent } from "./Components/Creditos/proceso-credito/detalle-credito/detalle-credito.component";
import { InversionesAdmministradorCompletasComponent } from "./Components/Inversiones/inversiones-admministrador-completas/inversiones-admministrador-completas.component";
import { ListarUsuariosAppComponent } from "./Components/UsuariosApp/listar-usuarios-app/listar-usuarios-app.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "pages/login-boxed",
    pathMatch: "full",
  },
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      // Dashboads

      {
        path: "",
        component: AnalyticsComponent,
        canActivate: [AuthGuard],
        data: { extraParameter: "dashboardsMenu" },
      },

      // Perfil
      {
        path: "perfil",
        component: PerfilComponent,
        canActivate: [AuthGuard],
      },
      //Inversionistas
      {
        path: "inversionistas/crear",
        component: CrearComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "inversionistas/listar",
        component: ListarComponent,
        canActivate: [AuthGuard],
      },
      //Clientes
      {
        path: "clientes/crear",
        component: CrearClienteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "clientes/listar",
        component: ListarClienteComponent,
        canActivate: [AuthGuard],
      },

      //Creditos
      {
        path: "creditos/crear",
        component: CrearCreditoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "creditos/listar",
        component: ListarCreditoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "creditos/listar-creditos-clientes",
        component: ListarCreditosClientesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "creditos/proceso-credito/:idCredito",
        component: DetalleCreditoComponent,
        canActivate: [AuthGuard],
      },
      //Inversiones

      {
        path: "inversiones/listar-administrador",
        component: InversionesAdministradorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "inversiones/listar-administrador-completas",
        component: InversionesAdmministradorCompletasComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "inversiones/listar-persona",
        component: InversionesPersonaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "inversiones/detalle-inversion/:idSolicitud",
        component: InversionDetalleComponent,
        canActivate: [AuthGuard],
      },

      //Solicitudes
      {
        path: "solicitudes/crear",
        component: CrearSolicitudComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "solicitudes/listar",
        component: ListarSolicitudComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "solicitudes/ver/:idSolicitud",
        canActivate: [AuthGuard],
        component: VerSolicitudComponent,
      },
      {
        path: "solicitudes/listar-solicitudes-clientes",
        canActivate: [AuthGuard],
        component: ListarSolicitudClientesComponent,
      },
      //Usuarios empresa
      {
        path: "usuariosEmpresa/crear",
        component: CrearUsuariosEmpresaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "usuariosEmpresa/listar",
        component: ListarUsuariosEmpresaComponent,
        canActivate: [AuthGuard],
      },
      //Usuarios app

      {
        path: "usuariosApp/listar-usuarios-app",
        component: ListarUsuariosAppComponent,
        canActivate: [AuthGuard],
      },
      //editar usuarios compartido
      {
        path: "compartido/editar/:data",
        component: EditarUsuariosCompartidoComponent,
        canActivate: [AuthGuard],
      },
      //estadisticas
      /* {
        path: "compartido/editar/:data",
        component: EditarUsuariosCompartidoComponent,
        canActivate: [AuthGuard],
      }, */
      // Elements
      {
        path: "elements/buttons-standard",
        component: StandardComponent,
        data: { extraParameter: "elementsMenu" },
      },
      {
        path: "elements/dropdowns",
        component: DropdownsComponent,
        data: { extraParameter: "elementsMenu" },
      },
      {
        path: "elements/icons",
        component: IconsComponent,
        data: { extraParameter: "elementsMenu" },
      },
      {
        path: "elements/cards",
        component: CardsComponent,
        data: { extraParameter: "elementsMenu" },
      },
      {
        path: "elements/list-group",
        component: ListGroupsComponent,
        data: { extraParameter: "elementsMenu" },
      },
      {
        path: "elements/timeline",
        component: TimelineComponent,
        data: { extraParameter: "elementsMenu" },
      },

      // Components

      // {path: 'components/tabs', component: TabsComponent, data: {extraParameter: 'componentsMenu'}},
      {
        path: "components/accordions",
        component: AccordionsComponent,
        data: { extraParameter: "componentsMenu" },
      },
      {
        path: "components/modals",
        component: ModalsComponent,
        data: { extraParameter: "componentsMenu" },
      },
      {
        path: "components/progress-bar",
        component: ProgressBarComponent,
        data: { extraParameter: "componentsMenu" },
      },
      {
        path: "components/tooltips-popovers",
        component: TooltipsPopoversComponent,
        data: { extraParameter: "componentsMenu" },
      },
      {
        path: "components/carousel",
        component: CarouselComponent,
        data: { extraParameter: "componentsMenu" },
      },
      {
        path: "components/pagination",
        component: PaginationComponent,
        data: { extraParameter: "componentsMenu" },
      },

      // Tables

      {
        path: "tables/bootstrap",
        component: TablesMainComponent,
        data: { extraParameter: "tablesMenu" },
      },

      // Widgets

      {
        path: "widgets/chart-boxes-3",
        component: ChartBoxes3Component,
        data: { extraParameter: "pagesMenu3" },
      },

      // Forms Elements

      {
        path: "forms/controls",
        component: ControlsComponent,
        data: { extraParameter: "formElementsMenu" },
      },
      {
        path: "forms/layouts",
        component: LayoutComponent,
        data: { extraParameter: "formElementsMenu" },
      },

      // Charts

      {
        path: "charts/chartjs",
        component: ChartjsComponent,
        data: { extraParameter: "" },
      },
    ],
  },
  {
    path: "",
    component: PagesLayoutComponent,
    children: [
      // User Pages

      {
        path: "pages/login-boxed",
        component: LoginBoxedComponent,
        data: { extraParameter: "" },
      },
      {
        path: "pages/register-boxed",
        component: RegisterBoxedComponent,
        data: { extraParameter: "" },
      },
      {
        path: "pages/forgot-password-boxed",
        component: ForgotPasswordBoxedComponent,
        data: { extraParameter: "" },
      },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      relativeLinkResolution: "legacy",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

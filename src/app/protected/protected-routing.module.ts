import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AdminComponent } from './admin/admin.component';
import { MonitorComponent } from './monitor/monitor.component';
import { BorrarclienteComponent } from './admin/borrarcliente/borrarcliente.component';
import { AltaclienteComponent } from './admin/altacliente/altacliente.component';
import { EditclienteComponent } from './admin/editcliente/editcliente.component';
import { ListaclientesComponent } from './admin/listaclientes/listaclientes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'admin', component: AdminComponent },
      {path:  'admin/listaclientes',component:ListaclientesComponent},
      { path: 'admin/listaclientes/borrar', component: BorrarclienteComponent },
      { path: 'admin/listaclientes/altacliente', component: AltaclienteComponent },
      { path: 'admin/listaclientes/editcliente/:email', component: EditclienteComponent },
      { path: 'cliente', component: ClienteComponent },
      { path: 'monitor', component: MonitorComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}

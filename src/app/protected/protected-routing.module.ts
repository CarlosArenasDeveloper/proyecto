import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AdminComponent } from './admin/admin.component';
import { MonitorComponent } from './monitor/monitor.component';
import { BorrarclienteComponent } from './admin/borrarcliente/borrarcliente.component';
import { AltaclienteComponent } from './admin/altacliente/altacliente.component';
import { EditclienteComponent } from './admin/editcliente/editcliente.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'admin/borrar', component: BorrarclienteComponent },
      { path: 'admin/altacliente', component: AltaclienteComponent },
      { path: 'admin/editcliente/:email', component: EditclienteComponent },
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

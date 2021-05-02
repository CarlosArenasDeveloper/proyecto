import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTablesModule } from "angular-datatables";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: DashboardComponent },
      // { path: 'admin', component: AdminComponent },
      // {path:  'admin/listaclientes',component:ListaclientesComponent},
      // { path: 'admin/listaclientes/altacliente', component: AltaclienteComponent },
      // { path: 'admin/listaclientes/editcliente/:email', component: EditclienteComponent },
      // { path: 'admin/listamonitores', component: ListamonitoresComponent },
      // { path: 'admin/listamonitores/altamonitor', component: AltamonitorComponent },
      // { path: 'admin/listamonitores/editmonitor/:email', component: EditmonitorComponent },
      // { path: 'cliente', component: ClienteComponent },
      // { path: 'monitor', component: MonitorComponent },

      {
        path: 'admin',
        //component: AdminComponent,
        loadChildren: () => import('./admin/admin.module').then((m)=>m.AdminModule)
      },
      { path: '**', redirectTo: '' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes),DataTablesModule],
  exports: [RouterModule],
})
export class ProtectedRoutingModule {}

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
      {
        path: 'admin',
        //component: AdminComponent,
        loadChildren: () => import('./admin/admin.module').then((m)=>m.AdminModule)
      },
      {
        path: 'monitor',
        //component: AdminComponent,
        loadChildren: () => import('./monitor/monitor.module').then((m)=>m.MonitorModule)
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

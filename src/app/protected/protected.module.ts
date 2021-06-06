import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DataTablesModule } from "angular-datatables";
import { MonitorComponent } from './monitor/monitor.component';
import { ClientesModule } from './admin/clientes/clientes.module';
import { NoticiasComponent } from '../shared/noticias/noticias.component';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    MonitorComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    ChartsModule,
    TranslateModule
  ],

})
export class ProtectedModule {}

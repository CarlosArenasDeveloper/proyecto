import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { ClienteComponent } from './cliente/cliente.component';
import { MonitorComponent } from './monitor/monitor.component';
import { AltaclienteComponent } from './admin/altacliente/altacliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RolPipe } from './pipes/rol.pipe';
import { CentroPipe } from './pipes/centro.pipe';
import { TarifaPipe } from './pipes/tarifa.pipe';
import { EditclienteComponent } from './admin/editcliente/editcliente.component';
import { MaterialModule } from '../material/material.module';
import { SharedComponent } from './admin/shared/shared.component';
import { ListaclientesComponent } from './admin/listaclientes/listaclientes.component';
import { ListamonitoresComponent } from './admin/listamonitores/listamonitores.component';
import { AltamonitorComponent } from './admin/altamonitor/altamonitor.component';
import { EditmonitorComponent } from './admin/editmonitor/editmonitor.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    ClienteComponent,
    MonitorComponent,
    AltaclienteComponent,
    RolPipe,
    CentroPipe,
    TarifaPipe,
    EditclienteComponent,
    ListaclientesComponent,
    SharedComponent,
    ListamonitoresComponent,
    AltamonitorComponent,
    EditmonitorComponent,
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class ProtectedModule {}

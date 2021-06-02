import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SesionesMonitorRoutingModule } from './sesiones-monitor-routing.module';
import { ListaSesionesMonitorComponent } from './lista-sesiones-monitor/lista-sesiones-monitor.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { ListaAllSesionesComponent } from './lista-all-sesiones/lista-all-sesiones.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ListaSesionesMonitorComponent, ListaAllSesionesComponent],
  imports: [
    CommonModule,
    SesionesMonitorRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    FullCalendarModule,
    CalendarModule
  ],
  exports:[
    ListaSesionesMonitorComponent, ListaAllSesionesComponent
  ]
})
export class SesionesMonitorModule { }

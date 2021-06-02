import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { SesionesMonitorModule } from './sesiones-monitor/sesiones-monitor.module';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    DataTablesModule,
    SesionesMonitorModule,
    FullCalendarModule,
    CalendarModule,
  ],
})
export class MonitorModule {}

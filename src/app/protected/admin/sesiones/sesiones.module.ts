import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SesionesRoutingModule } from './sesiones-routing.module';
import { ListaSesionesComponent } from './lista-sesiones/lista-sesiones.component';
import { AddSesionComponent } from './add-sesion/add-sesion.component';
import { EditSesionComponent } from './edit-sesion/edit-sesion.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import {
  MonthAgendaService,
  ScheduleModule,
  TimelineMonthService,
  TimelineViewsService,
} from '@syncfusion/ej2-angular-schedule';
import {
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
} from '@syncfusion/ej2-angular-schedule';


@NgModule({
  declarations: [ListaSesionesComponent, AddSesionComponent, EditSesionComponent],
  imports: [
    CommonModule,
    SesionesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    ScheduleModule
  ],
  exports:[ListaSesionesComponent, AddSesionComponent, EditSesionComponent],
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    TimelineViewsService,
    TimelineMonthService,
  ],
})
export class SesionesModule { }

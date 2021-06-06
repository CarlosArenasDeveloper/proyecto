import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarModule } from 'primeng/calendar';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ClienteComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    FullCalendarModule,
    CalendarModule,
    TranslateModule
  ]
})
export class ClienteModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitoresRoutingModule } from './monitores-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { AltamonitorComponent } from './altamonitor/altamonitor.component';
import { EditmonitorComponent } from './editmonitor/editmonitor.component';
import { ListamonitoresComponent } from './listamonitores/listamonitores.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AltamonitorComponent,
    EditmonitorComponent,
    ListamonitoresComponent,
  ],
  imports: [
    CommonModule,
    MonitoresRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    TranslateModule
  ],
  exports: [
    AltamonitorComponent,
    EditmonitorComponent,
    ListamonitoresComponent,
  ],
})
export class MonitoresModule {}

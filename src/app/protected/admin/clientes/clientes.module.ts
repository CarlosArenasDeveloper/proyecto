import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { AltaclienteComponent } from './altacliente/altacliente.component';
import { EditclienteComponent } from './editcliente/editcliente.component';
import { ListaclientesComponent } from './listaclientes/listaclientes.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';
import { ActividadesPorTarifaComponent } from '../../../auth/pages/actividades-por-tarifa/actividades-por-tarifa.component';


@NgModule({
  declarations: [AltaclienteComponent,EditclienteComponent,ListaclientesComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
    TranslateModule,
  ],
  exports:[AltaclienteComponent,EditclienteComponent,ListaclientesComponent],
  entryComponents: [ActividadesPorTarifaComponent],
})
export class ClientesModule { }

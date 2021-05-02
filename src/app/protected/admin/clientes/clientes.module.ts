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


@NgModule({
  declarations: [AltaclienteComponent,EditclienteComponent,ListaclientesComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
  ],
  exports:[AltaclienteComponent,EditclienteComponent,ListaclientesComponent]
})
export class ClientesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TarifasModule } from './tarifas/tarifas.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { ClientesModule } from './clientes/clientes.module';
import { MonitoresModule } from './monitores/monitores.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TarifasModule,
    ClientesModule,
    MonitoresModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarifasRoutingModule } from './tarifas-routing.module';
import { ListaTarifasComponent } from './lista-tarifas/lista-tarifas.component';
import { AddTarifaComponent } from './add-tarifa/add-tarifa.component';
import { EditTarifaComponent } from './edit-tarifa/edit-tarifa.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [ListaTarifasComponent, AddTarifaComponent, EditTarifaComponent],
  imports: [
    CommonModule,
    TarifasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTablesModule,
  ],
  exports:[
    ListaTarifasComponent, AddTarifaComponent, EditTarifaComponent
  ]
})
export class TarifasModule { }

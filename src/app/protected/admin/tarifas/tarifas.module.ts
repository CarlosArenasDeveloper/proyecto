import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarifasRoutingModule } from './tarifas-routing.module';
import { ListaTarifasComponent } from './lista-tarifas/lista-tarifas.component';
import { AddTarifaComponent } from './add-tarifa/add-tarifa.component';
import { EditTarifaComponent } from './edit-tarifa/edit-tarifa.component';


@NgModule({
  declarations: [ListaTarifasComponent, AddTarifaComponent, EditTarifaComponent],
  imports: [
    CommonModule,
    TarifasRoutingModule
  ],
  exports:[
    ListaTarifasComponent, AddTarifaComponent, EditTarifaComponent
  ]
})
export class TarifasModule { }
